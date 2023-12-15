import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeeService: CoffeesService) {
    console.log('coffee rating service instantiated');
  }

  showRatings(id: number) {
    return `This action returns all coffee ratings for coffee #${id}`;
  }
}
