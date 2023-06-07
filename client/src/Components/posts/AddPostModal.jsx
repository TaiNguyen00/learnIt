import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

import { useContext, useState } from "react";
import { PostContext } from "../../contexts/postContext";


const AddPostModal = () => {
    // Contexts
    const {showAddPostModal, setShowAddPostModal, addPost, setToast} = useContext(PostContext)
    // state to add new
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    })

    const {title, description, url} = newPost;

    const onChangeNewPostForm = event => {
        setNewPost({
            ...newPost,
            [event.target.name]: event.target.value
        })
    }

    const closeDialog = () => {
       resetAddPostModalData();
    }

    // SUBMIT
    const onSubmit = async event => {
        event.preventDefault();
        const { success, message} = await addPost(newPost);
        setToast({
            show: true,
            message,
            type: success ? "success" : 'danger'
        })

        resetAddPostModalData();
    }

    const resetAddPostModalData = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: ''
        })
        setShowAddPostModal(false)
    }
    return (
        <Modal show={showAddPostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do U wanna learn</Modal.Title>
            </Modal.Header>
            <Form action="" onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Title" name="title" required aria-describedby="title-help" 
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='textarea' rows={3} type="text" placeholder="Description" name="description" required aria-describedby="description-help" 
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="description-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control rows={3} type="text" placeholder="Youtube Tutorial URL" name="url" required aria-describedby="url-help" 
                            value={url}
                            onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="url-help" muted>Required</Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
                    <Button variant="primary" type="submit">LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal;