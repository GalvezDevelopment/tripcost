import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ApiPromise,
  Trip,
  TripsRepository,
  createApiPromiseFrom,
} from '@galvezco/tripcost-domain';
import { Injectable } from '@nestjs/common';
import { TripEntity } from './entity/trip.entity';

@Injectable()
export class TripsService implements TripsRepository {
  constructor(
    @InjectRepository(TripEntity)
    private readonly _repository: Repository<TripEntity>
  ) {}

  async create(newTrip: Trip): ApiPromise<Trip> {
    const entity = { ...newTrip } as unknown as TripEntity;
    const res = await this._repository.save(entity);
    return await createApiPromiseFrom(200, res as unknown as Trip);
  }
  readById(tripId: string): ApiPromise<Trip> {
    throw new Error('Method not implemented.');
  }
  update(existingTrip: Trip): ApiPromise<Trip> {
    throw new Error('Method not implemented.');
  }
  deleteById(tripId: string): ApiPromise<void> {
    throw new Error('Method not implemented.');
  }
  async getAll(): ApiPromise<Trip[]> {
    const entities = await this._repository.find();
    return createApiPromiseFrom(200, entities.map(e => (e as unknown as Trip)));
  }
}
