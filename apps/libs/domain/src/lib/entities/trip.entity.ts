import { TripExpense } from "./expense.entity";
import { Person } from "./person.entity";

export type Trip = {
    id?: string;
    title: string;
    destination: string;
    expenses: TripExpense[];
    people: Person[];
    whenStart?: Date;
    whenReturn?: Date;
};