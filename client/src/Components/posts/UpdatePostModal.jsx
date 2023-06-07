import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

import { useContext, useState, useEffect} from "react";
import { PostContext } from "../../contexts/postContext";


const UpdatePostModal = () => {
    // Contexts
    const {postState: {post},showUpdatePostModal, setshowUpdatePostModal, updatePost, setToast} = useContext(PostContext)
    // state to add new

    const [updatedPostMoDal, setUpdatedPostMoDal]  = useState(post)
    
    useEffect(() => setUpdatedPostMoDal(post), [post])

    const {title, description, url, status} = updatedPostMoDal;

    const onChangeUpdateForm = event => {
        setUpdatedPostMoDal({
            ...updatedPostMoDal,
            [event.target.name]: event.target.value
        })
    }

    // SUBMIT
    const onSubmit = async event => {
        event.preventDefault();
        const {success, message} = await updatePost(updatedPostMoDal)
        closeDialog()
        setToast({show: true, message, type: success ? 'success' : 'danger'})
    }

    const closeDialog = () => {
        setshowUpdatePostModal(false)
    }
  
    return (
        <Modal show={showUpdatePostModal}>
            <Modal.Header closeButton>
                <Modal.Title>Making Process</Modal.Title>
            </Modal.Header>
            <Form action="" onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Title" name="title" required aria-describedby="title-help" 
                            value={title}
                            onChange={onChangeUpdateForm}
                        />
                        <Form.Text id="title-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='textarea' rows={3} type="text" placeholder="Description" name="description" required aria-describedby="description-help" 
                            value={description}
                            onChange={onChangeUpdateForm}
                        />
                        <Form.Text id="description-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control rows={3} type="text" placeholder="Youtube Tutorial URL" name="url" required aria-describedby="url-help" 
                            value={url}
                            onChange={onChangeUpdateForm}
                        />
                        <Form.Text id="url-help" muted>Required</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name='status' onChange={onChangeUpdateForm}>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary" type="submit">LearnIt!</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal;