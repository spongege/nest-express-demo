import { Module } from '@nestjs/common';
import { InternetService } from './internet.service';
import { InternetController } from './internet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Internet } from './entities/internet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Internet])],
  controllers: [InternetController],
  providers: [InternetService],
})
export class InternetModule {}
