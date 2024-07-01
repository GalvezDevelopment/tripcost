import { Trip } from "./trip.entity";

export type TripExpense = {
  id?: string;
  category:
    | 'Flight'
    | 'Car Rental'
    | 'Food'
    | 'Hotel'
    | 'Fuel'
    | 'Auto Part'
    | 'Service'
    | 'Medical'
    | 'Road Fee'
    | 'Penalty'
    | 'Document'
    | 'Unexpected';
  trip?: Trip;
  personId?: string;
  registeredOn?: Date;
  modifiedOn?: Date;
  cost?: number;
  notes?: string;
};
