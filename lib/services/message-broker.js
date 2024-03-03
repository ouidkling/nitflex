'use strict';

const Amqp = require('amqplib/callback_api');
const { Service } = require('@hapipal/schmervice');

const url = {
	protocol: 'amqp',
	hostname: process.env.MB_HOST || 'localhost',
	port: process.env.MB_PORT || 5672,
};

module.exports = class MessageBrokerService extends Service {
	sendMailToQueue(email) {
		const queue = 'emailQueue';

		return new Promise((resolve, reject) => {
			Amqp.connect(url, (connectionErr, connection) => {
				if (connectionErr) {
					return reject(connectionErr);
				}

				connection.createChannel((channelErr, channel) => {
					if (channelErr) {
						return reject(channelErr);
					}

					channel.assertQueue(queue, {
						durable: false,
					});

					channel.sendToQueue(
						queue,
						Buffer.from(JSON.stringify(email))
					);

					resolve();
				});
			});
		});
	}

	consumeEmail() {
		const { mailerService } = this.server.services();
		const queue = 'emailQueue';

		return new Promise((resolve, reject) => {
			Amqp.connect(url, (connectionErr, connection) => {
				if (connectionErr) {
					throw connectionErr;
				}

				connection.createChannel((channelErr, channel) => {
					if (channelErr) {
						throw channelErr;
					}

					channel.assertQueue(queue, {
						durable: false,
					});

					channel.consume(
						queue,
						async (msg) => {
							const email = JSON.parse(msg.content.toString());

							await mailerService.sendMail(email);
						},
						{
							noAck: true,
						}
					);
				});
			});
		});
	}
};
