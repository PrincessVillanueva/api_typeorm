"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const express_1 = __importDefault(require("express"));
const users_routes_1 = require("./users/users.routes");
const error_handler_1 = __importDefault(require("./_middleware/error-handler"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//db initilization
(0, data_source_1.ensureDbExists)()
    .then(() => {
    data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log("Database connected");
    })
        .catch(error => console.log(error));
});
//routes
app.use('/api/users', users_routes_1.usersRoutes);
//global error handler
app.use(error_handler_1.default);
//start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:3000`);
});
