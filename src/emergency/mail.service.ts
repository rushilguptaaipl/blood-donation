import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionalEmailsApi } from '@sendinblue/client';

@Injectable()
export class MailService {
  constructor(private transactionalEmailsApi: TransactionalEmailsApi) {}

  async sendUserConfirmation(createEmergencyDto) {
    const configService = new ConfigService();

    await this.transactionalEmailsApi.setApiKey(
      0,
      configService.get('SENDINBLUE_APIKEY')
    );

    return await this.transactionalEmailsApi.sendTransacEmail({
      sender: {
        name: configService.get('SENDINBLUE_NAME'),
        email: configService.get('SENDINBLUE_SENDER'),
      },
      to: [
        {
          email: configService.get('SENDINBLUE_ADMIN'),
        },
      ],
      replyTo: {
        email: configService.get('SENDINBLUE_REPLYTO'),
      },
      subject: 'Emergency Alert',
      htmlContent:
        '<h1> Emergency Alert </h1><h3> Admin, you have a new emergency </h3><h2><br>Details:</h2><br><p>blood group :' +
        createEmergencyDto.blood_group +
        '<br>hospital : ' +
        createEmergencyDto.hospital +
        ' <br>city :' +
        createEmergencyDto.city +
        ' <p>',
    });
  }
}
