import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [DatabaseModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
