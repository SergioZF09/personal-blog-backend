import { Role } from "src/common/enums/role.enum"

export class Payload {
    id: number
    username: string
    roles: Role[]
}