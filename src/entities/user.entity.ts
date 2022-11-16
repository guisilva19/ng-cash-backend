import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Accounts } from "./accounts";
import { Exclude } from 'class-transformer'

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({ unique: true })
    username: string

    @Column()
    @Exclude()
    password: string

    @OneToOne(() => Accounts, {eager: true})
    @JoinColumn()
    account: Accounts
}
