import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
// import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { readdirSync } from 'fs';
import type { Response } from 'express';
import { zip } from 'compressing';
import { ApiTags } from '@nestjs/swagger';

@Controller('upload')
@ApiTags('上传')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('album')
  create(@UploadedFile() file, @Body() body) {
    console.log('body', body);
    console.log(file);
    return 'upload file success!!!';
  }

  @Get('export')
  downLoads(@Res() res: Response) {
    const dir = '../images';
    const dirPath = resolve(__dirname, dir);
    const files = readdirSync(dirPath);
    console.log(files);
    if (files.length) {
      const firstUrl = `${join(__dirname, dir)}/${files[0]}`;
      res.download(firstUrl);
    } else {
      res.send('no file');
    }
    // return this.uploadService.findAll();
  }

  @Get('stream')
  async download(@Res() res: Response) {
    const dir = '../images';
    const dirPath = resolve(__dirname, dir);
    const files = readdirSync(dirPath);
    if (files.length) {
      const firstUrl = `${join(__dirname, dir)}/${files[0]}`;

      const tarStream = new zip.Stream();
      await tarStream.addEntry(firstUrl);

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=imageszip`);

      tarStream.pipe(res);
    } else {
      res.send('no zip file');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
