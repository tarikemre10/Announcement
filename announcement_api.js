const express = require('express');
const Announcement = require('./models/Announcement');
const AnnouncementController = require('./controllers/announcement_controller');
const router = express.Router();

router.get('/company/internship-announcements/:id',AnnouncementController.getAnnouncementbyId);
router.get('/company/internship-announcements',AnnouncementController.getCompanyAnnouncements);
router.post('/company/internship-announcements/publish', AnnouncementController.createInternshipAnnouncement);
router.put('/company/internship-announcements/:id', AnnouncementController.updateInternshipAnnouncement);
router.delete('/company/internship-announcements/:id/delete', AnnouncementController.deleteInternshipAnnouncement);

router.get('/admin/waiting-announcements', AnnouncementController.getWaitingAnnouncements);
router.get('/admin/waiting-announcements/:id', AnnouncementController.getAnnouncementbyId);
router.put('/admin/waiting-announcements/:id/approve', AnnouncementController.approveAnnouncement);
router.delete('/admin/waiting-announcements/:id/reject', AnnouncementController.deleteInternshipAnnouncement);

router.get('/student/internship-announcements',AnnouncementController.getApprovedAnnouncements);
router.get('/student/internship-announcements/:id',AnnouncementController.getAnnouncementbyId);

module.exports = router;
  
