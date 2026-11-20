import swaggerAutogen from "swagger-autogen";

const generateSwagger = swaggerAutogen({ openapi: "3.0.0" });

const document = {
  info: {
    title: "Backend API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
};

await generateSwagger(
  "./swagger-output.json",
  [
    "./app.js",
  ],
  document,
);