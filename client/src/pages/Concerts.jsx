import React, { useState, useEffect } from 'react';
import getAllConcerts from '../services/ConcertAPI';

const Concerts = () => {
  const [concerts, setConcerts] = useState([]);

  // get the concerts data from the server when the component mounts and set the concerts state with the data
  useEffect(() => {
    (async () => {
      try {
        const concertsData = await getAllConcerts();
        setConcerts(concertsData);
        console.log('Concerts data retrieved successfully:', concertsData);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Concerts</h1>
      <ul>
        {concerts.map((concert) => (
          <li key={concert.id}>
            <h2>{concert.artist_name}</h2>
            <p>Genre: {concert.genre}</p>
            <p>Venue: {concert.venue_name}</p>
            <p>
              Location: {concert.city}, {concert.state}
            </p>
            <p>Date: {concert.date}</p>
            <p>Time: {concert.time}</p>
            <p>Ticket Price: ${concert.ticket_price}</p>
            <a
              href={concert.ticket_url}
              target='_blank'
              rel='noopener noreferrer'
            >
              Buy Tickets
            </a>
          </li>
        ))}
      </ul>
      <h2>hi</h2>
    </div>
  );
};

export default Concerts;
