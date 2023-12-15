import { Module } from '@nestjs/common';
import { CoffeeRatingModule } from 'src/coffee-rating/coffee-rating.module';
import { CoffeesService } from 'src/coffees/coffees.service';

@Module({
  imports: [CoffeeRatingModule]
})
export class TestModule {
  constructor(private coffeeService: CoffeesService) {
    console.log('in test module')
    // console.log(this.coffeeService)
  }
}
