const express = require('express');
const router = express.Router();
const speakerRouter = require('./speakers');
const feedbackRouter = require('./feedback');

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    if (!req.session.visitcount) {
      req.session.visitcount = 0;
    }
    req.session.visitcount++;

    res.render('pages/index', {
      pageTitle:   'Node.js  wolcome',
      artworks:    await speakerService.getAllArtwork(),
      topSpeakers: await speakerService.getList(),
    });

  });

  router.use('/speakers', speakerRouter(params));
  router.use('/feedbacks', feedbackRouter(params));

  return router;
};
