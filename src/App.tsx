import React from 'react';
import axios from 'axios';
import { Post } from './constants/post';
import { RantBlock } from './components/RantBlock';
import styled from 'styled-components';
import { RantShuffleBlock } from './components/RantShuffleBlock';

const Background = styled.div`
  background: linear-gradient(-30deg, #2f2f2f, #1a262b, #2f2f2f);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  color: #ccc;
  font-size: 2rem;
  font-family: sans-serif;
`

function App() {
  const [curPos, setCurPos] = React.useState<any>(null);
  const [post, setPost] = React.useState<Post | null>(null);
  const [rant, setRant] = React.useState<string>("");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      setCurPos(position);
      console.log(position);
    });
  }, [])

  return (
    <Background>
      <Title>
        Ranter
      </Title>
        {
          post == null &&
          (
            <RantShuffleBlock onClick={() => {
              axios.get("http://localhost:8080/api/random-post").then((res: any) => {
                setPost(res.data.post as Post);
              })
            }} />
          )
        }
        {
          post != null &&
          (
            <RantBlock post={post} onClick={() => {
                axios.get("http://localhost:8080/api/random-post").then((res: any) => {
                  setPost(res.data.post as Post);
                })
              }}/>
          )
        }
        {/* {
          curPos != null && 
          <>
            Your coordinates
            <ul>
              <li>
                Latitude: {curPos.coords.latitude}
              </li>
              <li>
                Longitude: {curPos.coords.longitude}
              </li>
            </ul>
          </>
        } */}
        {
          curPos == null &&
          <p>
            Loading...
          </p>
        }

        
        <>
          Make a rant: 
          <br />
          <textarea onChange={e => setRant(e.target.value)} />
          <br />
          <button onClick={() => {
            axios.post("http://localhost:8080/api/posts", {
              body: rant,
              latitude: curPos.coords.latitude,
              longitude: curPos.coords.longitude
            }).then((data: any) => {
              console.log("posted", data);
            })
          }}> Post </button> 
        </>
        
    </Background>
  );
}

export default App;
