import styled from 'styled-components';
import { Post } from '../constants/post';
import { prettyTimeSince } from '../utils/time';

import { BlockContainer } from '../constants/theme';

const PostText = styled.p`
    font-family: sans-serif;
    font-size: 1.1rem;
    color: #ddd;
    margin: 0;
    line-height: 1.3em;
`

const PostDetails = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-self: flex-end;
    border: 1px solid white;
`

const DetailsText = styled.p`
    margin: 0;
    margin-top: 6px;
    color: #ccc;
    font-style: italic;
    width: fit-content;
    font-size: 0.8rem;
`

export const RantBlock = (props: { post: Post, onClick: () => void }) => {
   return (
        <BlockContainer onClick={() => {
            props.onClick();
        }}>
            <PostText>  
                {props.post.body}
            </PostText>
            <PostDetails>
                <DetailsText>
                    {props.post.latitude} N {props.post.longitude} E // {prettyTimeSince(props.post.postDate)} ago
                </DetailsText>
            </PostDetails>
        </BlockContainer>
    )
}