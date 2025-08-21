import { ApiProperty } from "@nestjs/swagger"
import { Role } from "src/common/enums/role.enum"
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

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    @ApiProperty()
    roles: Role[]

    @CreateDateColumn({ type: 'timestamp' })
    @ApiProperty()
    createdAt: Date

}