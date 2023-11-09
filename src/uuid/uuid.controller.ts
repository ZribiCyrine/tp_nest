import { Controller, Get } from '@nestjs/common';
import { UuidService } from './uuid.service';

@Controller('uuid')
export class UuidController {

    constructor(private uuidService: UuidService){}
    @Get()
    getUUID(): string{
        return this.uuidService.generateUUID();
    }
}
