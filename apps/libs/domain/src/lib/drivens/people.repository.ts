import { ApiPromise } from "../aggregates/api-response.aggregate";
import { Person } from "../entities/person.entity";

export interface PeopleRepository {
    create(person: Person): ApiPromise<Person>;
    readById(personId: string): ApiPromise<Person>;
    update(person: Person): ApiPromise<Person>;
    deleteById(personId: string): ApiPromise<void>;
}