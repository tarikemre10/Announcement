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

//Company
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
        //TO-DO notification will sent.
    } catch (error) {
        console.log("controller/getCompany");
        console.log(error);
    }
}


//Admin

exports.getWaitingAnnouncements = async (req, res) =>{
    try {
            announcements = await AnnouncementRepository.getAnnouncementsbyStatus("waiting_for_approvation");// UserId might be different
            res.json(announcements);      
    } catch (error) {
        console.log("controller/getCompany");
        console.log(error);
    }
}

exports.approveAnnouncement = async (req, res) =>{
    try {
        await AnnouncementRepository.updateAnnouncementStatus(req.params.id, "approved");
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to create user');
    }
}

//Student

exports.getApprovedAnnouncements = async (req, res) =>{
    try {
            announcements = await AnnouncementRepository.getAnnouncementsbyStatus("approved");// UserId might be different
            res.json(announcements);      
    } catch (error) {
        console.log(error);
    }
}





