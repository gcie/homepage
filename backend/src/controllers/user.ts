import { Request, Response, Router } from 'express';
import { UserDocument } from '../models/User';

export const user = Router();

user.get('/gravatarURI', (req: Request, res: Response) => {
    const user = req.user as UserDocument;
    res.status(200).json(user.gravatar(400));
});

user.get('/gravatarURI/:size', (req: Request, res: Response) => {
    const user = req.user as UserDocument;
    res.status(200).json(user.gravatar(+req.params.size || 400));
});
