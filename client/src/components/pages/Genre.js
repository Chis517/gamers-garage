import React, { Component } from "react";
import { CardColumns } from 'reactstrap';
import API from '../../utils/API';
import GenreCard from "../GenreCard";

class Genre extends Component {
        state = {
                genres: []
        }

        componentDidMount() {
                API.getAllGenres().then((response) => {
                        this.setState({ genres: response.data.results })
                })
                        .catch((error) => {
                                console.log(error)
                        })
        }

render() {
        return (
                <CardColumns>
                        {this.state.genres.map(genre => <GenreCard
                                id={genre.id}
                                name={genre.name}
                                games={genre.games}
                                games_count={genre.games_count}
                                image={genre.image_background}
                                top_one={genre.games[0].name}
                                top_one_id={genre.games[0].id}
                                top_one_users={genre.games[0].added}
                                top_two={genre.games[1].name}
                                top_two_id={genre.games[1].id}
                                top_two_users={genre.games[1].added}
                                top_three={genre.games[2].name}
                                top_three_id={genre.games[2].id}
                                top_three_users={genre.games[2].added}
                        />)}
                </CardColumns>
        );
}
};

export default Genre;