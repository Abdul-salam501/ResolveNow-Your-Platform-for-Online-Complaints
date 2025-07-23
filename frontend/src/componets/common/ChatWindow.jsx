import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const ChatWindow = ({ complaintId, name }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageWindowRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/messages/${complaintId}`);
      setMessageList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [complaintId]);

  useEffect(() => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  }, [messageList]);

  const sendMessage = async () => {
    if (!messageInput) return;
    try {
      await axios.post('http://localhost:8000/messages', { name, message: messageInput, complaintId });
      setMessageInput('');
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }} ref={messageWindowRef} className="border p-2 rounded bg-light">
      <div>
        {messageList.slice().reverse().map((msg) => (
          <div key={msg._id} className="mb-1">
            <strong>{msg.name}:</strong> {msg.message}
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{new Date(msg.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="d-flex gap-2 mt-2">
        <input type="text" className="form-control" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Enter your message..." />
        <button className="btn btn-success" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
