const taskData = require("../../task.json").tasks;

//1. Implement POST /tasks: Create a new task with the required fields (title, description, completed).
const createTask = async ({ title, description, completed, priority }) => {
  try {
    // Find the max id in the current tasks and increment by 1
    const maxId = taskData.length > 0 ? Math.max(...taskData.map(task => task.id)) : 0;
    const newTask = {
      id: maxId + 1,
      title,
      description,
      completed,
      priority,
      createdAt: new Date().toISOString()
    };
    taskData.push(newTask);
    return newTask;
  } catch (error) {
    throw error;
  }
};

//2. Implement GET /tasks: Retrieve all tasks with filtering and sorting .
const getAllTasks = async ({ completed, sort, priority } = {}) => {
  try {
    let filteredTasks = [...taskData];

    // Filter by completion status
    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }

    // Filter by priority
    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }

    // Sort by creation date (YYYY-MM-DD)
    if (sort === 'date') {
      filteredTasks.sort((a, b) => {
      const dateA = a.createdAt.split('T')[0];
      const dateB = b.createdAt.split('T')[0];
      return new Date(dateB) - new Date(dateA);
      });
    }

    return filteredTasks;
  } catch (error) {
    throw error;
  }
};

//3. Implement GET /tasks/:id: Retrieve a specific task by its ID.
const getTaskById = async (id) => {
  try {
    const task = taskData.find((task) => task.id == id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  } catch (error) {
    throw error;
  }
};

//4. Implement PUT /tasks/:id: Update an existing task by its ID.
const updateTaskById = async  ({ id, title, description, completed, priority }) => {
  try {
    const task = taskData.find((task) => task.id == id);
    if (!task) {
      throw new Error("Task not found");
    }
    task.title = title;
    task.description = description;
    task.completed = completed;
    task.priority = priority;
    
    return task;
  } catch (error) {
    throw error;
  }
};

//5. Implement DELETE /tasks/:id: Delete a task by its ID.
const deleteTaskById = async (id) => {
  try {
    const task = taskData.find((task) => task.id == id);
    if (!task) {
      throw new Error("Task not found");
    }
    taskData.splice(taskData.indexOf(task), 1);
    return task;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById
};
