import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateBlogDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    content: string

}
