import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true }) email: string;
    @Prop({ required: true }) password: string;

    @Prop({ required: true }) name: string;
    @Prop([String]) roles: string[];

    comparePassword(candidatePassword, cb: (error: Error, isMatch: boolean) => void) {
        compare(candidatePassword, this.password, (error: Error, isMatch: boolean) => {
            cb(error, isMatch);
        });
    }
}

export const UserSchema = SchemaFactory.createForClass(User);
