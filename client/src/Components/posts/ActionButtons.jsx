import Button from 'react-bootstrap/Button';
import playIcon from "../../Assets/img/play-btn.svg"
import editIcon from "../../Assets/img/pencil.svg"
import deleteIcon from "../../Assets/img/trash.svg"
import { useContext } from 'react';
import { PostContext } from '../../contexts/postContext';

const ActionButtons = ({ url, _id }) => {
    const {deletePost, findPostId, setshowUpdatePostModal} = useContext(PostContext)

    const choosePost = postId => {
        findPostId(postId)
        setshowUpdatePostModal(true)
    }
    return (
        <>
            <Button variant="outline-light" href={url} target='_blank' size="sm" className=''>
                <img src={playIcon} alt="Play" width='22' />
            </Button>
            <Button variant="outline-light" size="sm"  onClick={choosePost.bind(this, _id)}>
                <img src={editIcon} alt="Play" width='22'/>
            </Button>
            <Button variant="outline-light" size="sm" onClick={deletePost.bind(this, _id)}>
                <img src={deleteIcon} alt="Play" width='22'/>
            </Button>
        </>
    )
}

export default ActionButtons