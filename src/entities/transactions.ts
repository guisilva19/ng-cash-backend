import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Accounts } from './accounts';

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn('uuid')
    readonly id : string

    @Column()
    value: number

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Accounts)
    @JoinColumn()
    debited: string

    @ManyToOne(() => Accounts)
    credited: string
}
