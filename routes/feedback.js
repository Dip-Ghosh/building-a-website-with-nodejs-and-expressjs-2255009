const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res) => {
    res.render('pages/feedback', {
      pageTitle: 'Feedback',
      feedback: await feedbackService.getList(),
    })
  });

  return router;
};
