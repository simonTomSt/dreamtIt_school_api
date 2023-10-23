import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { ClassConstructor } from 'class-transformer';

export const Serialize = (dto: ClassConstructor<unknown>) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
