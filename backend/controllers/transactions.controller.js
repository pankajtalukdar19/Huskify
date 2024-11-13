const transactions = require('../models/transaction_schema');

module.exports = {
  create: async (req, res) => {
    try {
      const create = new transactions(req.body);
      const data = await create.save();
      res.json({ success: true, msg: "Transaction details saved successfully", data })
    } catch (err) {
      return res.status(500).json({ success: false, msg: "there is some error", error: err.message })
    }
  },

  getAll: async (req, res) => {
    try {
      const data = await transactions.find()

      if (data.length === 0) {
        return res.status(404).json({ success: false, msg: "No Transaction found" });
      }
      return res.status(200).json({ success: true, msg: "Transaction data fetched successfully", data });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Something went wrong", error: err.message });
    }
  },
}