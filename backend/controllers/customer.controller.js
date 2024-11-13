const customer = require('../models/customer_schema');

module.exports = {
    create: async (req, res) => {
        try {
            const create = new customer(req.body);
            const data = await create.save();
            res.json({ success: true, msg: "Customer details saved successfully", data })
        } catch (err) {
            return res.status(500).json({ success: false, msg: "there is some error", error: err.message})
        }
    },
    getAll: async (req, res) => {
        try {
          const data = await customer.find()
    
          if (data.length === 0) {
            return res.status(404).json({ success: false, msg: "No customer found" });
          }
          return res.status(200).json({ success: true, msg: "customer data fetched successfully", data });
        } catch (err) {
          return res.status(500).json({ success: false, msg: "Something went wrong", error: err.message });
        }
      },

      getCustomerById: async (req, res) => {
        try {
            const data = await customer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.json({ success: true, msg: "Customer details Update Successfull", data });
        } catch (err) {
            return res.status(500).json({ success: false, msg: "Something Went Wrong", error: err.message })
        }
        }
}