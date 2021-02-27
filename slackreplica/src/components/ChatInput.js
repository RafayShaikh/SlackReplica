import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import firebase from 'firebase';

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }
    db.collection('rooms').doc(channelId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={'Message #Room'}
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
