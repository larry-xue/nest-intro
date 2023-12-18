import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CustomValidationPipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('metadata = ', metadata);
    console.log('typeof metatype = ', typeof metadata.metatype);
    console.log('call result of metatype = ', (new metadata.metatype())[0]);
    return value;
  }
}
