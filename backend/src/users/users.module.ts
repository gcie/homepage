import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    const schema = UserSchema;
                    schema.pre<User>('save', function (next) {
                        if (!this.isModified('password')) return next();
                        genSalt(10, (err, salt) => {
                            if (err) return next(err);
                            hash(this.password, salt, (err, hash) => {
                                if (err) return next(err);
                                this.password = hash;
                                next();
                            });
                        });
                    });
                    schema.methods.comparePasswords = function (candidatePassword, cb: (error: Error, isMatch: boolean) => void) {
                        compare(candidatePassword, this.password, (error: Error, isMatch: boolean) => {
                            cb(error, isMatch);
                        });
                    };
                    return schema;
                },
            },
        ]),
    ],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
