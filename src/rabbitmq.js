const amqp = require('amqplib/callback_api');
const AnnouncementController = require('./controllers/announcement_controller'); // Adjust the path as needed

const rabbitMQUrl = 'amqp://localhost'; // Replace with your RabbitMQ URL

const startRabbitMQConsumer = () => {
    amqp.connect(rabbitMQUrl, function(error0, connection) {
        if (error0) throw error0;

        connection.createChannel(function(error1, channel) {
            if (error1) throw error1;

            const exchange = 'direct_logs';
            const queueName = 'announcementQueue';
            const routingKeys = [
                'company.internship-announcements.get',
                'company.internship-announcements.list',
                'company.internship-announcements.create',
                'company.internship-announcements.update',
                'company.internship-announcements.delete',
                'admin.waiting-announcements.list',
                'admin.waiting-announcements.get',
                'admin.waiting-announcements.approve',
                'admin.waiting-announcements.reject',
                'student.internship-announcements.list',
                'student.internship-announcements.get'
            ];

            channel.assertExchange(exchange, 'direct', { durable: false });

            channel.assertQueue(queueName, { durable: true }, function(error2, q) {
                if (error2) throw error2;

                console.log(`[*] Waiting for messages in queue ${queueName}. To exit press CTRL+C`);

                routingKeys.forEach(routingKey => {
                    channel.bindQueue(q.queue, exchange, routingKey);
                    console.log(`[*] Bound queue ${queueName} to exchange ${exchange} with routing key ${routingKey}`);
                });

                channel.consume(q.queue, async function(message) {
                    const routingKey = message.fields.routingKey;
                    const msgContent = JSON.parse(message.content.toString());
                    

                    console.log(`[x] Received message with routing key ${routingKey}:`, msgContent);

                    try {
                        switch (routingKey) {
                            case 'company.internship-announcements.get':
                                await AnnouncementController.getAnnouncementById(msgContent, channel, message);
                                break;
                            case 'company.internship-announcements.list':
                                await AnnouncementController.getCompanyAnnouncements(msgContent, channel, message);
                                break;
                            case 'company.internship-announcements.create':
                                await AnnouncementController.createInternshipAnnouncement(msgContent, channel, message);
                                break;
                            case 'company.internship-announcements.update':
                                await AnnouncementController.updateInternshipAnnouncement(msgContent, channel, message);
                                break;
                            case 'company.internship-announcements.delete':
                                await AnnouncementController.deleteInternshipAnnouncement(msgContent, channel, message);
                                break;
                            case 'admin.waiting-announcements.list':
                                await AnnouncementController.getWaitingAnnouncements(msgContent, channel, message);
                                break;
                            case 'admin.waiting-announcements.get':
                                await AnnouncementController.getAnnouncementById(msgContent, channel, message);
                                break;
                            case 'admin.waiting-announcements.approve':
                                await AnnouncementController.approveAnnouncement(msgContent, channel, message);
                                break;
                            case 'admin.waiting-announcements.reject':
                                await AnnouncementController.deleteInternshipAnnouncement(msgContent, channel, message);
                                break;
                            case 'student.internship-announcements.list':
                                await AnnouncementController.getApprovedAnnouncements(msgContent, channel, message);
                                break;
                            case 'student.internship-announcements.get':
                                await AnnouncementController.getAnnouncementById(msgContent, channel, message);
                                break;
                            default:
                                console.log(`Unknown routing key: ${routingKey}`);
                        }
                    } catch (error) {
                        console.error(`Error processing message with routing key ${routingKey}:`, error);
                    }

                    channel.ack(message);
                }, { noAck: false });
            });
        });
    });
};

module.exports = startRabbitMQConsumer;