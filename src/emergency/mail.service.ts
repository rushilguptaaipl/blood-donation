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
      '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',
    );

    return await this.transactionalEmailsApi.sendTransacEmail({
      sender: {
        name: 'ashriya infotech',
        email: 'rushil.aipl@gmail.com',
      },
      to: [
        {
          email: 'rushil.gupta3@gmail.com',
        },
      ],
      replyTo: {
        email: 'rushil.aipl@gmail.com',
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
