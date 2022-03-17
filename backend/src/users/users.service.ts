import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findOne(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }

    async create(email: string, password: string): Promise<User> {
        return this.userModel.create({ email, password, name: email, grrolesoups: [] });
    }

    // async saveSubmission(email: string, submission: Submission) {
    //     this.userModel.updateOne({ email }, { $push: { submissions: submission } });
    // }
}
