import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log('request.query = ', request.query);
    return Math.random() > 0.5
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    console.log('reflector = ', reflector);
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(Roles, context.getHandler());
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    // {{ _.nest_intro_base }}/coffees/1?roles=admin
    const user = request.query;
    return matchRoles(roles, user.roles.split(','))
  }
}


function matchRoles(roles: string[], user: string[]): boolean {
  console.log('roles = ', roles, 'user = ', user);
  return user.some(userRole => roles.includes(userRole))
}
