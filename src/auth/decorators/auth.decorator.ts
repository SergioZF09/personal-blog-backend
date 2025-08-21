import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "src/common/enums/role.enum";
import { Roles } from "./roles.decorator";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

export function Auth(...roles: Role[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(JwtAuthGuard, RolesGuard),
        ApiBearerAuth()
    );
}