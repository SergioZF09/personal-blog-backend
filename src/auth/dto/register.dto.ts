import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    username: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    password: string

}
