import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty({
    message: ({ property }) => {
      return `${property} 不能为空`;
    },
  })
  @IsString()
  @Length(5, 10, {
    message: '字数不符合',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
