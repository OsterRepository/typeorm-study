import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/entity/user.entity';
import { StudentModdel, TeacherModel } from 'src/entity/person.entity';
import { AirplaneModel, BookModel, CarModel, ComputerModel, SingleBaseModel } from 'src/entity/inheritance.entity';
import { ProfileModel } from 'src/entity/profile.entity';
import { PostModel } from 'src/entity/post.entity';

@Module({
    controllers: [AppController],
    imports: [
        TypeOrmModule.forFeature([UserModel, ProfileModel, PostModel]),
        TypeOrmModule.forRoot({
            database: 'typeormstudy',
            entities: [
                UserModel,
                StudentModdel,
                TeacherModel,
                BookModel,
                CarModel,
                SingleBaseModel,
                ComputerModel,
                AirplaneModel,
                ProfileModel,
                PostModel,
            ],
            host: '127.0.0.1',
            password: 'postgres',
            port: 5432,
            synchronize: true,
            type: 'postgres',
            username: 'postgres',
        }),
    ],
    providers: [AppService],
})
export class AppModule {}
