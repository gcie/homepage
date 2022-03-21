import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddExerciseInDto } from 'src/model/add-exercise-in.dto';
import { AddExerciseOutDto } from 'src/model/add-exercise-out.dto';
import { Exercise } from '../../schemas/exercise.schema';
import { PythonService } from './python.service';

@Injectable()
export class ExercisesService {
    constructor(@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>, private pythonSrv: PythonService) {}

    async findAll(): Promise<Exercise[]> {
        return this.exerciseModel.find().exec();
    }

    async find(exerciseId: string): Promise<Exercise> {
        return this.exerciseModel.findById(exerciseId).exec();
    }

    async add(exercise: AddExerciseInDto): Promise<AddExerciseOutDto> {
        const e = await this.exerciseModel.create(exercise);
        return { _id: e._id };
    }

    // async runTestcases(exerciseId: string, program: string) {
    //     const exercise = await this.find(exerciseId);
    //     return Promise.all()
    // }
}
