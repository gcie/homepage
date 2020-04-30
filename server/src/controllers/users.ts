import { NextFunction, Request, Response, Router } from 'express';
import { check } from 'express-validator';
import { User } from '../models/User';

export const users = Router();

users.get('/', async (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .then((doc) => res.status(200).json(doc))
        .catch(next);
});

users.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await check('email', 'Email is not valid').isEmail().run(req);

    await check('password', 'Password cannot be blank').isLength({ min: 1 }).run(req);

    const userDoc = req.body;
    delete userDoc._id;
    userDoc.group = 'user';
    User.findOne({ email: userDoc.email })
        .then((user) => {
            if (user) res.status(400).json({ message: `Użytkownik o adresie email '${userDoc.email}' już istnieje` });
            else return User.create(userDoc);
        })
        .then((doc) => res.json(doc))
        .catch(next);
});

users.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});

users.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    const userDoc = req.body;
    delete userDoc._id;
    if (!userDoc.password) delete userDoc.password;
    User.findById(req.params.id)
        .then((user) => {
            user.set(userDoc);
            return user.save();
        })
        .then((user) => res.json(user))
        .catch(next);
});

users.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    User.findByIdAndDelete(req.params.id)
        .then((doc) => res.json(doc))
        .catch(next);
});
