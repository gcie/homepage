import { Types } from 'mongoose';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../models/User';
import { JWT_SECRET } from '../util/secrets';

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        (payload, done) => {
            User.findOne({ _id: new Types.ObjectId(payload.id), email: payload.email }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = passport.authenticate('jwt', { session: false });
