import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';


const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deleteBook] = useMutation(REMOVE_BOOK);
  const userData = data?.me || data?.user || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteBook({
        variables: { bookId },
      });

      removeBookId(bookId);
    } catch (e) {
      console.error(e);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-info'>
        <Container>
          <h1>Viewing saved games!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'game'}:`
            : 'You have not saved any games yet!'}
        </h2>
        <CardColumns>
          {userData.savedGames.map((book) => {
            return (
              <Card key={game.gameId} border='dark'>
                {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;