import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    content: string

}
