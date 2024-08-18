import { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className='sidebar'>
      <div className="top">
        <img src={assets.logo} alt="AI Logo" className="ai-logo" />
        <img
          onClick={() => setExtended(prev => !prev)}
          className='menu'
          src={assets.menu_icon} alt="Menu Icon"
        />
        <div className='new-chat' onClick={() => newChat()}>
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div 
                key={index}
                onClick={() => loadPrompt(item)} 
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)} ...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
