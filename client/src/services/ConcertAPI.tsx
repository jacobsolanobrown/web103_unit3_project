/**
 * This file will call the concerts api route to fetch the concerts data from the
 * database and return it to the client
 */
import react from 'react';

/**
 * this gets all concerts from the /concerts API endpoint
 * @returns {Promise<Array>} - An array of concert objects from the database
 * @throws {Error} - If the API request fails
 */
const getAllConcerts = async () => {
  try {
    const response = await fetch('/concerts');

    if (!response.ok) {
      throw new Error(`Failed to fetch concerts: ${response.statusText}`);
    }

    const concerts = await response.json();
    return concerts;
  } catch (error) {
    console.error('Error fetching concerts:', error);
    throw error;
  }
};

export default getAllConcerts;
