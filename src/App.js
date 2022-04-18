import React, { useState, useEffect } from 'react';
// import PriceMenu from './PriceMenu';
import MasterForm from './MasterForm';
import Message from './Message';
import ProductDisplay from './ProductDisplay';
import SuccessDisplay from './SuccessDisplay';
import './App.css';


export default function App() {
  let [message, setMessage] = useState('');
  let [complete, setComplete] = useState(null);
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    // console.log(query)

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [sessionId]);

  if (!success && message === '') {
    if (!complete) {
      return <MasterForm onComplete={setComplete} />;
    } else {
      return <ProductDisplay data={complete} />
    }
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
}
