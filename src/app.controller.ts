import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entity/post.entity';
import { ProfileModel } from './entity/profile.entity';
import { UserModel } from './entity/user.entity';

@Controller()
export class AppController {
    constructor(
        @InjectRepository(UserModel)
        private readonly userRepository: Repository<UserModel>,
        @InjectRepository(ProfileModel)
        private readonly profileRepository: Repository<ProfileModel>,
        @InjectRepository(PostModel)
        private readonly postRepository: Repository<PostModel>,
    ) {}

    @Post('users')
    postUser() {
        return this.userRepository.save({});
    }

    @Get('users')
    getUsers() {
        return this.userRepository.find({
            relations: {
                profile: true,
            },
        });
    }

    @Patch('users/:id')
    async patchUser(@Param('id') id: string) {
        const user = await this.userRepository.findOne({
            where: {
                id: parseInt(id),
            },
        });
        return this.userRepository.save({
            ...user,
        });
    }

    @Post('user/profile')
    async createUserAndProfile() {
        const user = await this.userRepository.save({
            email: 'asdf@codefactory.ai',
        });

        const profile = await this.profileRepository.save({
            profileImg: 'https://codefactory.ai',
            user,
        });

        return user;
    }

    @Post('user/post')
    async createUserAndPost() {
        const user = await this.userRepository.save({
            email: 'postuser@codefactory.ai',
        });

        await this.postRepository.save({
            author: user,
            title: 'post 1',
        });

        await this.postRepository.save({
            author: user,
            title: 'post 2',
        });
        return user;
    }
}
