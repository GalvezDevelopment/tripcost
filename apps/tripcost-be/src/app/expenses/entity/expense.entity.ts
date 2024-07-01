import { Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn, Column, PrimaryColumn, Relation, JoinColumn } from 'typeorm';
import { TripEntity } from '../../trips/entity/trip.entity';

@Entity('Expense')
export class ExpenseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => TripEntity, trip => trip.expenses)
    @JoinColumn()
    trip: Relation<TripEntity>;

    @CreateDateColumn()
    registeredOn?: Date;
    
    @UpdateDateColumn()
    modifiedOn?: Date;

    @Column({ type: 'numeric', default: 0 })
    cost?: number;

    @Column({ type: 'nvarchar', nullable: true })
    notes?: string;
}