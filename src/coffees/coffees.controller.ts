import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.coffeesService.findOne(id);
  }

  @Post()
  @HttpCode(200)
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return await this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return await this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.coffeesService.remove(id);
  }
}
