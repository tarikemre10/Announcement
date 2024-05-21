const AnnouncementRepository = require('../repositories/announcement_repository');



exports.getAnnouncementbyId = async function(UserId){

}

exports.createInternshipAnnouncement = async (req, res) =>{
    try {
        const { id, user_mail, announcement_type, content, file_path } = req.body;
        console.log("controller");
        console.log(req.body);
        await AnnouncementRepository.saveInternshipAnnouncement({ id, user_mail, announcement_type, content, file_path });
        res.status(200);
        } catch (error) {
        console.log(error);
        res.status(500).send('Failed to create user');
        }
}




