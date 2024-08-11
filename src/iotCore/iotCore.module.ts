import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IotCoreService } from './iotCore.service';
import { IotCoreController } from './iotCore.controller';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtts://a3ks557jm960cz-ats.iot.ap-northeast-2.amazonaws.com',
          clientId: uuidv4(),
          key: fs.readFileSync(path.join(__dirname, '../../key/kakaoVX-mqtt.private.key')),
          cert: fs.readFileSync(path.join(__dirname, '../../key/kakaoVX-mqtt.cert.pem')),
          ca: fs.readFileSync(path.join(__dirname, '../../key/root-CA.crt')),
          subscribeOptions: {
            qos: 0, // Set QoS level
          },
        },
      },
    ]),
    
  ],
  
  controllers: [IotCoreController],
  providers: [IotCoreService],
})
export class IotCoreModule {
   
}
