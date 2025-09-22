import {UserRouter, AuthRouter, ExpensesRouter, CategoryRouter} from '../Routers/index.js'; // Importing route handlers

export function registerRouteHandlers(app){
    app.use('/api/v1/auth', AuthRouter);                  // Mount user routes
    app.use('/api/v1/expenses', ExpensesRouter);                // Mount expense routes
    app.use('/api/v1/users', UserRouter);                // Mount user routes
    app.use('/api/v1/categories', CategoryRouter);                // Mount Category routes
}