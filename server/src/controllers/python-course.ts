import { NextFunction, Request, Response, Router } from 'express';

export const pythonCourse = Router();

pythonCourse.get('/exercise/:id', async (req: Request, res: Response, next: NextFunction) => {});
