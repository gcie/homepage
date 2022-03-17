import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseDto } from 'src/model/exercise.dto';
import { Exercise } from '../../schemas/exercise.schema';
import { PythonService } from './python.service';

@Injectable()
export class ExercisesService {
    constructor(@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>, private pythonSrv: PythonService) {}

    async find(exerciseId: string): Promise<Exercise> {
        return this.exerciseModel.findById(exerciseId).exec();
    }

    async add(exercise: ExerciseDto) {
        return this.exerciseModel.create(exercise);
    }

    // async runTestcases(exerciseId: string, program: string) {
    //     const exercise = await this.find(exerciseId);
    //     return Promise.all()
    // }
}
