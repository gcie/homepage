import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddExerciseInDto } from 'src/model/add-exercise-in.dto';
import { AddExerciseOutDto } from 'src/model/add-exercise-out.dto';
import { GetExercisesOutDto } from 'src/model/get-exercises-out.dto';
import { Exercise } from '../../schemas/exercise.schema';
import { PythonService } from './python.service';

@Injectable()
export class ExercisesService {
    constructor(@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>, private pythonSrv: PythonService) {}

    async findAll(userId: string): Promise<Exercise[]> {
        // const exercises = await this.exerciseModel
        //     .aggregate([
        //         {
        //             $lookup: {
        //                 from: Submission.name,
        //                 localField: '_id',
        //                 foreignField: 'exercise',
        //                 as: 'submission',
        //                 pipeline: [{ $match: { user: userId } }],
        //             },
        //         },
        //     ])
        //     .exec();
        // console.log(exercises);

        return this.exerciseModel.find().exec();
    }

    async find(exerciseId: string): Promise<Exercise> {
        return this.exerciseModel.findById(exerciseId).exec();
    }

    async add(exercise: AddExerciseInDto): Promise<AddExerciseOutDto> {
        const e = await this.exerciseModel.create(exercise);
        return { id: e._id };
    }

    // async runTestcases(exerciseId: string, program: string) {
    //     const exercise = await this.find(exerciseId);
    //     return Promise.all()
    // }

    mapExercisesToGetExercisesOutDto(exercises: Exercise[]): GetExercisesOutDto {
        return { exercises: exercises.map((e) => ({ id: e._id, name: e.name, score: 0, maxScore: 0 })) };
    }
}
