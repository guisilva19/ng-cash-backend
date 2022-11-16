import { Transactions } from './transactions';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity()
export class Accounts {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({default: 100})
    balance: number

    @OneToMany(() => Transactions, transaction => transaction.debited,{ eager: true})
    @JoinColumn()
    debited: Transactions[]

    @OneToMany(() => Transactions, transaction => transaction.credited,{ eager: true})
    @JoinColumn()
    credited: Transactions[]

}