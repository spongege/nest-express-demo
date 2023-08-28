import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Internet } from './internet.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @ManyToOne(() => Internet)
  internet: Internet;
}
