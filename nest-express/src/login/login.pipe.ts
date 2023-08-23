import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log(value, metadata);
    // value 就是 前端传过来的数据 metaData 就是元数据 通过 metatype 可以去实例化这个类
    const dto = plainToInstance(metadata.metatype, value);
    // console.log(dto);
    const errs = await validate(dto);
    console.log(errs);
    if (errs.length) {
      throw new HttpException(errs, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
