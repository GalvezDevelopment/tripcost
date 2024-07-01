import { ApiPromise } from "../aggregates/api-response.aggregate";
import { Person } from "../entities/person.entity";

export interface PeopleUseCase {
    add(person: Person): ApiPromise<Person>;
    findById(personId: string): ApiPromise<Person>;
    update(person: Person): ApiPromise<Person>;
    deleteById(personId: string): ApiPromise<void>;
    getAll(): ApiPromise<Person[]>;
}