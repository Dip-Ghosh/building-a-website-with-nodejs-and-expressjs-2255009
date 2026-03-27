const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => res.json(await speakerService.getList()));

  router.get('/:shortname', async (req, res) => {
    return res.send(`Details page for ${req.params.shortname}`);
  });

  return router;
};
