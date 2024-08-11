import { Controller, Post, Body, Param } from '@nestjs/common';
import { IotCoreService } from './iotCore.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';

@ApiTags('AWS Iot Core mqtt 테스트')
@Controller('iotcore')
export class IotCoreController {
  constructor(private readonly iotCoreService: IotCoreService) {}

  @Post('onoff/:execute')
  @ApiParam({
    name: 'execute',
    required: true,
    description: '동작 방식 true/ false',
    enum: ['true', 'false'],
  })
  async publishOnOff(@Param('execute') execute: string) {
    const onoff = execute;
    await this.iotCoreService.onOff(onoff);
    return { message: `토픽 aws/iot/core/onoff 에 메시지 전송됨: ${onoff}` };
  }
}
