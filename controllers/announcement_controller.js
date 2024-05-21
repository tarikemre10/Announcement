const AnnouncementRepository = require('../repositories/announcement_repository');

// Function to handle getAnnouncementbyId
exports.getAnnouncementById = async (msgContent, channel, message) => {
    try {
        const announcement = await AnnouncementRepository.getAnnouncementById(msgContent.id);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(announcement)), {
            correlationId: message.properties.correlationId
        });
    } catch (error) {
        console.error(error);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Failed to fetch announcement' })), {
            correlationId: message.properties.correlationId
        });
    }
};

// Function to handle getCompanyAnnouncements
exports.getCompanyAnnouncements = async (msgContent, channel, message) => {
    try {
        const announcements = await AnnouncementRepository.getCompanyAnnouncements(msgContent.UserId);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(announcements)), {
            correlationId: message.properties.correlationId
        });
    } catch (error) {
        console.error(error);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Failed to fetch company announcements' })), {
            correlationId: message.properties.correlationId
        });
    }
};

// Function to handle createInternshipAnnouncement
exports.createInternshipAnnouncement = async (msgContent, channel, message) => {
    try {
        const { id, user_mail, announcement_type, content, file_path } = msgContent;
        await AnnouncementRepository.saveInternshipAnnouncement({ id, user_mail, announcement_type, content, file_path });
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ success: true })), {
            correlationId: message.properties.correlationId
        });
    } catch (error) {
        console.error(error);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Failed to create announcement' })), {
            correlationId: message.properties.correlationId
        });
    }
};

// Function to handle updateInternshipAnnouncement
exports.updateInternshipAnnouncement = async (msgContent, channel, message) => {
    try {
        const { id, user_mail, announcement_type, content, file_path } = msgContent;
        await AnnouncementRepository.updateInternshipAnnouncement({ id, user_mail, announcement_type, content, file_path });
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ success: true })), {
            correlationId: message.properties.correlationId
        });
    } catch (error) {
        console.error(error);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Failed to update announcement' })), {
            correlationId: message.properties.correlationId
        });
    }
};

// Function to handle deleteInternshipAnnouncement
exports.deleteInternshipAnnouncement = async (msgContent, channel, message) => {
    try {
        await AnnouncementRepository.deleteAnnouncementById(msgContent.id);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ success: true })), {
            correlationId: message.properties.correlationId
        });
    } catch (error) {
        console.error(error);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Failed to delete announcement' })), {
            correlationId: message.properties.correlationId
        });
    }
};

// Function to handle getWaitingAnnouncements
exports.getWaitingAnnouncements = async (msgContent, channel, message) => {
    try {
        const announcements = await AnnouncementRepository.getAnnouncementsByStatus("waiting_for_approvation");
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(announcements)), {
            correlationId: message.properties.correlationId
        });
    } catch (error) {
        console.error(error);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Failed to fetch waiting announcements' })), {
            correlationId: message.properties.correlationId
        });
    }
};

// Function to handle approveAnnouncement
exports.approveAnnouncement = async (msgContent, channel, message) => {
    try {
        await AnnouncementRepository.updateAnnouncementStatus(msgContent.id, "approved");
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ success: true })), {
            correlationId: message.properties.correlationId
        });
    } catch (error) {
        console.error(error);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Failed to approve announcement' })), {
            correlationId: message.properties.correlationId
        });
    }
};

// Function to handle getApprovedAnnouncements
exports.getApprovedAnnouncements = async (msgContent, channel, message) => {
    try {
        const announcements = await AnnouncementRepository.getAnnouncementsByStatus("approved");
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify(announcements)), {
            correlationId: message.properties.correlationId
        });
    } catch (error) {
        console.error(error);
        channel.sendToQueue(message.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Failed to fetch approved announcements' })), {
            correlationId: message.properties.correlationId
        });
    }
};
