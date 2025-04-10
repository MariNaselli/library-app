import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';

@Module({
    providers: [ResourceService],
    controllers: [ResourceController],
    exports: [ResourceService], // opcional, por si se usa desde otro módulo
})
export class ResourceModule {}
