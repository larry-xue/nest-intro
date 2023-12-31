import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Index(['name', 'type'])
@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
