import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IotCoreModule } from './iotCore/iotCore.module';

@Module({
  imports: [IotCoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
