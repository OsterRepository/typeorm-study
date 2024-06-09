import { UserModel } from 'src/entity/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TagModel } from 'src/entity/tag.entity';

@Entity()
export class PostModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.posts)
    author: UserModel;

    @Column()
    title: string;

    @ManyToMany(() => TagModel, (tag) => tag.posts)
    @JoinTable()
    tags: TagModel[];
}
