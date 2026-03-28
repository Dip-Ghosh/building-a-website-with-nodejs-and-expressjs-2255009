const express = require('express');
const router = express.Router();
const speakerRouter = require('./speakers');
const feedbackRouter = require('./feedback');

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    try {
      if (!req.session.visitcount) {
        req.session.visitcount = 0;
      }
      req.session.visitcount++;

      return res.render('pages/index', {
        pageTitle:   'Node.js  wolcome',
        artworks:    await speakerService.getAllArtwork(),
        topSpeakers: await speakerService.getList(),
      });
    } catch (e) {
      return next(createError(404, 'Speaker not found'));
    }
  });

  router.use('/speakers', speakerRouter(params));
  router.use('/feedbacks', feedbackRouter(params));

  return router;
};
