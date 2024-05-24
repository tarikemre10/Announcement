const AnnouncementRepository = require('../repositories/announcement_repository');

// Function to handle getAnnouncementbyId
exports.getAnnouncementById = async (msgContent, channel, message) => {
    try {
        const announcement = await AnnouncementRepository.getAnnouncementById(msgContent.id);
        const exchange = 'direct_logs';    
        channel.publish(exchange, 'success', Buffer.from(JSON.stringify(announcement)),{
        correlationId: message.properties.correlationId})
  
    } catch (error) {
        console.error(error);
        channel.publish(exchange, 'failure', Buffer.from(JSON.stringify({ error: 'Failed to fetch announcement' })),{
        correlationId: message.properties.correlationId})
    }
};

// Function to handle getCompanyAnnouncements
exports.getCompanyAnnouncements = async (msgContent, channel, message) => {
    try {
        const announcements = await AnnouncementRepository.getCompanyAnnouncements(msgContent.user_mail);
        const exchange = 'direct_logs';    
        channel.publish(exchange, 'success', Buffer.from(JSON.stringify(announcements)),{
        correlationId: message.properties.correlationId});
    } catch (error) {
        console.error(error);
        channel.publish(exchange, 'failure', Buffer.from(JSON.stringify({ error: 'Failed to fetch announcement' })),{
        correlationId: message.properties.correlationId});
    }    
};


exports.createInternshipAnnouncement = async (msgContent, channel, message) => {
    try {
        const exchange = 'direct_logs'; 
        const { user_mail, announcement_type, title, position, content, file_path } = msgContent;
        await AnnouncementRepository.saveInternshipAnnouncement({user_mail, announcement_type, title, position, content, file_path });
        channel.publish(exchange, 'success', Buffer.from(JSON.stringify({success_message: 'Announcement Created'})),{
            correlationId: message.properties.correlationId});  
    } catch (error) {
        console.error(error);
        channel.publish(exchange, 'failure', Buffer.from(JSON.stringify({ error: 'Failed to create announcement' })),{
            correlationId: message.properties.correlationId});
    }
};

// Function to handle updateInternshipAnnouncement
exports.updateInternshipAnnouncement = async (msgContent, channel, message) => {
    try {
        const exchange = 'direct_logs';
        const { id, user_mail, announcement_type, title, position, content, file_path } = msgContent;
        await AnnouncementRepository.updateInternshipAnnouncement({ id, user_mail, announcement_type, title, position, content, file_path });
        channel.publish(exchange, 'success', Buffer.from(JSON.stringify({success_message: 'Announcement Updated'})),{
            correlationId: message.properties.correlationId});
    } catch (error) {
        console.error(error);
        channel.publish(exchange, 'failure', Buffer.from(JSON.stringify({ error: 'Failed to update announcement' })),{
            correlationId: message.properties.correlationId});
    }
};

// Function to handle deleteInternshipAnnouncement
exports.deleteInternshipAnnouncement = async (msgContent, channel, message) => {
    try {
        const exchange = 'direct_logs';
        await AnnouncementRepository.deleteAnnouncementById(msgContent.id);
        channel.publish(exchange, 'success', Buffer.from(JSON.stringify({success_message: 'Announcement Deleted'})),{
            correlationId: message.properties.correlationId});
    } catch (error) {
        console.error(error);
        channel.publish(exchange, 'failure', Buffer.from(JSON.stringify({ error: 'Failed to delete announcement' })),{
            correlationId: message.properties.correlationId});
    }
};

// Function to handle getWaitingAnnouncements
exports.getWaitingAnnouncements = async (msgContent, channel, message) => {
    try {
        const announcements = await AnnouncementRepository.getAnnouncementsByStatus("waiting_for_approvation");
        const exchange = 'direct_logs';    
        channel.publish(exchange, 'success', Buffer.from(JSON.stringify(announcements)),{
        correlationId: message.properties.correlationId});
    } catch (error) {
        console.error(error);
        channel.publish(exchange, 'failure', Buffer.from(JSON.stringify({ error: 'Failed to fetch announcement' })),{
        correlationId: message.properties.correlationId});
    }
};

// Function to handle approveAnnouncement
exports.approveAnnouncement = async (msgContent, channel, message) => {
    try {
        const exchange = 'direct_logs';  
        await AnnouncementRepository.updateAnnouncementStatus(msgContent.id, "approved");
        channel.publish(exchange, 'success', Buffer.from(JSON.stringify({success_message: 'Announcement Approved'})),{
            correlationId: message.properties.correlationId});
    } catch (error) {
        console.error(error);
        channel.publish(exchange, 'failure', Buffer.from(JSON.stringify({ error: 'Failed to approve announcement' })),{
            correlationId: message.properties.correlationId});
    }
};

// Function to handle getApprovedAnnouncements
exports.getApprovedAnnouncements = async (msgContent, channel, message) => {
    try {
        const announcements = await AnnouncementRepository.getAnnouncementsByStatus("approved");
        const exchange = 'direct_logs';    
        channel.publish(exchange, 'success', Buffer.from(JSON.stringify(announcements)),{
        correlationId: message.properties.correlationId});
    } catch (error) {
        console.error(error);
        channel.publish(exchange, 'failure', Buffer.from(JSON.stringify({ error: 'Failed to fetch announcement' })),{
        correlationId: message.properties.correlationId});
    }
};
