import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class requestLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log(`Before... ${request.method} ${request.path}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${request.method} ${request.path} ${Date.now() - now}ms`)),
      );
  }
}
