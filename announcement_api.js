const express = require('express');
const Announcement = require('./models/Announcement');
const AnnouncementController = require('./controllers/announcement_controller');
const router = express.Router();

  
router.post('/company/internship-announcement', AnnouncementController.createInternshipAnnouncement);

module.exports = router;
  
