import { ApiPromise } from '../aggregates/api-response.aggregate';
import { TripExpense } from '../entities/expense.entity';
import { Trip } from '../entities/trip.entity';

export interface TripExpensesRepository {
  create(
    tripId: string,
    expense: Omit<TripExpense, 'id' | 'registeredOn' | 'modifiedOn'>
  ): ApiPromise<Trip>;

  readById(expenseId: string): ApiPromise<TripExpense>;

  update(
    tripId: string,
    expense: Omit<TripExpense, 'registerOn' | 'modifiedOn'>
  ): ApiPromise<Trip>;

  deleteById(tripId: string, expenseId: string): ApiPromise<void>;
}
