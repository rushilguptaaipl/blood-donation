import { Donation } from '@donations/entities/donation.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TransactionalEmailsApi } from '@sendinblue/client';
import { Emergency } from './entities/emergency.entity';

@Injectable()
export class MailService {
  constructor(private transactionalEmailsApi: TransactionalEmailsApi) { }

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


  async sendDonations(donation: Donation[], emergency: Emergency) {

    const donationRows = []

    donation.map((donar) => {
      const row = {
        name: donar.name,
        contact: donar.contact,
        email: donar.email,
      }
      donationRows.push(row)
    })
    
    const htmlRows = donationRows.map(row => `<li><strong> name:</strong> ${row.name} <strong>contact:</strong> ${row.contact} <strong> email:</strong> ${row.email} </li>`).join('');

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
            <h1>Greetings ${emergency.registerar_name}</h1>
            <p>We have a new Emergency from you </p>
            <p> city : ${emergency.city.city} and blood group : ${emergency.blood_group} </p>
            <ul>
            ${htmlRows}
            </ul>
            <p>Details are send by admin of blood donation portal</p>
            <p>Thank you!</p>
          </div>
        </body>
        </html>`
    });
  }
}
