import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingController } from './coffee-rating.controller';

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService, {
    provide: 'CUSTOM_TOKEN',
    useValue: 'custom value',
  }],
  controllers: [CoffeeRatingController]
})
export class CoffeeRatingModule { }
