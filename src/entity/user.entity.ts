import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import { ProfileModel } from 'src/entity/profile.entity';
import { PostModel } from 'src/entity/post.entity';

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class UserModel {
    //   @PrimaryColumn()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    //   @Column({
    //     type: 'varchar',
    //     name: 'title',
    //     length: 300,
    //     nullable: true,
    //     update: true,
    //     select: true,
    //     default: 'default value',
    //     unique: false,
    //   })
    //   title: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // 데이터가 업데이트 될때마다 1씩 올라간다.
    // 처음 생서되면 갑은 1이다.
    // save() 함수가 몇번 불렸는지 기억한다.
    @VersionColumn()
    version: number;

    @Column()
    @Generated('uuid')
    additionalId: string;

    @OneToOne(() => ProfileModel, (profile) => profile.user, {
        // find() 실행 할때마다 항상 같이 가져올 relation
        eager: true,
        // 저장할때 relation 을 한번에 같이 저장가능
        cascade: true,
        //  nullable: true 이면 null 이 가능하다. 버전에 따라 에러를 던지지 않는다
        nullable: true,
        // onDelete: 'CASCADE' 이면 user 가 삭제되면 profile 도 삭제된다.
        // onDelete: 'SET NULL' 이면 user 가 삭제되면 profile 의 user_id 가 null 이 된다.
        // onDelete: 'RESTRICT' 이면 user 를 삭제하려해도 profile 이 있다면 삭제 되지 않는다.
        // onDelete: 'NO ACTION' 이면 user 가 삭제되면 profile 도 삭제되지 않는다.
        // onDelete: 'SET DEFAULT' 이면 user 가 삭제되면 profile 의 user_id 가 default 값으로 설정된다.
        // 버전에 따라 에러를 던지지 않는다
        onDelete: 'RESTRICT',
    })
    profile: ProfileModel;

    @OneToMany(() => PostModel, (post) => post.author)
    posts: PostModel[];
}
