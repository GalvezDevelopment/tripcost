
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
  tripId?: string;
  personId?: string;
  registeredOn?: Date;
  modifiedOn?: Date;
  cost?: number;
  notes?: string;
};
