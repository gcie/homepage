import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .then((doc) => res.status(200).json(doc))
        .catch(next);
};

export const postUsers = async (req: Request, res: Response, next: NextFunction) => {
    await check('email', 'Email is not valid')
        .isEmail()
        .run(req);

    await check('password', 'Password cannot be blank')
        .isLength({ min: 1 })
        .run(req);

    var userDoc = req.body;
    delete userDoc._id;
    userDoc.group = 'user';
    User.findOne({ email: userDoc.email })
        .then((user) => {
            if (user) res.status(400).json({ message: `Użytkownik o adresie email '${userDoc.email}' już istnieje` });
            else return User.create(userDoc);
        })
        .then((doc) => res.json(doc))
        .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
};

export const putUserById = (req: Request, res: Response, next: NextFunction) => {
    var userDoc = req.body;
    delete userDoc._id;
    if (!userDoc.password) delete userDoc.password;
    User.findById(req.params.id)
        .then((user) => {
            user.set(userDoc);
            return user.save();
        })
        .then((user) => res.json(user))
        .catch(next);
};

export const delUserById = (req: Request, res: Response, next: NextFunction) => {
    User.findOneAndDelete(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
};
