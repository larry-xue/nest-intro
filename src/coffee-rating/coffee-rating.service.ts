import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeeService: CoffeesService) {}

  showRatings(id: number) {
    return `This action returns all coffee ratings for coffee #${id}`;
  }
}
