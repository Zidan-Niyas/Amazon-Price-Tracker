import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import nodemailer from 'nodemailer';

function App() {
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState('Bose SoundLink Wireless Around-Ear Headphones');
  const [emailSent, setEmailSent] = useState(false);

  function handleMessageFromPage(o) {
    if (o.source === window && o.data)
      switch (o.data.source) {
        case "react-devtools-bridge":
          n = !0,
            e.postMessage(o.data.payload);
          break;
        case "react-devtools-backend-manager":
          {
            const { source: e, payload: n } = o.data;
            if (n) {
              chrome.runtime.sendMessage({
                source: e,
                payload: n
              });
            }
            break
          }
      }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkPrice();
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(intervalId);
  }, []);

  const checkPrice = async () => {
    try {
      const response = await axios.get('https://www.amazon.in/Bose-SoundLink-Wireless-Around-Ear-Headphones/dp/B0117RGG8E/ref=sr_1_11?qid=1562395272&refinements=p_89%3ABose&s=electronics&sr=1-11', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
        }
      });

      const dom = new JSDOM(response.data);
      const titleElement = dom.window.document.getElementById('productTitle');
      const priceElement = dom.window.document.getElementById('priceblock_ourprice');

      if (titleElement && priceElement) {
        const titleText = titleElement.textContent.trim();
        const priceText = priceElement.textContent.replace(',', '').replace('₹', '').replace(' ', '').trim();
        const convertedPrice = parseFloat(priceText.substring(0, 5));

        setTitle(titleText);
        setPrice(convertedPrice);

        if (convertedPrice < 20000 && !emailSent) {
          sendMail();
          setEmailSent(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendMail = async () => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-emailID',
          pass: 'your-password'
        }
      });

      const mailOptions = {
        from: 'ender@gmail.com',
        to: 'eceiver@gmail.com',
        subject: 'Price Fell Down',
        text: 'Check the amazon link https://www.amazon.in/Bose-SoundLink-Wireless-Around-Ear-Headphones/dp/B0117RGG8E/ref=sr_1_11?qid=1562395272&refinements=p_89%3ABose&s=electronics&sr=1-11'
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <p>Current Price: ₹{price}</p>
      {emailSent && <p>Email sent!</p>}
    </div>
  );
}

export default App;
