import swaggerAutogen from "swagger-autogen";

const generateSwagger = swaggerAutogen({ openapi: "3.0.0" });

const document = {
  info: {
    title: "Backend API",
    version: "1.0.0",
    description: "Authentication and task management API",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],

  tags: [
    { name: "Authentication", description: "User registration and login" },
    { name: "Tasks", description: "Task management operations" },
  ],

  components: {
    schemas: {
      Task: {
        type: "object",
        required: ["title"],
        properties: {
          _id: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
          },
          title: {
            type: "string",
            example: "Study Swagger",
          },
          done: {
            type: "boolean",
            default: false,
          },
          duration: {
            type: "number",
            default: 0,
          },
        },
      },

      TaskInput: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            example: "Study Swagger",
          },
          done: {
            type: "boolean",
            default: false,
          },
          duration: {
            type: "number",
            default: 0,
          },
        },
      },

      Error: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              code: { type: "string" },
              message: { type: "string" },
              details: {
                type: "array",
                items: { type: "object" },
              },
            },
          },
        },
      },
      SignupInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "secret123",
          },
          role: {
            type: "string",
            enum: ["user", "admin"],
            default: "user",
          },
        },
      },

      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "secret123",
          },
        },
      },

      AuthError: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: {
              code: {
                type: "string",
                example: "VALIDATION_ERROR",
              },
              message: {
                type: "string",
                example: "Identifiants invalides",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
  },
};

await generateSwagger(
  "./swagger-output.json",
  ["./app.js"],
  document,
);

console.log("Swagger documentation generated successfully");