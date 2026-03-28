const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    res.render('pages/speaker', {
      pageTitle: 'Speakers',
      speakers: await speakerService.getList(),
      artworks: await speakerService.getAllArtwork()
    });
  });

  router.get('/:shortname', async (req, res) => {
    return res.render('pages/speaker-details', {
      pageTitle: 'Speaker details',
      speaker: await speakerService.getSpeaker(req.params.shortname),
      artworks: await speakerService.getArtworkForSpeaker(req.params.shortname),
    });
  });

  return router;
};
