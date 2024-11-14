const User = require('../models/user.model');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
}).single('avatar');

const profileController = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
        .select('-otp -refreshToken')
        .populate('address');

      res.json({
        data: user,
        message: 'Profile retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }

        const { name, email, phoneNumber } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        // Update avatar if uploaded
        if (req.file) {
          user.avatarUrl = `/uploads/avatars/${req.file.filename}`;
        }

        await user.save();

        // Return updated user without sensitive fields
        const updatedUser = await User.findById(user._id)
          .select('-otp -refreshToken')
          .populate('address');

        res.json({
          data: updatedUser,
          message: 'Profile updated successfully'
        });
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = profileController;
