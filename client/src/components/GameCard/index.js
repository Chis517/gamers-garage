import React from 'react';
import {
    Card, Button, CardTitle, CardText, CardSubtitle, CardBody
} from 'reactstrap';
import ReactPlayer from 'react-player';

function GameCard(props) {
    //console.log("GameCard:props=",props);
    const platforms = props.platforms;
    const names = [];
    for (let iter = 0; iter < platforms.length; iter++) {
        names[iter] = platforms[iter].platform.name;
    }

    return (
        <Card>
            <ReactPlayer
                url={props.url}
                className='react-player'
                playing={false}
                muted={true}
                controls={true}
                height='250px'
                width='400px' />
            <CardBody>
                <CardTitle style={{ fontSize: '25px' }}><a href={'/game/'+ props.name.replace(/\s+/g, '-').toLowerCase()+'/'+ props.id}>{props.name}</a></CardTitle>
                <CardSubtitle><li>Ratings: {props.rating}</li><li>MetaScrore:{props.metascore}</li></CardSubtitle>
                <CardText>
                    <li>Platforms: {names.join(" , ")}</li>
                </CardText>
                <Button>+{props.users}</Button>
            </CardBody>
        </Card>
    );
}

export default GameCard;