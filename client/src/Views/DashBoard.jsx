import { PostContext } from "../contexts/postContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authContext";



import Spinner from "react-bootstrap/esm/Spinner";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SinglePost from "../Components/posts/singlePost";
import AddPostModal from "../Components/posts/AddPostModal";
import UpdatePostModal from "../Components/posts/UpdatePostModal";

import AddIcon from "../Assets/img/plus-circle-fill.svg"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from "react-bootstrap/Toast"


const DashBoard = () => {
    const { authState: { user: { username } } } = useContext(AuthContext);


    const { postState: {
        post,
        posts,
        postLoading
    }, getPosts,
        setShowAddPostModal,
    toast: {show, message, type}, setToast} = useContext(PostContext)

    useEffect(() => {
        getPosts()

    }, [])


    console.table(posts)
    let body = null;
    if (postLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card>

                    <Card.Body>
                        <Card.Title>
                            Welcome to Learnit
                        </Card.Title>
                        <Card.Text>
                            Click the button to track your fisrt skills to learn
                        </Card.Text>
                        <Button variant="primary" onClick={setShowAddPostModal.bind(this,true)}>Learnit!</Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map((post) => (
                        <>
                            <Col key={post._id} className='my-2'>
                                <SinglePost post={post} />
                                {console.log("check post",post)}
                            </Col>
                        </>
                    ))}
                </Row>
                {/* Modal */}
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>Add a new thing to learn</Tooltip>}
                >
                    <Button variant="" className="btn-floating text-center" onClick={setShowAddPostModal.bind(this, true)}>
                        <img src={AddIcon} alt="add-post" width='40' />
                    </Button>

                </OverlayTrigger>
            </>
        )
    }
    return (
        <>
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostModal />}
            {/*Toast  */}
            <Toast
                show={show}
                style={{position: 'fixed', top: '20%', right: '10px'}}
                className={`bg-${type} text-white`}
                onClose={setToast.bind(this, {
                    show: false,
                    message: '',
                    type: null
                })}
                delay={3000}
                autohide
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </>
    )
}

export default DashBoard;