const AnnouncementRepository = require('../repositories/announcement_repository');



exports.getAnnouncementbyId = async (req, res) =>{
    try {
        console.log("ANnouncement:", req.params.id);// Ifetched this from 
        announcement = await AnnouncementRepository.getAnnouncementbyId(req.params.id);// UserId might be different
        res.json(announcement);
        console.log("Announcement:", req.params.id);
    } catch (error) {
        console.log("controller/getCompany");
        console.log(error);
    }
}

exports.getCompanyAnnouncements = async (req, res) =>{
    try {
            console.log("USERID:", req.query.UserId);// Ifetched this from 
            announcements = await AnnouncementRepository.getCompanyAnnouncements(req.query.UserId);// UserId might be different
            res.json(announcements);
            console.log("USERID:", req.query.UserId);
    } catch (error) {
        console.log("controller/getCompany");
        console.log(error);
    }
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

exports.updateInternshipAnnouncement = async (req, res) =>{
    try {
        const { id, user_mail, announcement_type, content, file_path } = req.body;
        console.log("controller");
        console.log(req.body);
        await AnnouncementRepository.updateInternshipAnnouncement({ id, user_mail, announcement_type, content, file_path });
        res.status(200);
        } catch (error) {
        console.log(error);
        res.status(500).send('Failed to create user');
        }
}

exports.deleteInternshipAnnouncement = async (req, res) =>{
    try {
        console.log("ANnouncement:", req.params.id);// Ifetched this from 
        await AnnouncementRepository.deleteAnnouncementbyId(req.params.id);// UserId might be different
        console.log("Announcement:", req.params.id);
    } catch (error) {
        console.log("controller/getCompany");
        console.log(error);
    }
}




