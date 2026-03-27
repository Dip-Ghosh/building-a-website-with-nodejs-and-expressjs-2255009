const express = require('express');
const path = require('path');
const layouts = require('express-ejs-layouts');
const cookieSession = require('cookie-session');
const routes = require('./routes/index');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(layouts);

//for live server
app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['random132174', 'random132174343'],
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
  }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, './public')));
app.locals.siteName = 'Node.js Conference 2020';

app.use(async (req, res, next) => {
  try {
    res.locals.speakers = await speakerService.getNames();
    return next();
  }catch(err) {
   return next(err)
  }
})

app.use(
  '/',
  routes({
    speakerService,
    feedbackService,
  })
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
