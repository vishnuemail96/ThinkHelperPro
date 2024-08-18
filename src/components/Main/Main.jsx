import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Main.css';
import { Context } from '../../context/context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [placeholderText, setPlaceholderText] = useState('Share your creative idea here!');

  return (
    <div className='main'>
      <div className="nav">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
        <h1>Think Helper Prö</h1>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Folks.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <img src={assets.use1} alt="User Image" />
                <h4>Dhilip Nagarajan 😎</h4>
                <div className="stars">★★★★☆</div>
                <p>Loved the smooth performance and responsiveness; it’s a top-notch AI tool.</p>
              </div>
              <div className="card">
                <h4>Isha Varshni 😍</h4>
                <div className="stars">★★★★★</div>
                <p>THP AI has an incredibly sleek interface—navigating through it feels effortless!</p>
                <img src={assets.use2} alt="" />
              </div>
              <div className="card">
                <h4>Vishnu 😜</h4>
                <div className="stars">★★★★</div>
                <p>The design is clean and professional, making it a pleasure to use every day.</p>
                <img src={assets.use3} alt="" />
              </div>
              <div className="card">
                <h4>Aradhya 🥰️</h4>
                <div className="stars">★★★★☆</div>
                <p>A powerful AI app with great customization options—definitely exceeded my expectations</p>
                <img src={assets.use4} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt=""></img>
              {loading ? (
                <div className="loader">
                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder={placeholderText}
              onFocus={() => setPlaceholderText('')}
              onBlur={() => {
                if (!input) {
                  setPlaceholderText('Share your creative idea here!');
                }
              }}
            />
            <div>
              <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
