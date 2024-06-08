import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import { ProfileModel } from "./profile.entity";

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

    @OneToOne(() => ProfileModel, (profile) => profile.user)
    profile: ProfileModel;
}
