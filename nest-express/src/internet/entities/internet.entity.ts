import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class Internet {
  /* 
  @Column({
    type: 'varchar',
    name: 'ipaaa', //数据库表中的列名
    nullable: true, //在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
    comment: '注释',
    select: true, //定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
    default: 'xxxx', //加数据库级列的DEFAULT值
    primary: false, //将列标记为主要列。 使用方式和@ PrimaryColumn相同。
    update: true, //指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"
    collation: '', //定义列排序规则。
  })
  ip: string;
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  desc: string;

  @CreateDateColumn()
  time: Date;

  @OneToMany(() => Tags, (tags) => tags.internet)
  tags: Tags[];

  // @Column()
  // age: number;

  // @CreateDateColumn()
  // time: Date;

  // @Column({
  //   type: 'enum',
  //   enum: [1, 2, 3],
  //   default: 1,
  // })
  // enum: number;

  // // simple-array的特殊列类型，它可以将原始数组值存储在单个字符串列中。 所有值都以逗号分隔
  // @Column({ type: 'simple-array' })
  // simpleArray: string[];

  // // simple-json的特殊列类型，它可以存储任何可以通过 JSON.stringify 存储在数据库中的值。 当你的数据库中没有 json 类型而你又想存储和加载对象，该类型就很有用了
  // @Column('simple-json')
  // simpleJson: { name: string; nickname: string };
}
