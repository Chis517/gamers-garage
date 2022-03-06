import React, { Component } from "react";
import { CardColumns } from 'reactstrap';
import API from '../../utils/API';
//import GenreCard from '../../components/GenreCard';
import PCard from "../../components/Pcard";

class Platforms extends Component {
    state = {
        platforms: []
    }

    componentDidMount() {
        API.getAllPlatforms().then((response) => {
                this.setState({ platforms: response.data.results })
        })
                .catch((error) => {
                        console.log(error)
                })
}
    render() {
        return (
            <CardColumns>
                {this.state.platforms.map(platform => <PCard
                    id={platform.id}
                    name={platform.name}
                    games_count={platform.games_count}
                    image={platform.image_background}
                    top_one={platform.games[0].name}
                    top_one_id={platform.games[0].id}
                    top_one_users={platform.games[0].added}
                    top_two={platform.games[1].name}
                    top_two_id={platform.games[1].id}
                    top_two_users={platform.games[1].added}
                    top_three={platform.games[2].name}
                    top_three_id={platform.games[2].id}
                    top_three_users={platform.games[2].added}                    
                   />)}
            </CardColumns>
        )
    }
};

export default Platforms;