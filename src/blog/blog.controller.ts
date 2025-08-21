import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('blog')
@Controller('api/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  @Auth(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new blog', description: 'Create a new blog with the data provided.' })
  @ApiCreatedResponse({ type: Blog })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  @Auth(Role.USER, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List all blogs', description: 'List all blogs saved on database.' })
  @ApiOkResponse({ type: Blog, isArray: true })
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @Auth(Role.USER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List one blog', description: 'List only one blog using the id.' })
  @ApiOkResponse({ type: Blog })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Put(':id')
  @Auth(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update one blog', description: 'Update only one blog using the id of that blog.' })
  @ApiOkResponse({ type: Blog })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete one blog', description: 'Delete only one blog using the id of that blog.' })
  @ApiNoContentResponse({ description: "No content" })
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
