import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
// import { useMutation } from '@apollo/client';

import GameResults from './GameResults';
// import Auth from '../utils/auth';
// import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
// import { SAVE_GAME } from '../utils/mutations';


const SearchGames = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [gameResults, setGameResults] = useState([])

  // const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());
  // const [saveGame] = useMutation(SAVE_GAME);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let slug = searchTerm.split(' ').join('-').toLowerCase()

    // API Fetch
    setGameResults([])
    fetch(`https://rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&search=${slug}`)
    .then(resp => resp.json())
    .then(({results}) => {
      results === undefined ? alert('no games found') : setGameResults(results)
    })
    setSearchTerm("")
  }

  // set up useEffect hook to save `savedGameIds` list to localStorage on component unmount
  // useEffect(() => {
  //   return () => saveGameIds(savedGameIds);
  // });

  // // create function to handle saving a game to our database
  // const handleSaveGame = async (id) => {
  //   // find the game in `searchedGames` state by the matching id
  //   const gameToSave = searchedGames.find((game) => game.id === id);

  //   // get token
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     await saveGame({
  //       variables: {game: gameToSave},
  //     });

  //     setSavedGameIds([...savedGameIds, gameToSave.id]);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <>
      <Jumbotron className='text-light bg-info'>
        <Container>
          <h1>Search for Games!</h1>
          <form onSubmit={onSubmit}>
          <input type="text" value={searchTerm} onChange={handleChange}/>
          <br></br>
          <input type="submit"/>
        </form>
        <GameResults gameResults={gameResults} />
        </Container>
      </Jumbotron>

      {/* <Container>
        <h2>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : 'Search for a game to begin'}
        </h2>
        <CardColumns>
          {searchedGames.map((game) => {
            return (
              <Card key={game.id} border='dark'>
                {game.background_image ? (
                  <Card.Img src={game.background_image} alt={`The cover for ${game.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <p className='small'>Rating: {game.rating}</p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedGameIds?.some((savedGameId) => savedGameId === game.id)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveGame(game.id)}>
                      {savedGameIds?.some((savedGameId) => savedGameId === game.id)
                        ? 'This game has already been saved!'
                        : 'Save this Game!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      // </Container> */}
    </>
  );
};

export default SearchGames;