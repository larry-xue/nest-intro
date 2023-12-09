import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesEntity } from './entities/coffees.entity';
import { FlavorEntity } from './entities/flavor.entity';
import { EventEntity } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constant';

class DynamicClass { }
@Injectable()
class CoffeeBrandsFactory {
  create() {
    return ['lucking coffee', 'buddy brew', 'nescafe'];
  }
}

@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService, CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      // useValue: ['buddy brew', 'nescafe', 'starbucks'],
      // useFactory: (coffeeBrandFactory: CoffeeBrandsFactory) => coffeeBrandFactory.create(),
      useFactory: async (coffeeBrandFactory: CoffeeBrandsFactory) => {
        return await Promise.resolve(coffeeBrandFactory.create().map(brand => brand.toUpperCase()));
      },
      inject: [CoffeeBrandsFactory],
    }, {
      provide: 'DYNAMIC_CLASS',
      useClass: DynamicClass
    }],
  imports: [
    TypeOrmModule.forFeature([CoffeesEntity, FlavorEntity, EventEntity]),
  ],
  exports: [CoffeesService],
})
export class CoffeesModule { }
