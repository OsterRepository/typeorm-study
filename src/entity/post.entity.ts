import { UserModel } from 'src/entity/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class PostModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.posts)
    author: UserModel;

    @Column()
    title: string;
}
