import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>
  ) { }

  async create(createBlogDto: CreateBlogDto) {
    const blog = this.blogRepository.create(createBlogDto);
    return await this.blogRepository.save(blog);
  }

  async findAll() {
    return await this.blogRepository.find();
  }

  async findOne(id: number) {
    return await this.blogRepository.findOneBy({ id });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return await this.blogRepository.update(id, updateBlogDto);
  }

  async remove(id: number) {
    return await this.blogRepository.delete(id);
  }
}
