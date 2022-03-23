import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddExerciseInDto } from 'src/model/add-exercise-in.dto';
import { AddExerciseOutDto } from 'src/model/add-exercise-out.dto';
import { ExerciseDto } from 'src/model/exercise.dto';
import { GetExercisesOutDto } from 'src/model/get-exercises-out.dto';
import { Results } from 'src/schemas/results.schema';
import { Exercise } from '../../schemas/exercise.schema';

@Injectable()
export class ExercisesService {
    constructor(
        @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
        @InjectModel(Results.name) private resultsModel: Model<Results>,
    ) {}

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

    async getResults(uid: string): Promise<Results[]>;
    async getResults(uid: string, exercise: Exercise): Promise<Results>;
    async getResults(uid: string, exercise?: Exercise): Promise<Results | Results[]> {
        if (exercise) {
            var results = await this.resultsModel.findOne({ user: uid, exercise: exercise._id }).exec();
            if (!results) {
                results = await this.resultsModel.create({
                    user: uid,
                    exercise: exercise._id,
                    testcaseResults: exercise.testcases.map(() => ({})),
                });
            }
            return results;
        } else {
            return await this.resultsModel.find({ user: uid }).exec();
        }
    }

    // async runTestcases(exerciseId: string, program: string) {
    //     const exercise = await this.find(exerciseId);
    //     return Promise.all()
    // }

    mapExercisesToGetExercisesOutDto(exercises: Exercise[]): GetExercisesOutDto {
        return { exercises: exercises.map((e) => ({ id: e._id, name: e.name, score: 0, maxScore: 0 })) };
    }

    getExerciseWithResultsDto(exercise: Exercise, results: Results): ExerciseDto {
        const resultsObj = results.toObject();
        var exerciseObj = exercise.toObject();
        exerciseObj.testcases = exerciseObj.testcases.map((testcase, i) => ({
            ...testcase,
            ...resultsObj.testcaseResults[i],
            _id: undefined,
        }));
        return new ExerciseDto({ ...exerciseObj, lastProgram: resultsObj.lastProgram, maxPoints: exerciseObj.hiddenTestcases.length });
    }
}
