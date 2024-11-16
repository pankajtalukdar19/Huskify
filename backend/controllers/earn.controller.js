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
   
        getTasksByVendorId: async (req, res) => {
            try {
                const vendorId  = req.params?.id;
                const tasks = await earnModel.find({ 'createdBy': vendorId })
    
                if (!tasks || tasks.length === 0) {
                    return res.status(404).json({ success: false, message: 'No tasks found for this vendor' });
                }
    
                res.status(200).json({ success: true, tasks });
            } catch (error) {
                res.status(500).json({ success: false, message: 'Error retrieving tasks', error: error.message });
            }
        },

        getTaskById: async (req, res) => {
          try {
              const { id } = req.params; 
              const task = await earnModel.findById(id).populate('createdBy');
      
              if (!task) {
                  return res.status(404).json({ message: 'Task not found' });
              }
      
              res.status(200).json({ data: task });
          } catch (error) {
              console.error('Error fetching task:', error);
              res.status(500).json({ message: 'Internal server error' });
          }
      }
    
    };

