import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// 用该装饰器就能生成表
@Entity()
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  money: number;
}
