import { ApiProperty } from "@nestjs/swagger"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    username: string

    @Column()
    @ApiProperty()
    password: string

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty()
    createdAt: Date

}