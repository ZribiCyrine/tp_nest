import { Module } from '@nestjs/common';
import { UuidController } from './uuid.controller';
import { UuidService } from './uuid.service';

@Module({
    controllers : [ UuidController ],
    providers : [ UuidService ]
})
export class UuidModule {}
