import express from 'express';

const routes = express.Router();

//all posible routes

//routes.get('/scores//show') to display scores

routes.use('/', (req, res) => {
  res.status(404);
  res.send('<h1>404 Error</h1>');
});

export default routes;
