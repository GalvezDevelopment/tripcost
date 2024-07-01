import { ApiPromise } from "./../aggregates/api-response.aggregate";
import { Trip } from "../entities/trip.entity";

export abstract class TripsUseCase{
    abstract add(newTrip: Trip): ApiPromise<Trip>;
    abstract findById(tripId: string): ApiPromise<Trip>;
    abstract update(existingTrip: Trip): ApiPromise<Trip>;
    abstract deleteById(tripId: string): ApiPromise<void>;
    abstract getAll(): ApiPromise<Trip[]>;
}