import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户姓名',
    example: 'sponge',
  })
  name: string;
  @ApiProperty({ description: '年龄', example: '100' })
  age: number;
}
