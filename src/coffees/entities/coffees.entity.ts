import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { FlavorEntity } from './flavor.entity';

@Entity() // sql table === 'coffee
export class CoffeesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recomendations: number;

  @JoinTable()
  @ManyToMany(() => FlavorEntity, (flavor) => flavor.name, { cascade: true })
  flavors: FlavorEntity[];
}
