import React from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';
  import './style.css';
  
function ProfileCard(props)
{
      return(
      <div>
        <Card className='savedCard'>
          <a href={'/game/'+ props.name.replace(/\s+/g, '-').toLowerCase()+'/'+ props.id}><CardImg className="top" src={props.image} alt="Card image cap"/></a>
          <CardBody className='body'>
            <CardTitle className="title">{props.name}</CardTitle>
            <CardText>Meta:{props.metascore}</CardText>
            <Button color='danger' onClick={()=>props.removeCard(props.id)}>Delete</Button>
          </CardBody>
        </Card>
        </div>);
}

export default ProfileCard;