const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {

    res.render('pages/speaker', {
      pageTitle: 'Speakers',
      speakers: await speakerService.getList(),
    });
  });

  router.get('/:shortname', async (req, res) => {

    console.log(await speakerService.getSpeaker(req.params.shortname));
    return res.render('pages/speaker-details', {
      pageTitle: 'Speaker details',
      speaker: await speakerService.getSpeaker(req.params.shortname),
    })
  });

  return router;
};
