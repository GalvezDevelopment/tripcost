import { ApiPromise } from "../aggregates/api-response.aggregate";
import { Trip } from "../entities/trip.entity";

export interface TripsUseCase{
    add(newTrip: Trip): ApiPromise<Trip>;
    findById(tripId: string): ApiPromise<Trip>;
    update(existingTrip: Trip): ApiPromise<Trip>;
    deleteById(tripId: string): ApiPromise<void>;
    getAll(): ApiPromise<Trip[]>;
}