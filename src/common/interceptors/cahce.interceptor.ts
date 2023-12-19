import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, of } from "rxjs";

let cacheMap = {}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (cacheMap[request.path + request.method]) {
      console.log(`${request.path} ${request.method} cached`)
      return of(['test'])
    }
    cacheMap[request.path + request.method] = true
    return next.handle()
  }
}
