import React, {Component} from 'react';
import {
    Card, CardImg,
    CardBody, CardText,
    CardTitle, Breadcrumb,
    BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody,
    Label, Col, Row
} from 'reactstrap';
import {Control, LocalForm, Errors} from "react-redux-form";
import {Link} from 'react-router-dom';
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";
import {FadeTransform, Fade, Stagger} from 'react-animation-components';


const required = val => val && val.length;
const minLen = len => val => val && (val.length >= len);
const maxLen = len => val => !(val) || (val.length <= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal = () => this.setState({
        isModalOpen: !this.state.isModalOpen
    });
    handleSubmit = (values) => {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    };

    render() {
        return (
            <div>
                <Button onClick={this.toggleModal} outline color="secondary">
                    <i className="fa fa-pencil"></i> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating"
                                                    name="rating"
                                                    className="form-control"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author " md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author"
                                                  name="author" placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      required, minLen: minLen(3), maxLen: maxLen(15)
                                                  }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Required. ",
                                            minLen: "Must be at least be 3 characters long. ",
                                            maxLen: "Must be less than or equal to 15 characters. "
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment"
                                                      name="comment" placeholder="Your Comment"
                                                      className="form-control"
                                                      rows={6}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}



const RenderDish = ({dish}) => {
    return (
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in
                           transformProps={{
                               exitTransform: "scale(0.5) translateY(50%)"
                           }}
            >
                <Card>
                    <CardImg src={baseUrl + dish.image}></CardImg>
                    <CardBody>
                        <CardTitle className="font-weight-bold">{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
};

const RenderComments = ({comments, dishId, postComment}) => {
    if(comments != null)
    {
        const commentListItems = comments.map(comment => {
           return (
               <Fade in>
                   <li key={comment.id}>
                       <p>{comment.comment}</p>
                       <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                   </li>
               </Fade>
           );
        });

        return (
            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    <Stagger in duration={1000}>
                        {commentListItems}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }
};

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb className="mt-5">
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}
                    />
                </div>
            </div>
        );
    }
    else {
        return (<div></div>);
    }
};

export default DishDetail;