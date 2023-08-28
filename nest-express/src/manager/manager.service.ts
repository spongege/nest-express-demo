import { Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}
  async create(createManagerDto: CreateManagerDto) {
    const { fromId, toId, money } = createManagerDto;
    try {
      return this.managerRepository.manager.transaction(async (manager) => {
        // const from = await this.managerRepository.findOne({
        //   where: { id: fromId },
        // });
        // const from = await manager.findOne(Manager, {
        //   where: { id: fromId },
        // });
        // const to = await manager.findOne(Manager, {
        //   where: { id: toId },
        // });
        const [from, to] = await Promise.all([
          manager.findOne(Manager, {
            where: { id: fromId },
          }),
          manager.findOne(Manager, {
            where: { id: toId },
          }),
        ]);
        if (from.money < money) {
          return '余额不足';
        } else {
          // manager.save(Manager, {
          //   id: createManagerDto.fromId,
          //   money: from.money - createManagerDto.money,
          // });
          // manager.save(Manager, {
          //   id: createManagerDto.toId,
          //   money: to.money + createManagerDto.money,
          // });
          manager.update(Manager, fromId, { money: from.money - money });
          manager.update(Manager, toId, { money: to.money + money });
          return '转账成功';
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manager`;
  }

  update(id: number, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} manager`;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
