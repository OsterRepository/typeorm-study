import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostModel } from './entity/post.entity';
import { ProfileModel } from './entity/profile.entity';
import { UserModel } from './entity/user.entity';
import { TagModel } from 'src/entity/tag.entity';

@Controller()
export class AppController {
    constructor(
        @InjectRepository(UserModel)
        private readonly userRepository: Repository<UserModel>,
        @InjectRepository(ProfileModel)
        private readonly profileRepository: Repository<ProfileModel>,
        @InjectRepository(PostModel)
        private readonly postRepository: Repository<PostModel>,
        @InjectRepository(TagModel)
        private readonly tagRepository: Repository<TagModel>,
    ) {}

    @Post('users')
    postUser() {
        return this.userRepository.save({});
    }

    @Get('users')
    getUsers() {
        return this.userRepository.find({});
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

    @Delete('user/profile/:id')
    async deleteUserAndProfile(@Param('id') id: string) {
        await this.profileRepository.delete(+id);

        return true;
    }

    @Post('user/profile')
    async createUserAndProfile() {
        const user = await this.userRepository.save({
            email: 'asdf@codefactory.ai',
            profile: {
                profileImg: 'https://codefactory.ai',
            },
        });

        // const profile = await this.profileRepository.save({
        //     profileImg: 'https://codefactory.ai',
        //     user,
        // });

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

    @Post('posts/tags')
    async createPostsTags() {
        const post1 = await this.postRepository.save({
            title: 'NestJS Lecture',
        });
        const post2 = await this.postRepository.save({
            title: 'Programming Lecture',
        });

        const tag1 = await this.tagRepository.save({
            name: 'javascript',
            posts: [post1, post2],
        });
        const tag2 = await this.tagRepository.save({
            name: 'typescript',
            posts: [post1],
        });

        const post3 = await this.postRepository.save({
            title: 'NextJS Lecture',
            tags: [tag1, tag2],
        });

        return true;
    }

    @Get('posts')
    getPosts() {
        return this.postRepository.find({
            relations: {
                tags: true,
            },
        });
    }

    @Get('tags')
    getTags() {
        return this.tagRepository.find({
            relations: {
                posts: true,
            },
        });
    }
}
