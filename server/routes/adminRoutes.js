import express from 'express';
import Score from '../modules/score.model.js';
const routes = express.Router();

routes.post('/scores/add', (req, res) => {
  const score = new Score(req.body)
    .save()
    .then(() => {
      res.json('Successfully added!');
    })
    .catch((err) => res.json(err));
  //   res.send('<h1>here</h1>');
});

export default routes;
