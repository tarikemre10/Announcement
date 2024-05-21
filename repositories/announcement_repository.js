const Announcement = require("../models/Announcement");

exports.getAnnouncementbyId = async function(announcement_id){

    console.log("repo")
    console.log(announcement_id); // Ensure the correct model is imported
    try {
        // Fetch announcements where user_mail equals the provided userId
        const announcement = await Announcement.findAll({
            where: {
                id: announcement_id
            }
        });

        return announcement; // Return the list of announcements
    } catch (error) {
        console.error('Error fetching company announcements:', error);
        throw error; // Rethrow the error for error handling in the caller function
    }

}

exports.getCompanyAnnouncements = async function(userId) {
    console.log("repo")
    console.log(Announcement); // Ensure the correct model is imported
    try {
        // Fetch announcements where user_mail equals the provided userId
        const announcements = await Announcement.findAll({
            where: {
                user_mail: userId
            }
        });

        return announcements; // Return the list of announcements
    } catch (error) {
        console.error('Error fetching company announcements:', error);
        throw error; // Rethrow the error for error handling in the caller function
    }
}

exports.saveInternshipAnnouncement = async function(announcementData) {
    console.log("repo")
    console.log(Announcement);
    try{
        await Announcement.create({
            id: announcementData.id,
            user_mail: announcementData.user_mail,
            announcement_type: announcementData.announcement_type,
            content: announcementData.content,
            file_path: announcementData.file_path
            // Add other fields as needed
        });
    } catch(e){
        console.log("repo/saveInternship");
        console.log(e);
    }
}


exports.updateInternshipAnnouncement = async function(announcementData) {
    console.log("repo")
    console.log(Announcement);
    try {
        // Check if the announcement with the same ID already exists
        const existingAnnouncement = await Announcement.findByPk(announcementData.id);

        if (existingAnnouncement) {
            // If the announcement exists, update its attributes
            await existingAnnouncement.update({
                user_mail: announcementData.user_mail,
                announcement_type: announcementData.announcement_type,
                content: announcementData.content,
                file_path: announcementData.file_path
                // Add other fields as needed
            });
        } else {
            // If the announcement doesn't exist, create a new one
            await Announcement.create({
                id: announcementData.id,
                user_mail: announcementData.user_mail,
                announcement_type: announcementData.announcement_type,
                content: announcementData.content,
                file_path: announcementData.file_path
                // Add other fields as needed
            });
        }
    } catch (e) {
        console.log("repo/saveInternship");
        console.log(e);
    }
}




exports.deleteAnnouncementbyId = async function(announcement_id) {
    console.log("repo");
    console.log(announcement_id);

    try {
        // Attempt to delete the announcement with the provided ID
        const deleted = await Announcement.destroy({
            where: {
                id: announcement_id
            }
        });

        if (deleted) {
            console.log(`Announcement with ID ${announcement_id} deleted successfully.`);
            return { message: `Announcement with ID ${announcement_id} deleted successfully.` };
        } else {
            console.log(`Announcement with ID ${announcement_id} not found.`);
            return { message: `Announcement with ID ${announcement_id} not found.` };
        }
    } catch (error) {
        console.error('Error deleting announcement:', error);
        throw error; // Rethrow the error for error handling in the caller function
    }
};