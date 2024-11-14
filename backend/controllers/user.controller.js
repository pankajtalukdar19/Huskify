const user = require('../models/user.model');

module.exports = {
    create: async (req, res) => {
        try {
            const create = new user(req.body);
            const data = await create.save();
            res.json({ success: true, msg: "user details saved successfully", data })
        } catch (err) {
            return res.status(500).json({ success: false, msg: "there is some error", error: err.message})
        }
    },
    getAll: async (req, res) => {
        try {
          const data = await user.find()
    
          if (data.length === 0) {
            return res.status(404).json({ success: false, msg: "No user found" });
          }
          return res.status(200).json({ success: true, msg: "user data fetched successfully", data });
        } catch (err) {
          return res.status(500).json({ success: false, msg: "Something went wrong", error: err.message });
        }
      },

      getUserById: async (req, res) => {
        try {
            const data = await user.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.json({ success: true, msg: "user details Update Successfull", data });
        } catch (err) {
            return res.status(500).json({ success: false, msg: "Something Went Wrong", error: err.message })
        }
        },
      getVendorByAddressId: async (req, res) => {
          try {
              const addressId = req.params.id; 
              
              const vendors = await user.find({ address: addressId, role: 'vendor' });
      
              if (vendors.length === 0) {
                  return res.status(404).json({ success: false, msg: "No vendors found for this address." });
              }
      
              res.json({ success: true, msg: "Vendors found successfully", data: vendors });
          } catch (err) {
              return res.status(500).json({ success: false, msg: "Something went wrong", error: err.message });
          }
      }

}