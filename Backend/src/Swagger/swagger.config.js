import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

export function configureSwagger(app) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Load YAMLs
  const info = YAML.load(path.resolve(__dirname, "./swagger.info.yaml"));
  const baseSchemas = YAML.load(path.resolve(__dirname, "./base.schemas.yaml"));
  const authSchemas = YAML.load(path.resolve(__dirname, "./auth/auth.schemas.yaml"));
  const userSchemas = YAML.load(path.resolve(__dirname, "./user/user.schemas.yaml"));
  const expenseSchemas = YAML.load(path.resolve(__dirname, "./expense/expense.schemas.yaml"));
  const categorySchemas = YAML.load(path.resolve(__dirname, "./category/category.schemas.yaml"));

  const authPaths = YAML.load(path.resolve(__dirname, "./auth/auth.paths.yaml"));
  const userPaths = YAML.load(path.resolve(__dirname, "./user/user.paths.yaml"));
  const expensePaths = YAML.load(path.resolve(__dirname, "./expense/expense.paths.yaml"));
  const categoryPaths = YAML.load(path.resolve(__dirname, "./category/category.paths.yaml"));

  const swaggerDefinition = {
    ...info,
    components: {
      schemas: {
        ...baseSchemas,
        ...authSchemas,
        ...userSchemas,
        ...expenseSchemas,
        ...categorySchemas,
      },
      securitySchemes: info.securitySchemes || {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      ...authPaths,
      ...userPaths,
      ...expensePaths,
      ...categoryPaths,
    },
  };

  const swaggerOptions = {
    definition: swaggerDefinition,
    apis: [],
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
