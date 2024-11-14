const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

// Generate random 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

const authController = {
  requestOtp: async (req, res) => {
    try {
      const { phoneNumber } = req.body

      if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' })
      }

      // Generate OTP
      const otp = generateOTP()
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

      // Find or create user
      let user = await User.findOne({ phoneNumber })

      if (!user) {
        return res.status(500).json({ message: 'unser Not found' })
      }

      user.otp = {
        code: otp,
        expiresAt: otpExpiresAt
      }

      await user.save()

      // In production, send OTP via SMS
      console.log(`OTP for ${phoneNumber}: ${otp}`)

      res.json({
        message: 'OTP sent successfully',
        // Remove in production
        otp
      })
    } catch (error) {
      console.log('error', error);

      res.status(500).json({ message: error.message })
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { phoneNumber, otp } = req.body

      if (!phoneNumber || !otp) {
        return res.status(400).json({
          message: 'Phone number and OTP are required'
        })
      }

      const user = await User.findOne({ phoneNumber })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (!user.otp?.code || !user.otp?.expiresAt) {
        return res.status(400).json({ message: 'No OTP requested' })
      }

      if (user.otp.code !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' })
      }

      if (new Date() > user.otp.expiresAt) {
        return res.status(400).json({ message: 'OTP expired' })
      }

      // Clear OTP
      user.otp = undefined

      // Generate tokens
      const tokens = generateTokens(user._id)
      user.refreshToken = tokens.refreshToken
      await user.save()

      res.json({
        data: {
          user,
          ...tokens
        },
        message: 'OTP verified successfully'
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' })
      }

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      const user = await User.findById(decoded.userId)

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(500).json({ message: 'Invalid refresh token' })
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      )

      res.json({
        data: { accessToken },
        message: 'Token refreshed successfully'
      })
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' })
    }
  }
}

module.exports = authController
