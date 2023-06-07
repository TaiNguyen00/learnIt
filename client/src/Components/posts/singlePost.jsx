import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import ActionButtons from "./ActionButtons"

const SinglePost = ({ post }) => {
    console.log('check single Post', post)
    return (
        <Card>
            <Card.Header>
                <Badge bg={post.status === 'TO LEARN' ? 'info'
                    : post.status === 'LEARNING' ? 'warning'
                        : 'danger'} text="white">
                    {post.status}
                </Badge>
            </Card.Header>
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                    {post.description}
                </Card.Text>
                <ActionButtons url={post.url} _id={post._id} className='text-right' />
            </Card.Body>
        </Card>
    )

}



export default SinglePost
