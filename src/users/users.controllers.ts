import { Request, Response, NextFunction } from "express";
import { userService } from "./users.service";
import validateRequest from "../_middleware/validate-request";
import Joi from "joi";

const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await userService.getAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await userService.getById(Number(req.params.id));
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userService.create(req.body);
        res.status(201).json({ message: "User created" });
    } catch (err) {
        next(err);
    }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userService.update(Number(req.params.id), req.body);
        res.json({ message: "User updated" });
    } catch (err) {
        next(err);
    }
};

const _delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userService.delete(Number(req.params.id));
        res.json({ message: "User deleted" });
    } catch (err) {
        next(err);
    }
};

const createSchema = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid("Admin", "User").required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    });

    validateRequest(req, next, schema);
};

const updateSchema = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
        title: Joi.string().allow(""),
        firstName: Joi.string().allow(""),
        lastName: Joi.string().allow(""),
        role: Joi.string().valid("Admin", "User").allow(""),
        email: Joi.string().email().allow(""),
        password: Joi.string().min(6).allow(""),
        confirmPassword: Joi.string().valid(Joi.ref("password")).allow(""),
    }).with("password", "confirmPassword");

    validateRequest(req, next, schema);
};

const userControllers = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    createSchema,
    updateSchema,
};

export default userControllers;
