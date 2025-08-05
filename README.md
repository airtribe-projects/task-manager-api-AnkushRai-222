# Task Manager API

## Overview

Task Manager API is a simple RESTful service for managing tasks. It supports creating, reading, updating, and deleting tasks, with in-memory storage (using a JSON file for initialization). The API is built with Express and includes validation and filtering features.

## Setup Instructions

1. **Clone the repository**  
   ```
   git clone <your-repo-url>
   cd task-manager-api-AnkushRai-222
   ```

2. **Install dependencies**  
   ```
   npm install
   ```

3. **Run the server**  
   ```
   node app.js
   ```
   *(Make sure you have Node.js v18 or higher)*

4. **Run tests**  
   ```
   npm test
   ```

## API Endpoints

### 1. Create a Task

- **POST** `/tasks`
- **Body:**  
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "completed": false,
    "priority": "low" // optional: "low", "medium", "high"
  }
  ```
- **Response:**  
  `201 Created` with the new task object.

### 2. Get All Tasks

- **GET** `/tasks`
- **Query Parameters (optional):**
  - `completed` (true/false)
  - `priority` ("low", "medium", "high")
  - `sort` ("date")
- **Response:**  
  `200 OK` with an array of tasks.

### 3. Get Task by ID

- **GET** `/tasks/:id`
- **Response:**  
  `200 OK` with the task object  
  `404 Not Found` if the task does not exist

### 4. Update Task by ID

- **PUT** `/tasks/:id`
- **Body:**  
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "completed": true,
    "priority": "high"
  }
  ```
- **Response:**  
  `200 OK` with the updated task  
  `404 Not Found` if the task does not exist

### 5. Delete Task by ID

- **DELETE** `/tasks/:id`
- **Response:**  
  `200 OK` with success message  
  `404 Not Found` if the task does not exist

### 6. Filter by Priority

- **GET** `/tasks/priority/:level`
- **Response:**  
  `200 OK` with filtered tasks  
  `400 Bad Request` for invalid priority

## Testing the API

You can test the API using:

- **Postman**: Import requests and send them to the endpoints.
- **curl**: Example:
  ```
  curl -X POST http://localhost:3000/tasks \
    -H "Content-Type: application/json" \
    -d '{"title":"Test","description":"Test desc","completed":false}'
  ```

## Notes

- Data is stored in-memory and initialized from `task.json`. Changes are not persisted after server restart.
- For production, consider using a database for persistent storage.
