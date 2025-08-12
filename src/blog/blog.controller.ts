import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('blog')
@Controller('api/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new blog', description: 'Create a new blog with the data provided.' })
  @ApiCreatedResponse({ type: Blog })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all blogs', description: 'List all blogs saved on database.' })
  @ApiOkResponse({ type: Blog, isArray: true })
  findAll() {
    return this.blogService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List one blog', description: 'List only one blog using the id.' })
  @ApiOkResponse({ type: Blog })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update one blog', description: 'Update only one blog using the id of that blog.' })
  @ApiOkResponse({ type: Blog })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete one blog', description: 'Delete only one blog using the id of that blog.' })
  @ApiNoContentResponse({ description: "No content" })
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
