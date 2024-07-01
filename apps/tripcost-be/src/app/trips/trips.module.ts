import { Module, InjectionToken } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsRepository } from '@galvezco/tripcost-domain';
import { TripsService } from './trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from './entity/trip.entity';

export const TRIPS_REPOSITORY: InjectionToken<TripsRepository> =
  'TripsRepository';

@Module({
  controllers: [TripsController],
  providers: [
    {
      provide: TRIPS_REPOSITORY,
      useClass: TripsService,
    },
  ],
  imports: [TypeOrmModule.forFeature([TripEntity])],
  exports: [TypeOrmModule]
})
export class TripsModule {}
