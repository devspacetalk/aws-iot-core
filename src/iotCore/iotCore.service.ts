import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class IotCoreService {
  private isConnected = false;
  constructor(@Inject('MQTT_SERVICE') private readonly client: ClientProxy) {}

  async onOff(onoff: string) {
    const topic = 'aws/iot/core/onoff';
    // 클라이언트가 연결되어 있지 않으면 연결을 시도
    if (!this.isConnected) {
      try {
        await this.client.connect();
        this.isConnected = true; // 연결 상태 업데이트
        console.log('Connected to MQTT broker successfully.');
      } catch (error) {
        console.error('Failed to connect to MQTT broker:', error);
        throw error;
      }
    }

    try {
      this.client.emit(topic, onoff);
    } catch (error) {
      throw error;
    }
  }
}
