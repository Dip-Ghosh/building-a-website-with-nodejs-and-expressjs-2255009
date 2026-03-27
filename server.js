const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const routes = require('./routes/index');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/FeedbackService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();
const port = process.env.PORT || 3000;

//for live server
// app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['random132174', 'random132174343'],
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.use('/', routes());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
