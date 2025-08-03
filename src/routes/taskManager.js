const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskManager.js");
const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();

// Input Validation & Error Handling
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};


//1. Implement POST /tasks: Create a new task with the required fields (title, description, completed).
router.post("/tasks",[
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("description").notEmpty().trim().withMessage("Description is required"),
    body("completed")
    .custom((value) => {
      if (typeof value !== 'boolean') {
        throw new Error('Completed must be a boolean value (true or false)');
      }
      return true;
    }),
    body("priority")
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage("Priority must be low, medium, or high"),
  ], validateRequest, async (req,res)=>{
    try {
      const { title, description, completed, priority } = req.body;
      const newTask = await createTask({ title, description, completed, priority });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Unable to create task due to server error' });
    }
});

//2. Implement GET /tasks: Retrieve all tasks with filtering abd sorting .
router.get("/tasks", async (req,res) => {
  try {
    const { completed, sort, priority } = req.query;
    const tasks = await getAllTasks({ completed, sort, priority });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks due to server error' });
  }
});

//3. Implement GET /tasks/:id: Retrieve a specific task by its ID.
router.get("/tasks/:id", async (req,res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await getTaskById(taskId);
    res.status(200).json(task);
  } catch (error) {
    if (error === "Task not found") {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(500).json({ error: 'Unable to fetch task due to server error' });
    }
  }
});

//4. Implement PUT /tasks/:id: Update a task by its ID.
router.put("/tasks/:id", [
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("description").notEmpty().trim().withMessage("Description is required"),
    body("completed")
      .custom((value) => {
        if (typeof value !== 'boolean') {
          throw new Error('Completed must be a boolean value (true or false)');
        }
        return true;
      }),
    body("priority")
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage("Priority must be low, medium, or high"),
  ], validateRequest, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, completed, priority } = req.body;
    const updatedTask = await updateTaskById({ id, title, description, completed, priority });
    res.status(200).json(updatedTask);
  } catch (error) {
    if (error === "Task not found") {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(500).json({ error: 'Unable to update task due to server error' });
    }
  }
});

//5. Implement DELETE /tasks/:id: Delete a task by its ID.
router.delete("/tasks/:id",async (req,res)=>{
    try {
        const taskId = parseInt(req.params.id);
        await deleteTaskById(taskId);
        res.status(200).json({ success : true , data: 'Task deleted successfully' });
      } catch (error) {
        if (error === "Task not found") {
          res.status(404).json({ success: false, error: 'Task not found' });
        } else {
          res.status(500).json({ success: false, error: 'Unable to delete task due to server error' });
        }
      }
});

//6. route for priority filtering
router.get("/tasks/priority/:level", async (req,res) => {
  try {
    const { level } = req.params;
    if (!['low', 'medium', 'high'].includes(level)) {
      return res.status(400).json({ error: 'Invalid priority level' });
    }
    const tasks = await getAllTasks({ priority: level });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks due to server error' });
  }
});

module.exports = router;