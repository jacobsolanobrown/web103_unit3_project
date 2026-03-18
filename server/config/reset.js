// this file will create the concerts table in the database
// import dotenv from 'dotenv';
// dotenv.config({ path: '../.env' });
import './dotenv.js'
console.log('PASSWORD', process.env.PGPASSWORD)
import { pool } from './database.js';
import concertData from '../data/concert.js';



const createConcertTable = async () => {
  // the sql query to create the concerts table - drops the table if it already exists and creates a new one
  const createTableQuery = `
    DROP TABLE IF EXISTS concerts;

    CREATE TABLE concerts (
      id          SERIAL PRIMARY KEY,
      artist_name VARCHAR(255) NOT NULL,
      genre       VARCHAR(100),
      venue_name  VARCHAR(255) NOT NULL,
      city        VARCHAR(100) NOT NULL,
      state       VARCHAR(100),
      date        DATE NOT NULL,
      time        TIME,
      ticket_price NUMERIC(10, 2),
      ticket_url  VARCHAR(500),
      created_at  TIMESTAMP DEFAULT NOW() 
    );
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log('Concerts table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } 
};

const seedConcertTable = async () => {
  await createConcertTable(); // WHAT IS THIS FOR - we dont create the new function

  // traverse the concertData
  concertData.forEach((concert) => {
    // make a query to insert the concert data into the concerts table
    const insertQuery = {
      // the values are for the title, image, description, rating, rating_description, and ranking_date columns in the concerts table
      // they are defined as $1, $2, $3, $4, $5, and $6 respectively, which are placeholders for the actual values that will be inserted into the table later
      text: 'INSERT INTO concerts (artist_name, genre, venue_name, city, state, date, time, ticket_price, ticket_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    };

    // this the values of the concert data that we want to insert
    // into the concerts table. We use the properties of the concert object
    // to populate the values array.
    const values = [
      concert.artist_name,
      concert.genre,
      concert.venue_name,
      concert.city,
      concert.state,
      concert.date,
      concert.time, 
      concert.ticket_price, 
      concert.ticket_url,
    ];

    // above - the code autocompletes the data fields because its taking the fields 
    // from the concert object from the imported concertData array. 

    // this is a callback function that is called after the query is
    //  executed. If there is an error, it logs the error to the console.
    //  If the query is successful, it logs a success message to the console.
    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting concert', err);
        return;
      }
      console.log(`✅ ${concert.artist_name} added successfully`);
    });
  });           
};

seedConcertTable();
