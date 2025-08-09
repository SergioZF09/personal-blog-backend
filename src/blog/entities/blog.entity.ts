import { ApiProperty } from "@nestjs/swagger"
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    title: string

    @Column()
    @ApiProperty()
    content: string

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty()
    datePublication: Date

}
