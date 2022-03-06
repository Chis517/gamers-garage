import React, { Component } from "react";
import { CardColumns } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import API from '../../utils/API';
import GameCard from '../../components/GameCard';
import './style.css';


class Games extends Component {
    state = {
        games: []
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        //console.log("params=", params.pageid);
        var pageid = "1";
        if (params.pageid) {
            pageid = params.pageid[params.pageid.length - 1];
        }
        //console.log("pageid=", pageid);
        API.getAllGames(pageid).then((response) => {
            //console.log("GetAllGames response=", response);
            this.setState({ games: response.data.results })
        })
            .catch((error) => {
                console.log(error)
            })
    }


    render() {
        return (
            <div>
                <Pagination aria-label="Page navigation example" className="pagination">
                <PaginationItem active>
                        <PaginationLink href="/games">
                            1
              </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="/games/page=2">
                            2
              </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="/games/page=3">
                            3
              </PaginationLink>
                    </PaginationItem>
                </Pagination>
                <CardColumns>
                    {this.state.games.map(game => <GameCard
                        key={game.key}
                        id={game.id}
                        url={game.clip.clips.full}
                        name={game.name}
                        rating={game.rating}
                        metascore={game.metacritic}
                        users={game.added}
                        platforms={game.platforms}
                    />)}
                </CardColumns>
            </div>
        );
    }
};

export default Games;