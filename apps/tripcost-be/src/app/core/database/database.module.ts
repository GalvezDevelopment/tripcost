import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { createDatabase, checkDatabase } from 'typeorm-extension';
import { TripEntity } from '../../trips/entity/trip.entity';
import { ExpenseEntity } from '../../expenses/entity/expense.entity';

export const DATABASE_CONFIG: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'C123456!',
  database: 'tripcostdb',
  entities: [TripEntity, ExpenseEntity],
  synchronize: true,
};

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await createDatabase({
          ifNotExist: true,
          options: DATABASE_CONFIG,
        });
        const res = await checkDatabase({ options: DATABASE_CONFIG });
        console.log(res);

        const dataSource = new DataSource(DATABASE_CONFIG);
        try {
          await dataSource.initialize();
        } catch (err) {
          console.log(err);
        }
        return dataSource;
      },
    },
  ],
  imports: [TypeOrmModule],
  exports: [TypeOrmModule, DataSource],
})
export class DatabaseModule {}
