import {
  ApiPromise,
  ServerError,
  Trip,
  TripError,
  TripService,
  TripsRepository,
  createApiPromiseFrom,
} from '@galvezco/tripcost-domain';

class TripsRepositoryImp implements TripsRepository {
  create(newTrip: Trip): ApiPromise<Trip> {
    return createApiPromiseFrom<Trip>(200, { id: '1', ...newTrip });
  }
  readById(tripId: string): ApiPromise<Trip | null> {
    if (tripId !== '9dfdd45b-4bb7-49bc-a5eb-8854f52fd926')
      return createApiPromiseFrom<null>(204, null);
    return createApiPromiseFrom<Trip>(200, {
      id: '9dfdd45b-4bb7-49bc-a5eb-8854f52fd926',
      title: 'Title Example',
      destination: 'Tijuana',
      expenses: [],
      people: [],
    });
  }
  update(existingTrip: Trip): ApiPromise<Trip | null> {
    return createApiPromiseFrom<Trip>(200, {
      id: '9dfdd45b-4bb7-49bc-a5eb-8854f52fd926',
      title: existingTrip.title,
      destination: existingTrip.destination,
      expenses: [],
      people: [],
    });
  }
  deleteById(tripId: string): ApiPromise<void> {
    return createApiPromiseFrom<void>(200, undefined);
  }
}

describe('TripService', () => {
  let repository: TripsRepositoryImp;
  let tripSrv: TripService;
  const mockedTrip = {
    title: 'Buying a Honda',
    destination: 'Tijuana',
  } as Trip;

  beforeEach(() => {
    repository = new TripsRepositoryImp();
    tripSrv = new TripService(repository);
  });

  it('should create', () => {
    expect(tripSrv).toBeDefined();
  });

  describe('create method', () => {
    it('should save a new trip', async () => {
      const result = await tripSrv.addTrip(mockedTrip);
      expect(result.status).toEqual(200);
      expect(result.data?.id).toEqual('1');
    });

    it('should avoid adding trips with id', async () => {
      try {
        const result = await tripSrv.addTrip({ ...mockedTrip, id: '1' });
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
      }
    });

    it('should throw an error when server is down', async () => {
      repository.create = jest.fn(() => {
        throw new Error('Server is down');
      });
      try {
        const result = await tripSrv.addTrip(mockedTrip);
      } catch (err: unknown) {
        expect(repository.create).toHaveBeenCalled();
        expect(err).not.toBeInstanceOf(TripError);
        expect(err).toBeInstanceOf(ServerError);
      }
    });
  });

  describe('get by id method', () => {
    it('should get a trip', async () => {
      const res = await tripSrv.getById('9dfdd45b-4bb7-49bc-a5eb-8854f52fd926');
      expect(res.status).toBe(200);
      expect(res.data).toBeDefined();
      expect(res.data?.id).toEqual('9dfdd45b-4bb7-49bc-a5eb-8854f52fd926');
    });

    it('should validate the id passed', async () => {
      try {
        const res = await tripSrv.getById('9dfdd45b-4bb7-49bc-a5eb');
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
      }
    });

    it('should throw an error when no data found in response', async () => {
      repository.readById = jest.fn((id: string) =>
        createApiPromiseFrom<null>(200, null)
      ); // when status code is 200
      try {
        await tripSrv.getById('9dfdd45b-4bb7-49bc-a5eb-8854f52fd926');
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
        expect(err).not.toBeInstanceOf(ServerError);
      }

      repository.readById = jest.fn((id: string) =>
        createApiPromiseFrom<Trip>(204, {} as unknown as Trip)
      ); // when status code is 204
      try {
        await tripSrv.getById('9dfdd45b-4bb7-49bc-a5eb-8854f52fd926');
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
        expect(err).not.toBeInstanceOf(ServerError);
      }
    });

    it('should trow an error when server is down', async () => {
      repository.readById = jest.fn(() => {
        throw new Error('Server is down');
      });
      try {
        await tripSrv.getById('9dfdd45b-4bb7-49bc-a5eb-8854f52fd926');
      } catch (err: unknown) {
        expect(repository.readById).toHaveBeenCalled();
        expect(err).not.toBeInstanceOf(TripError);
        expect(err).toBeInstanceOf(ServerError);
      }
    });
  });

  describe('Update action', () => {
    it('should update', async () => {
      repository.update = jest.fn(() =>
        createApiPromiseFrom<Trip>(200, { ...mockedTrip })
      );
      const res = await tripSrv.updateTrip({
        ...mockedTrip,
        id: '9dfdd45b-4bb7-49bc-a5eb-8854f52fd926',
      });
      expect(res.status).toBe(200);
      expect(repository.update).toHaveBeenCalled();
      expect(res.data?.title).toEqual('Buying a Honda');
    });

    it('should validate the identifier of the trip to update', async () => {
      try {
        await tripSrv.updateTrip(mockedTrip);
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
      }

      const res = await tripSrv.updateTrip({
        ...mockedTrip,
        id: '9dfdd45b-4bb7-49bc-a5eb-8854f52fd926',
      });

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
    });

    it('should throw an error when lacking of an identifier', async () => {
      repository.update = jest.fn(() =>
        createApiPromiseFrom<Trip>(200, { ...mockedTrip })
      );
      try {
        const res = await tripSrv.updateTrip(mockedTrip);
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
        expect(repository.update).not.toHaveBeenCalled();
      }
    });

    it('should throw an error when no data found in response', async () => {
      repository.update = jest.fn((trip: Trip) =>
        createApiPromiseFrom<null>(200, null)
      ); // when status code is 200
      try {
        await tripSrv.updateTrip({
          ...mockedTrip,
          id: '9dfdd45b-4bb7-49bc-a5eb-8854f52fd926',
        });
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
        expect((err as TripError).message).not.toEqual('Trip does not have a valid identifier');
        expect(err).not.toBeInstanceOf(ServerError);
      }

      repository.update = jest.fn((trip: Trip) =>
        createApiPromiseFrom<Trip>(204, {} as unknown as Trip)
      ); // when status code is 204
      try {
        await tripSrv.updateTrip({
          ...mockedTrip,
          id: '9dfdd45b-4bb7-49bc-a5eb-8854f52fd926',
        });
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
        expect((err as TripError).message).not.toEqual('Trip does not have a valid identifier');
        expect(err).not.toBeInstanceOf(ServerError);
      }
    });
  });

  describe('Delete action', () => {
    it('should delete', async () => {
      repository.deleteById = jest.fn(() =>
        createApiPromiseFrom<void>(200, undefined)
      );
      const res = await tripSrv.deleteTripById('9dfdd45b-4bb7-49bc-a5eb-8854f52fd926');
      expect(res.status).toBe(200);
      expect(repository.deleteById).toHaveBeenCalled();
    });

    it('should validate the identifier of the trip to delete', async () => {
      try {
        await tripSrv.deleteTripById('9dfdd45b-4bb7-49bc-a5eb');
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
      }

      const res = await tripSrv.deleteTripById('9dfdd45b-4bb7-49bc-a5eb-8854f52fd926');
      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
    });

    it('should throw an error when no data found in response', async () => {
      repository.deleteById = jest.fn((id: string) =>
        createApiPromiseFrom<void>(204, undefined)
      ); // when status code is 204
      try {
        await tripSrv.deleteTripById('9dfdd45b-4bb7-49bc-a5eb-8854f52fd926');
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(TripError);
        expect((err as TripError).message).not.toEqual('Trip does not have a valid identifier');
        expect(err).not.toBeInstanceOf(ServerError);
      }
    });
  });
});
