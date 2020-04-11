import { NextFunction, Response, Request } from 'express';
import { isAuthenticated } from './passport';

export const isAdmin = [
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
        const user: any = req.user;
        if (user && user.groups.includes('admin')) {
            next();
        } else {
            res.status(401).json({ message: 'Brak uprawnień' });
        }
    },
];

export const isKorepetycjeManager = [
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
        const user: any = req.user;
        if (user && user.groups.includes('korepetycje-manager')) {
            next();
        } else {
            res.status(401).json({ message: 'Brak uprawnień' });
        }
    },
];

export const isKorepetycjeUser = [
    isAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
        const user: any = req.user;
        if (user && user.groups.includes('korepetycje-user')) {
            next();
        } else {
            res.status(401).json({ message: 'Brak uprawnień.' });
        }
    },
];
