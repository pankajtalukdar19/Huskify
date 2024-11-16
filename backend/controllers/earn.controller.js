const earnModel = require('../models/earnList.model');

module.exports = {
    create: async (req, res) => {
        try {
          const create = new earnModel(req.body);
          const data = await (await create.save())
          res.json({ success: true, msg: "Task details saved successfully", data })
        } catch (err) {
          return res.status(500).json({ success: false, msg: "there is some error", error: err.message })
        }
      },
    
      getTask: async (req, res) => {
        try {
          const data = await earnModel.find().populate('createdBy')
    
          if (data.length === 0) {
            return res.status(404).json({ success: false, msg: "No Task found" });
          }
          return res.status(200).json({ success: true, msg: "Task data fetched successfully", data });
        } catch (err) {
          return res.status(500).json({ success: false, msg: "Something went wrong", error: err.message });
        }
      },
};
