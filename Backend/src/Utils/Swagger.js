import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export function configureSwagger(app){
    const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expenses Tracker API",
      version: "1.0.0",
      description: "API documentation for Expenses Tracker",
    },
    servers: [
      {
        url: "http://localhost:3000", // Change if needed
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // optional, for UI hint
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routers/*.js"], // adjust path to your route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}