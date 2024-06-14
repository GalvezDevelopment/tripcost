import { ApiPromise } from "../aggregates/api-response.aggregate";
import { Trip } from "../entities/trip.entity";

export interface TripsRepository {
    create(newTrip: Trip): ApiPromise<Trip>;
    readById(tripId: string): ApiPromise<Trip | null>;
    update(existingTrip: Trip): ApiPromise<Trip | null>;
    deleteById(tripId: string): ApiPromise<void>;
}