'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const NodeMailer = require('nodemailer');

module.exports = class MailerService extends Service {
	createTestAccount() {
		return new Promise((resolve, reject) => {
			NodeMailer.createTestAccount((err, account) => {
				if (err) {
					Boom.conflict(
						`Failed to create a testing account : ` + err.message
					);
					reject(err);
				} else {
					resolve(account);
				}
			});
		});
	}

	async sendMail({ to, subject, text, html }) {
		const account = await this.createTestAccount();

		const transporter = NodeMailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		});

		const mailOptions = {
			from: 'Sender Name <sender@example.com>',
			to,
			subject,
			text,
			html,
		};

		const info = await transporter.sendMail(mailOptions);

		console.log('Message sent: %s', info.messageId);
		// Preview URL only available when sending through an Ethereal account
		console.log('Preview URL: %s', NodeMailer.getTestMessageUrl(info));
	}
};
