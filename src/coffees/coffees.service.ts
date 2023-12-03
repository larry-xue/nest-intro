import { NotFoundException, Injectable } from '@nestjs/common';
import { CoffeesEntity } from './entities/coffees.entity';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';
import { FlavorEntity } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { EventEntity } from 'src/events/entities/event.entity/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(CoffeesEntity)
    private readonly coffeeRepository: Repository<CoffeesEntity>,
    @InjectRepository(FlavorEntity)
    private readonly flavorRepository: Repository<FlavorEntity>,
    private readonly connection: DataSource,
  ) {}

  private async getCoffeeById(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: {
        flavors: true,
      },
    });
    if (!coffee) throw new NotFoundException(`failed to get id: ${id}`);
    return coffee;
  }

  private async preloadFlavorByName(name: string) {
    const existingFlavor = await this.flavorRepository.findOneBy({
      name,
    });
    if (existingFlavor) return existingFlavor;
    return this.flavorRepository.create({ name });
  }

  findAll(pagination: PaginationQueryDto) {
    const { limit, offset } = pagination;
    return this.coffeeRepository.find({
      skip: offset,
      take: limit,
      relations: {
        flavors: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.getCoffeeById(id);
  }

  async create(entity: CreateCoffeeDto) {
    const flavors = await Promise.all(
      entity.flavors.map((itm) => this.preloadFlavorByName(itm)),
    );
    const coffee = this.coffeeRepository.create({
      ...entity,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, entity: UpdateCoffeeDto) {
    const flavors =
      entity.flavors &&
      (await Promise.all(
        entity.flavors.map((itm) => this.preloadFlavorByName(itm)),
      ));
    await this.getCoffeeById(id);
    return await this.coffeeRepository.save({
      id,
      ...entity,
      flavors,
    });
  }

  async remove(id: number) {
    const coffee = await this.getCoffeeById(id);
    this.coffeeRepository.remove([coffee]);
  }

  async recommandCoffee(coffee: CoffeesEntity) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      coffee.recommandations++;

      const recommendEvent = new EventEntity();
      recommendEvent.name = 'recommand_coffee';
      recommendEvent.type = 'coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
