import { Request, Response, Router } from 'express';
import { body, check, validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import '../config/passport';
import { User } from '../models/User';
import logger from '../util/logger';
import { JWT_SECRET } from '../util/secrets';

export const auth = Router();

/**
 * POST /login
 * Sign in using email and password.
 */
auth.post('/login', async (req: Request, res: Response) => {
    await check('email', 'Niepoprawny adres email')
        .isEmail()
        .run(req);
    await check('password', 'Hało nie może być puste')
        .isLength({ min: 1 })
        .run(req);
    // eslint-disable-next-line @typescript-eslint/camelcase
    await body('email')
        .normalizeEmail({ gmail_remove_dots: false })
        .run(req);
    logger.debug(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, raw: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server error', raw: err });
        if (!user) return res.status(400).json({ message: 'Nie znaleziono konta o podanym adresie email' });
        user.comparePassword(password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: 'Server error', raw: err });
            if (!isMatch) return res.status(400).json({ message: 'Niepoprawne hasło / adres email' });
            const payload = {
                id: user._id,
                email: user.email
            };
            sign(payload, JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
                if (err) return res.status(500).json({ message: 'Server error', raw: err });
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        group: user.group
                    },
                    success: true,
                    token: `Bearer ${token}`,
                    expiresIn: 36000
                });
            });
        });
    });
});
