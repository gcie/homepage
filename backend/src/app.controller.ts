import { Body, Controller, Post } from '@nestjs/common';
import { spawn } from 'child_process';
import { Roles } from './model/role.decorator';
import { Role } from './model/role.enum';

@Controller('api')
export class AppController {
    @Post('run')
    @Roles(Role.User)
    async run(@Body() body) {
        const prog = spawn(`python -c "print('hello')"`);
        prog.on('data', (data) => {
            console.log(data);
        });
        console.log(body);
    }
}
