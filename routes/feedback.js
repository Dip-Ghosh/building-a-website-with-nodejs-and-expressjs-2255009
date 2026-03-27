const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res) =>
    res.json(await feedbackService.getList())
  );

  return router;
};
