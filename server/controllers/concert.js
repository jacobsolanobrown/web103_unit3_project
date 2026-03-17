import { pool } from '../config/database.js';

/*
 * This file contains the controller functions that will be used to handle the requests for the concerts
 * table in the database. These functions will be called in the routes file for the concerts table when
 * a request is made to the server for the routes that we will define in the routes file.
 *
 */

/**
 * this make a sql query to return all the concerts in the concerts table in the db.
 * The results of the query will be sent back to the client as a response to the request.
 */
const getAllConcerts = async (req, res) => {
  try {
    console.log('Getting concerts from the database...');
    const results = await pool.query('SELECT * FROM concerts ORDER BY id ASC');
    res.status(200).json(results.rows);
    console.log('Concerts retrieved successfully:', results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

/**
 * this makes a sql query to return a concert with a specific id from the concerts table in the db.
 * The id is parsed from the request parameters. The result of the query will be sent back to the
 * \client as a response to the request.
 */
const getConcertById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Getting concert with id ${id} from the database...`);
    const result = await pool.query('SELECT * FROM concerts WHERE id = $1', [
      id,
    ]);
    // if the result is empty, then the concert with the specified id was not found in the database.
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Concert not found' });
    } else {
      res.status(200).json(result.rows[0]);
      console.log(
        `Concert with id ${id} retrieved successfully:`,
        result.rows[0],
      );
    }
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getAllConcerts,
  getConcertById,
};
