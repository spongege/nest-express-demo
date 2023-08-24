import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  findAll() {
    return `This action returns all spider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spider`;
  }

  update(id: number, updateSpiderDto: UpdateSpiderDto) {
    return `This action updates a #${id} spider`;
  }

  remove(id: number) {
    return `This action removes a #${id} spider`;
  }
  // 加载 所有 img，页码为 1 101 201 ...
  async findAllImg() {
    const urlArr: string[] = [];
    const getImgData = async (idx: number) => {
      // console.log(idx);
      const html = await axios.get(`https://bing.ioliu.cn/?p=${idx}`);
      const $ = cheerio.load(html.data);
      const totalPage = +$('.page span').text().split('/')[1];
      // console.log(totalPage);
      $('.container .item .progressive__img').each((i, el) => {
        urlArr.push($(el).attr('src'));
      });
      idx += 100;
      if (idx <= totalPage) await getImgData(idx);
    };
    await getImgData(1);
    this.writeFile(urlArr);
  }

  // 将图片写入本地
  async writeFile(urls: string[]) {
    const partUrls = urls.slice(0, 2);
    console.log(partUrls);
    partUrls.forEach(async (url) => {
      console.log(url);
      const buffer = await axios
        .get(url, {
          responseType: 'arraybuffer',
        })
        .then((res) => {
          console.log(res.config.url);
          return res.data;
        });

      const fileDir = createWriteStream(
        join(__dirname, `../cos${Date.now()}.jpg`),
      );
      fileDir.write(buffer);
    });
  }
}
