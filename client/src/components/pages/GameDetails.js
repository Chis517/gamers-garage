import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardText, Row, Col, Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactHtmlParser from 'react-html-parser';
import ReactPlayer from 'react-player';
import API from "../../utils/API";
import './style.css';

class GameDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            platforms: [],
            userRatings: [],
            tags: [],
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleSubmit = () => {
        //console.log("GameDetails:handleSubmit:state:",this.state);
        API.saveGameDetails({
            id: Number(this.state.id),
            name: this.state.name,
            image:this.state.imageURL,
            metascore:this.state.metacritic?this.state.metacritic:0,
            username:sessionStorage.getItem("user")?sessionStorage.getItem("user"):'Guest'
        }).then(res => { 
            //console.log("GameDetails:saveGameDetails res=",res);
            alert("Done!"); 
        })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        API.getGameDetails(params.id).then((response) => {
            //console.log("response=", response.data);
            this.setState({
                id:params.id,
                name: response.data.name,
                ageRating: response.data.esrb_rating,
                metacritic: response.data.metacritic,
                rating: response.data.rating,
                userRatings: response.data.ratings,
                playtime: response.data.playtime,
                website: response.data.website,
                released: response.data.released,
                imageURL: response.data.background_image,
                clipURL: response.data.clip.clip,
                description: response.data.description,
                platforms: response.data.platforms,
                tags: response.data.tags
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <Row xs="2" className="toprow text-white">
                    <Col>
                        <h1 className="two">{this.state.name}</h1>
                        <p>{this.state.userRatings ? this.state.userRatings.map(rtng => {
                            return <Button outline color="info">{rtng.title}:{rtng.count}</Button>
                        }) : null}</p>
                    </Col>
                    <Col>
                        <ReactPlayer
                            url={this.state.clipURL}
                            className='react-player'
                            playing={false}
                            muted={true}
                            controls={true}
                            height='250px'
                            width='400px' />
                    </Col>
                    <Col>
                        <Card className="bg-white text-dark mb-2">
                            <CardHeader className="bg-info-1">Supported Platforms</CardHeader>
                            <CardBody>
                                <CardText>
                                    <ul>
                                        {this.state.platforms
                                            ? this.state.platforms.map(pf => {
                                                return <span>{pf.platform.name}{' . '}</span>;
                                            })
                                            : null}
                                    </ul>
                                </CardText>
                            </CardBody>
                        </Card>
                        <Card className="bg-white text-dark mb-2">
                            <CardHeader className="bg-info-1">#Tags</CardHeader>
                            <CardBody>
                                <CardText>
                                    <ul>
                                        {this.state.tags ? this.state.tags.map(
                                            tag => <span>{tag.name}{' . '}</span>
                                        ) : 'NA'}
                                    </ul>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="bg-white text-dark">
                            <CardHeader className="bg-info-1">Ratings</CardHeader>
                            <CardBody>
                                <CardText>
                                    <ul>
                                        <li>Age Rating: {this.state.ageRating ? this.state.ageRating.name : 'NA'}</li>
                                        <li>Rating: {this.state.rating}</li>
                                        <li>Metascore: {this.state.metacritic}</li>
                                        <li>Average playtime: {this.state.playtime} hours</li>
                                        <li>Website: <a href={this.state.website}>{this.state.website}</a></li>
                                        <li>Released: {this.state.released}</li>
                                    </ul>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="primary" size="lg" onClick={this.toggle} block>About Game</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>About</ModalHeader>
                            <ModalBody>
                                {ReactHtmlParser(this.state.description)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Close</Button>
                            </ModalFooter>
                        </Modal>
                    </Col>
                    <Col>
                        <Button color="danger" size="lg" onClick={this.handleSubmit} block>Add to favorite</Button>
                    </Col>
                </Row>
            </div>
        )
    };
}

export default GameDetails;
