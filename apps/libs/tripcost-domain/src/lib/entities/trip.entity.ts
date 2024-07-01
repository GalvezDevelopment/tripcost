
export type Trip = {
    id?: string;
    title: string;
    destination: string;
    expenses: string[];
    people: string[];
    whenStart?: Date;
    whenReturn?: Date;
    creationDate?: Date;
    lastUpdateDate?: Date;
};