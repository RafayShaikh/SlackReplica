import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }
    db.collection('rooms').doc(channelId).collection('messages').add({
      message: input,
      user: user?.displayName,
      userImage: user?.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');

    chatRef.current.scrollIntoView({
      behaviour: 'smooth',
    });
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
          type='text'
        />
        <Button hidden type='submit' onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 25px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
