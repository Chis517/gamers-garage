import React from 'react';
import { Link } from 'react-router-dom';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';

const Results = (props) => {

  return (
    <>
    <Container>
      <ul>
      {
        props.gameResults.map(game => (
          <li key={game.id}>

            <Link to={{
              pathname: `/game/${game.name}`,
              gameProps:{
                game: game
              }
            }}>
            <h3>{game.name}</h3>
            <img src={game.background_image} alt="game"/>
            </Link>
            
          </li>
        ))
      }
      </ul>
    </Container>
    </>
  );
}

export default Results;

