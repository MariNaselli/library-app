import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Module({
    providers: [ResourceService],
    exports: [ResourceService], // opcional, por si se usa desde otro módulo
})
export class ResourceModule {}
