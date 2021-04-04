import React, { Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle, Row, Col} from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }
    renderDish = dish => {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg src={dish.image}></CardImg>
                    <CardBody>
                        <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    };

    renderComments = comments => {
        if(comments != null)
        {
            const commentListItems = comments.map(comment => {
               return (
                   <li key={comment.id}>
                       <p>{comment.comment}</p>
                       <p>-- {comment.author}, {comment.date}</p>
                   </li>
               );
            });

            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {commentListItems}
                    </ul>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render() {
        if (this.props.dish != null)
        {
            return (
                <div className='row'>
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish.comments)}
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }
}

export default DishDetail;