import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand)
      throw new NotFoundException(`Brand with id ${id} doesn't exists`);
    return brand;
  }

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      createdAt: new Date().getTime(),
      ...createBrandDto,
    };
    this.brands.push(brand);
    return this.findOne(brand.id);
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    this.findOne(id);
    this.brands = this.brands.map((brand) =>
      brand.id === id
        ? { ...brand, ...updateBrandDto, id, updatedAt: new Date().getTime() }
        : brand,
    );
    return this.findOne(id);
  }

  remove(id: string) {
    this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }

  fillBrandsWithSeed(brands: Brand[]) {
    this.brands = brands;
  }
}
