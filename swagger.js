import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Backend API",
      version: "1.0.0",
    },
  },
  apis: ["./swagger.yml"],
});