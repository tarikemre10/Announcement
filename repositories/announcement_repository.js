const Announcement = require("../models/Announcement");
exports.getAnnouncementbyId = async function(UserId){

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


