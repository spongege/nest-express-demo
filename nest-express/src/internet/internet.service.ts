import { Injectable, Query } from '@nestjs/common';
import { CreateInternetDto } from './dto/create-internet.dto';
import { UpdateInternetDto } from './dto/update-internet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Internet } from './entities/internet.entity';
import { Tags } from './entities/tags.entity';
import { Like, Repository } from 'typeorm';

export type SearchType = { keyWord: string; page: number; pageSize: number };

export type UpdateTagsType = {
  userId: number;
  tags: string[];
};

// 1.引入 InjectRepository typeOrm 依赖注入 接受一个实体
// 2.引入类型 Repository 接受实体泛型
// 3.Like 用于模糊查询
// 4.save 保存  find 查询 update 更新 delete 删除
@Injectable()
export class InternetService {
  constructor(
    @InjectRepository(Internet) private readonly internet: Repository<Internet>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
  ) {}

  create(createInternetDto: CreateInternetDto) {
    const data = new Internet();
    data.name = createInternetDto.name;
    data.desc = createInternetDto.desc;
    return this.internet.save(data);
  }
  async addTags({ tags, userId }: UpdateTagsType) {
    const userInfo = await this.internet.findOne({
      where: {
        id: userId,
      },
    });
    const tagsList: Tags[] = [];
    for (let i = 0; i < tags.length; i++) {
      const T = new Tags();
      T.tag = tags[i];
      tagsList.push(T);
      // await 异步完成tag的保存以后才能和internet建立连接
      await this.tags.save(T);
    }
    userInfo.tags = tagsList;
    return this.internet.save(userInfo);
  }

  async findAll(@Query() { keyWord, page, pageSize }: SearchType) {
    const listData = await this.internet.find({
      relations: ['tags'],
      where: {
        name: Like(`%${keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await this.internet.count();
    return { listData, total, pageSize: +pageSize };
  }

  findOne(id: number) {
    return `This action returns a #${id} internet`;
  }

  update(id: number, updateInternetDto: UpdateInternetDto) {
    console.log(updateInternetDto, id);
    return this.internet.update(id, updateInternetDto);
  }

  remove(id: number) {
    return this.internet.delete(id);
  }
}
