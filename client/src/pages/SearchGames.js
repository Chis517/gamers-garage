import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import axios from 'axios';

import Auth from '../utils/auth';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import { SAVE_GAME } from '../utils/mutations';

const SearchGames = () => {
  // // create state for holding returned google api data
  const [searchedGames, setSearchedGames] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved gameId values
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const [saveGame] = useMutation(SAVE_GAME);

  // set up useEffect hook to save `savedGameIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  });

const [error, setError] = useState(null);

// API FETCH to GET GAMES
const getGames = (searchInput) => {
  axios(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error("error fetching data: ", error);
      setError(error);
    })
};



  // create method to search for games and set state on form submit
  const handleFormSubmit = async (event) => {
    const getGames = (searchInput) => {
      axios.get(`https://api.rawg.io/api/search?q=${searchInput}&key=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setSearchInput(response.data)
        console.log(response.data);
      })
      .catch(error => {
        console.error("error fetching data: ", error);
        setError(error);
      })
    }
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await getGames(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const gameData = items.map((game) => ({
        id: game.results.id,
        name: game.results.name,
        rating: game.results.rating,
        background_image: game.results.background_image,
      }));

      setSearchedGames(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a game to our database
  const handleSaveGame = async (id) => {
    // find the game in `searchedGames` state by the matching id
    const gameToSave = searchedGames.find((game) => game.id === id);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveGame({
        variables: {game: gameToSave},
      });

      setSavedGameIds([...savedGameIds, gameToSave.id]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Games!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a game'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
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
      </Container>
    </>
  );
};

export default SearchGames;