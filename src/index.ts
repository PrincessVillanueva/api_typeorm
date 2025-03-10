import { AppDataSource, ensureDbExists } from "./data-source";
import express, { Request, Response, NextFunction } from "express";
import { usersRoutes } from "./users/users.routes";
import errorHandler from "./_middleware/error-handler";

const app = express();
const port = (process.env.PORT as unknown as number) || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Initialization
ensureDbExists()
    .then(() => {
        AppDataSource.initialize()
            .then(() => {
                console.log("Database connected");
            })
            .catch((error) => console.error("Database connection error:", error));
    })
    .catch((error) => console.error("Database creation error:", error));

// Routes
app.use("/api/users", usersRoutes);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
