import { NotFoundError } from "../exception/app-error.js";
import Task from "../models/Task.js";

export async function getAllTasks(req, res) {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Get all tasks'
    #swagger.description = 'Returns every task stored in MongoDB.'
    #swagger.responses[200] = {
      description: "Tasks retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: { $ref: "#/components/schemas/Task" }
              }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "Unexpected server error",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" }
        }
      }
    }
  */

  try {
    const tasks = await Task.find();
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getTaskById(req, res) {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Get a task by ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB task identifier',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: "Task retrieved successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: { $ref: "#/components/schemas/Task" }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "Invalid MongoDB task identifier",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" }
        }
      }
    }
    #swagger.responses[404] = {
      description: "Task not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" }
        }
      }
    }
  */

  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new NotFoundError("Task Not Found");
  }

  res.status(200).json({ data: task });
}

export async function createTask(req, res) {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Create a task'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/TaskInput" }
        }
      }
    }
    #swagger.responses[201] = {
      description: "Task created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: { $ref: "#/components/schemas/Task" }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "Invalid task input",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" }
        }
      }
    }
  */

  console.log("body", req.body);
  const newTask = await Task.create(req.body);
  res.status(201).json({ data: newTask });
}

export async function updateTask(req, res) {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Update a task'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB task identifier',
      required: true,
      type: 'string'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/TaskInput" }
        }
      }
    }
    #swagger.responses[200] = {
      description: "Task updated successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: { $ref: "#/components/schemas/Task" }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "Invalid task input",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" }
        }
      }
    }
    #swagger.responses[404] = {
      description: "Task not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" }
        }
      }
    }
  */

  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!task) {
    throw new NotFoundError("Task Not Found");
  }

  res.status(200).json({ data: task });
}

export async function deleteTask(req, res) {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Delete a task'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB task identifier',
      required: true,
      type: 'string'
    }
    #swagger.responses[204] = {
      description: "Task deleted successfully"
    }
    #swagger.responses[400] = {
      description: "Invalid MongoDB task identifier",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" }
        }
      }
    }
    #swagger.responses[404] = {
      description: "Task not found",
      content: {
        "application/json": {
          schema: { $ref: "#/components/schemas/Error" }
        }
      }
    }
  */

  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    throw new NotFoundError("Task Not Found");
  }

  res.status(204).send();
}
