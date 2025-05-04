// app/chat/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './terminal.module.css';

function TerminalLine({ type, text }) {
  const color = type === 'user' ? '#00ff00' :
                type === 'bot' ? '#d68aff' :
                'gray';
  return (
    <div className={
      type === 'user' ? styles.outputLine :
      type === 'bot' ? styles.botLine : styles.muted
    }>
      <span className={styles.prompt} style={{ color }}>User@nama_user:~$</span> {text}
    </div>
  );
}

export default function TerminalGalaxyChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const terminalOutputRef = useRef(null);
  const spaceRef = useRef(null);


  useEffect(() => {
    const space = document.getElementById('space-background');
    if (space) {
      const space = spaceRef.current;
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = styles.star;
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (2 + Math.random() * 4) + 's';
        space.appendChild(star);
      }
    }
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const command = inputValue.trim();
      const newMessages = [...messages, { type: 'user', text: command }];
      setMessages(newMessages);
      setInputValue('');

      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: `Balasan untuk: ${command}` }]);
        terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
      }, 600);
    }
  };

  const clearTerminal = () => setMessages([]);

  const search = () => {
    const keyword = prompt('Search keyword:');
    if (!keyword) return;
    const lines = document.querySelectorAll(`.${styles.outputLine}, .${styles.botLine}`);
    let found = false;
    lines.forEach(line => {
      if (line.textContent.includes(keyword)) {
        line.style.backgroundColor = '#444';
        found = true;
      } else {
        line.style.backgroundColor = '';
      }
    });
    if (!found) alert('No match found.');
  };

  const logout = () => {
    clearTerminal();
    setMessages([{ type: 'muted', text: 'Session closed. You have been logged out.' }]);
  };

  return (
    <div>
      <div className={styles.space} id="space-background"></div>
      <div className={styles.planet}></div>

      <div className={styles.terminalWindow}>
        <div className={styles.terminalHeader}>
          <div className="terminal-title">User@nama_user: ~</div>
          <div>🞩</div>
        </div>

        <div className={styles.terminalNavbar}>
          <button onClick={search}>Search</button>
          <button onClick={clearTerminal}>Clear</button>
          <button onClick={logout}>Logout</button>
        </div>

        <div className={styles.terminalBody} ref={terminalOutputRef}>
          {messages.map((msg, index) => (
            <TerminalLine key={index} type={msg.type} text={msg.text} />
          ))}
        </div>

        <div className={styles.terminalInput}>
          <span className={styles.prompt} style={{ color: '#00ff00' }}>User@nama_user:~$</span>
          <input
            type="text"
            id="commandInput"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            className={styles.commandInput}
          />
        </div>
      </div>
    </div>
  );
}