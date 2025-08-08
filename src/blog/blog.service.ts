import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  async create(createBlogDto: CreateBlogDto) {
    return await 'This action adds a new blog';
  }

  async findAll() {
    return await `This action returns all blog`;
  }

  async findOne(id: number) {
    return await `This action returns a #${id} blog`;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await `This action updates a #${id} blog`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} blog`;
  }
}
