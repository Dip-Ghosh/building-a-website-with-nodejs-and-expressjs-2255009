const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    try {
      return res.render('pages/speaker', {
        pageTitle: 'Speakers',
        speakers: await speakerService.getList(),
        artworks: await speakerService.getAllArtwork(),
      });
    } catch (e) {
      return next(e);
    }
  });

  router.get('/:shortname', async (req, res, next) => {
    try {
      const speaker = await speakerService.getSpeaker(req.params.shortname);
      if (!speaker) {
        return next(createError(404, 'Speaker not found'));
      }
      return res.render('pages/speaker-details', {
        pageTitle: 'Speaker details',
        speaker: speaker,
        artworks: await speakerService.getArtworkForSpeaker(
          req.params.shortname
        ),
      });
    } catch (e) {
      return next(createError(404, 'Speaker not found'));
    }
  });

  return router;
};
