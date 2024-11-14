const Address = require('../models/address.model');
const User = require('../models/user.model');

const addressController = {
  // Get all addresses for a user
  getAddresses: async (req, res) => {
    try {
      const addresses = await Address.find({ user: req.user._id });
      res.json({
        data: addresses,
        message: 'Addresses retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add new address
  addAddress: async (req, res) => {
    try {
      const { addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;

      const address = new Address({
        user: req.user._id,
        addressLine1,
        addressLine2,
        city,
        state,
        pincode,
        isDefault
      });

      await address.save();

      // If this is the first address, set it as default
      const addressCount = await Address.countDocuments({ user: req.user._id });
      if (addressCount === 1) {
        address.isDefault = true;
        await address.save();
      }

      // Update user's default address if this is default
      if (address.isDefault) {
        await User.findByIdAndUpdate(req.user._id, { address: address._id });
      }

      res.status(201).json({
        data: address,
        message: 'Address added successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update address
  updateAddress: async (req, res) => {
    try {
      const { addressLine1, addressLine2, city, state, pincode, isDefault } = req.body;
      const address = await Address.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }

      address.addressLine1 = addressLine1 || address.addressLine1;
      address.addressLine2 = addressLine2 || address.addressLine2;
      address.city = city || address.city;
      address.state = state || address.state;
      address.pincode = pincode || address.pincode;
      address.isDefault = isDefault ?? address.isDefault;

      await address.save();

      // Update user's default address if this is default
      if (address.isDefault) {
        await User.findByIdAndUpdate(req.user._id, { address: address._id });
      }

      res.json({
        data: address,
        message: 'Address updated successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete address
  deleteAddress: async (req, res) => {
    try {
      const address = await Address.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }

      // If deleting default address, set another address as default
      if (address.isDefault) {
        const newDefaultAddress = await Address.findOne({
          user: req.user._id,
          _id: { $ne: address._id }
        });

        if (newDefaultAddress) {
          newDefaultAddress.isDefault = true;
          await newDefaultAddress.save();
          await User.findByIdAndUpdate(req.user._id, { address: newDefaultAddress._id });
        } else {
          await User.findByIdAndUpdate(req.user._id, { address: null });
        }
      }

      await address.remove();
      res.json({ message: 'Address deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Set default address
  setDefaultAddress: async (req, res) => {
    try {
      const address = await Address.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!address) {
        return res.status(404).json({ message: 'Address not found' });
      }

      address.isDefault = true;
      await address.save();

      await User.findByIdAndUpdate(req.user._id, { address: address._id });

      res.json({
        data: address,
        message: 'Default address set successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = addressController;
