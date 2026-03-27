const express = require('express');
const router = express.Router();
const speakerRouter = require('./speakers');
const feedbackRouter = require('./feedback');

module.exports = (params) => {

  router.get('/',  (req, res) => {

    if (!req.session.visitcount) {
      req.session.visitcount = 0;
    }
    req.session.visitcount++;

    res.render('pages/index', { pageTitle: 'Node.js  wolcome'});
  });

  router.use('/speakers', speakerRouter(params));
  router.use('/feedbacks', feedbackRouter(params));

  return router;
};
