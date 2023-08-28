import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Internet } from 'src/internet/entities/internet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager, Internet])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
