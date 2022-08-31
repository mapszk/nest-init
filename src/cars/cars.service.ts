import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      name: 'Corola',
    },
    {
      id: uuid(),
      brand: 'Honda',
      name: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Wolvkswagen',
      name: 'Gol',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} doesn't exists`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = { id: uuid(), ...createCarDto };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    this.findOneById(id);
    this.cars = this.cars.map((car) =>
      car.id === id ? { ...car, ...updateCarDto, id } : car,
    );
    return this.findOneById(id);
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
