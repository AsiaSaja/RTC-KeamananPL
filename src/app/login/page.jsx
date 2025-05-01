'use client';
import Head from 'next/head';
import { useEffect, useRef } from 'react';

export default function LoginPage() {
  const asciiRef = useRef(null);
  const audioRef = useRef(null);


  useEffect(() => {
    const asciiContainer = asciiRef.current;
    const characters = '01abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+=-<>?/[]{}|';

    function createAsciiRow() {
      let row = '';
      const cols = Math.ceil(window.innerWidth / 7);
      for (let i = 0; i < cols; i++) {
        row += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return row + '\n';
    }

    function renderAscii() {
      asciiContainer.textContent += createAsciiRow();
      const rows = Math.ceil(window.innerHeight / 12);
      let currentRows = asciiContainer.textContent.split('\n');
      if (currentRows.length > rows) {
        currentRows.shift();
        asciiContainer.textContent = currentRows.join('\n');
      }
    }

    const interval = setInterval(renderAscii, 30);
    window.addEventListener('resize', () => {
      if (asciiContainer) asciiContainer.textContent = '';
    });

    const audio = audioRef.current;
    if (audio) {
        audio.play().catch((err) => {
            console.warn("Autoplay diblokir:", err.message);
    });
  }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Head>
        <title>Login RTC</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-BkN5M7WyXe7NURW1b8mlvHmjPpt7u35RO9gLJ9S34AgFEn5x+QpM2Kk1Jg3c67o0/fGekRHrBFy6M2Wm3MCbNw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
    </Head>

    <audio
        ref={audioRef}
        autoPlay
        loop
        hidden
        src="/music/Karl_cassey_Deadly_FORCE.mp3"
      />

    <div>
      <div id="ascii" ref={asciiRef}></div>

      <div className="login-container">
        <h2>ACCESS TERMINAL</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>LOGIN</button>
        <button className="google-btn">
          <i className="fab fa-google"></i> Login with Google
        </button>
      </div>

      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        #ascii {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          white-space: pre;
          font-size: 12px;
          line-height: 12px;
          font-family: 'Courier New', Courier, monospace;
          color: lime;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .login-container {
          position: relative;
          z-index: 2;
          width: 350px;
          margin: 0 auto;
          margin-top: 15vh;
          padding: 20px;
          border: 1px solid lime;
          background: rgba(0, 0, 0, 0.8);
          box-shadow: 0 0 20px lime;
          color: lime;
        }

        .login-container input[type="text"],
        .login-container input[type="password"] {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          background: black;
          border: 1px solid lime;
          color: lime;
        }

        .login-container button {
          width: 100%;
          padding: 10px;
          background: lime;
          color: black;
          border: none;
          cursor: pointer;
          font-weight: bold;
          margin-top: 10px;
        }

        .login-container button:hover {
          background: darkgreen;
          color: lime;
        }

        .google-btn {
          background: #4285F4;
          color: white;
        }

        .google-btn:hover {
          background: #357ae8;
        }
      `}</style>
    </div>
    </>
  );
}
