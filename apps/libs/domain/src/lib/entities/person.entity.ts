import { Trip } from "./trip.entity";

export type Person = {
    id: string;
    fullName: string;
    relationship: 'Family' | 'Employee' | 'Friend';
    trips: Trip[];
};