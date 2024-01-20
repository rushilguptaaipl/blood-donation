import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionalEmailsApi } from '@sendinblue/client';

@Injectable()
export class MailService {
  constructor(private transactionalEmailsApi: TransactionalEmailsApi) {}

  async sendAdminConfirmation(createEmergencyDto) {
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
        `<html>
        <head>
          <style>
            /* Inline CSS for styling */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Greetings Admin!</h1>
            <p>There is new emergency:</p>
            <ul>
              <li><strong>Blood Group: ${createEmergencyDto.blood_group}</strong> </li>
              <li><strong>Hospital: ${createEmergencyDto.hospital}</strong></li>
              <li><strong>City: ${createEmergencyDto.city}</strong></li>
              <li><strong>Contact: ${createEmergencyDto.contact}</strong></li>
            </ul>
            <p>Details are send by ${createEmergencyDto.registerar_name}</p>
            <p>Thank you!</p>
          </div>
        </body>
        </html>`
    });
  }
}
