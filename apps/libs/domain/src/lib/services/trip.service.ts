import { ApiPromise, ApiResponse } from '../aggregates/api-response.aggregate';
import { TripsRepository } from '../drivens/trips.repository';
import { Trip } from '../entities/trip.entity';
import { ServerError } from '../errors/server.error';
import { TripError } from '../errors/trip.error';
import { validateId } from '../utils/common-validations.utils';

export class TripService {
  constructor(private _tripRepository: TripsRepository) {}

  async addTrip(trip: Trip): ApiPromise<Trip> {
    if (trip.id) throw new TripError('Trip has already an id');
    let addedTrip;
    try {
      addedTrip = await this._tripRepository.create(trip);
    } catch (err: unknown) {
      throw new ServerError('Trip', 'Add', (err as Error).stack);
    }
    return addedTrip;
  }

  async getById(tripId: string): ApiPromise<Trip> {
    if (!validateId(tripId)) throw new TripError('Invalid Trip identifier');
    let trip;
    try {
      trip = await this._tripRepository.readById(tripId);
    } catch (err: unknown) {
      throw new ServerError('Trip', 'Get by id', (err as Error).stack);
    }

    if (trip.status === 204 || !trip.data)
      throw new TripError('Trip does not exist');

    return trip as ApiResponse<Trip>;
  }

  async updateTrip(existingTrip: Trip): ApiPromise<Trip> {
    if (!validateId(existingTrip.id!))
      throw new TripError('Trip does not have a valid identifier');
    let trip;
    try {
      trip = await this._tripRepository.update(existingTrip);
    } catch (err: unknown) {
      throw new ServerError('Trip', 'Update', (err as Error).stack);
    }

    if (trip.status === 204 || !trip.data)
      throw new TripError('Trip does not exist');

    return trip as ApiResponse<Trip>;
  }

  async deleteTripById(tripId: string): ApiPromise<void> {
    if (!validateId(tripId)) throw new TripError('Invalid Trip identifier');
    let result;
    try {
      result = await this._tripRepository.deleteById(tripId);
    } catch (err: unknown) {
      throw new ServerError('Trip', 'Delete', (err as Error).stack);
    }
    if (result?.status === 204) throw new TripError('Trip does not exist');

    return result;
  }
}
