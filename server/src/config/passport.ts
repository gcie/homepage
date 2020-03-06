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
            secretOrKey: JWT_SECRET
        },
        (payload, done) => {
            User.findOne({ _id: new Types.ObjectId(payload.id), email: payload.email }, function(err, user) {
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
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/**
 * Login Required middleware.
 */
export const isAuthenticated = passport.authenticate('jwt', { session: false });
