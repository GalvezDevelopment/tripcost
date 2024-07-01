import { ExpenseEntity } from './../../expenses/entity/expense.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Relation
} from 'typeorm';

@Entity('Trip')
export class TripEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  title: string;

  @Column({ type: 'nvarchar', length: 500 })
  description: string;

  @Column({ type: 'date', nullable: true })
  whenStart?: Date;

  @Column({ type: 'date', nullable: true })
  whenReturn?: Date;

  @OneToOne(type => ExpenseEntity, expense => expense.trip)
  expenses: Relation<ExpenseEntity>;

  @CreateDateColumn()
  creationDate: Date;

  @UpdateDateColumn()
  lastUpdateDate: Date;
}
