import { Car } from 'src/cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Toyota',
    name: 'Corolla',
  },
  {
    id: uuid(),
    brand: 'Honda',
    name: 'Civic',
  },
  {
    id: uuid(),
    brand: 'Renault',
    name: 'Clio',
  },
];
