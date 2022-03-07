import React, { Component } from "react";
import { CardColumns } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import API from '../../utils/API';
import GameCard from '../../components/GameCard';


class GenreDetails extends Component {
    state = {
        gameID: [],
        final: []
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const genreID = Number(params.id);
        API.getAllGenres().then((response) => {
            console.log("response 1=", response.data.results);
            console.log("genreID=", genreID);
            console.log("response[4]=", response.data.results[4].games)
            this.setState({
                gameID: response.data.results[genreID].games,
                id: genreID
            })
        }).catch((error) => {
            console.log(error)
        });

    }

    render(props) {
        //console.log("id=",this.state.id);
        const gamedetails = [];
        //console.log("this.state.gameID=",this.state.gameID);
        for (let iter = 0; iter < this.state.gameID.length; iter++) {
            API.getGameDetails(this.state.gameID[iter].id)
                .then(response => {
                    //console.log("response.data=",response.data);
                    gamedetails.push(response.data)
                })
                .catch((error) => {
                    console.log(error)
                });
        }
        this.setState({ final: gamedetails });
        return (
            <CardColumns>
                {this.state.final.map(game => <GameCard
                    id={game.id}
                    url={game.clip.clips.full}
                    name={game.name}
                    rating={game.rating}
                    metascore={game.metacritic}
                    users={game.added}
                    platforms={game.platforms}
                />)}
            </CardColumns>);
    }
};

export default GenreDetails;