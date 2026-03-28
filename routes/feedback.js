const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const validation = [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Name is required'),
  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is required'),
  check('title')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Title is required'),
  check('message')
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage('Message is required'),
];

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const errors = req.session.feedback ? req.session.feedback.errors : false;
      const success = req.session.feedback
        ? req.session.feedback.success
        : false;
      req.session.feedback = {};

      return res.render('pages/feedback', {
        pageTitle: 'Feedback',
        feedbacks: await feedbackService.getList(),
        errors: errors,
        success: success,
      });
    } catch (e) {
      return next(e);
    }
  });

  router.post('/', validation, async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        req.session.feedback = {
          errors: errors.array(),
        };

        return res.redirect('/feedbacks');
      }

      const { name, email, title, message } = req.body;
      await feedbackService.addEntry(name, email, title, message);
      req.session.feedback = {
        success: 'Thank you for your feedback',
      };

      return res.redirect('/feedbacks');
    } catch (e) {
      return next(e);
    }
  });

  return router;
};
