// this file will defind the get routes for the concerts table in the database
import express from 'express';
import concertController from '../controllers/concert.js';

// router needed to define the routes for the concerts table in the database
const router = express.Router();

// Route 1: GET /concerts
// the path here is just '/' because the '/concerts' prefix
// is already defined when we mount this router in server.js
router.get('/', concertController.getAllConcerts);

// Route 2: GET /concerts/:id
// the path here is just '/:id' because the '/concerts' prefix
// is already defined when we mount this router in server.js
router.get('/:id', concertController.getConcertById);

// export the router to be used in server.js
export default router;
