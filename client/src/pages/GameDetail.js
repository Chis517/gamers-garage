import React from 'react';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';

const GameDetail = (props) => {

  const { game } = props.location.gameProps

  return (
    <>
    <Container>
      <h1>{game.name}</h1>
      <p>Released: {game.released}</p>
      <p>Rating: {game.rating}</p>
      <h3>Genre(s):</h3>
      {
        game.genres.map(g => `${g.name} | `)
      }

      <h3>Platform(s):</h3>
      {
        game.platforms.map(p => `${p.platform.name} | `)
      }

      <ul>
        {
          game.short_screenshots.map(ss => <li><img src={ss.image} alt='screenshot'></img></li>)
        }
      </ul>
      </Container>
    </>
  );
}

export default GameDetail;