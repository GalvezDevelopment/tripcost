import { ApiResponse, Trip, TripsRepository } from '@galvezco/tripcost-domain';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trips')
export class TripsController {
  constructor(
    @Inject('TripsRepository') private _repository: TripsRepository
  ) {}

  @Post()
  add(@Body() trip: CreateTripDto): Promise<ApiResponse<Trip>> {
    return this._repository.create({ ...trip, expenses: null, people: null } as Trip);
  }

  @Get()
  async getAll(): Promise<ApiResponse<Trip[]>> {
    return await this._repository.getAll();
  }

  @Get(':id')
  getById(@Param() id: string): Promise<Trip> {
    return Promise.resolve(null);
  }

  @Patch()
  modify(@Body() trip: UpdateTripDto): Promise<Trip> {
    return Promise.resolve(null);
  }

  @Delete(':id')
  deleteById(@Param() id: string): Promise<any> {
    return Promise.resolve(null);
  }
}
