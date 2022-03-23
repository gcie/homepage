import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Results, ResultsSchema } from 'src/schemas/results.schema';
import { Submission, SubmissionSchema } from 'src/schemas/submission.schema';
import { UsersModule } from 'src/users/users.module';
import { Exercise, ExerciseSchema } from '../schemas/exercise.schema';
import { GymController } from './gym.controller';
import { ExercisesService } from './services/exercises.service';
import { PythonService } from './services/python.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Exercise.name, schema: ExerciseSchema },
            { name: Submission.name, schema: SubmissionSchema },
            { name: Results.name, schema: ResultsSchema },
        ]),
        UsersModule,
    ],
    providers: [PythonService, ExercisesService],
    controllers: [GymController],
})
export class GymModule {}
