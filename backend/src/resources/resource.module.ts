import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])], // <-- registramos la entidad TypeOrmModule.forFeature([Resource]): Le dice a Nest que la entidad Resource se usará en este módulo, y se pueden inyectar repositorios de ella.
  controllers: [ResourceController],
  providers: [ResourceService],
  exports: [TypeOrmModule], // <-- si después queremos usar esta entidad desde otro módulo
  //exports: [ResourceService], // opcional, por si se usa desde otro módulo
})
export class ResourceModule {}
