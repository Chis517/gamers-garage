import React from 'react';
import './style.css'
import { 
  Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody
} from 'reactstrap';


function GenreCard(props) { 

  return (
    <Card>
      <CardImg style={{ size: '50px' }} src={props.image} alt="Card image cap" />
      <CardBody>
        <CardTitle style={{ fontSize: '25px',color:'Orange' }}>{props.name}</CardTitle>
        <CardSubtitle>Games count: {props.games_count}</CardSubtitle>
        <CardText>
          <li><a href={'/game/'+props.top_one.replace(/\s+/g, '-').toLowerCase()+'/'+ props.top_one_id}>Top One: {props.top_one}, Users: {props.top_one_users}</a></li>
          <li><a href={'/game/'+props.top_two.replace(/\s+/g, '-').toLowerCase()+'/'+ props.top_two_id}>Top Two: {props.top_two}, Users: {props.two_users}</a></li>
          <li><a href={'/game/'+props.top_three.replace(/\s+/g, '-').toLowerCase()+'/'+ props.top_three_id}>Top Three: {props.top_three}, Users: {props.top_three_users}</a></li>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default GenreCard;
