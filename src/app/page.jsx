'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';


const loadGlobe = () => import('globe.gl');
export default function Home() {
  const router = useRouter();
  const globeEl = useRef(null);
  const [GlobeLib, setGlobeLib] = useState(null);

  const generateRandomArcs = (count) => {
    const arcs = [];
    for (let i = 0; i < count; i++) {
      const startLat = (Math.random() * 180) - 90;
      const startLng = (Math.random() * 360) - 180;
      const endLat = (Math.random() * 180) - 90;
      const endLng = (Math.random() * 360) - 180;
      arcs.push({ startLat, startLng, endLat, endLng });
    }
    return arcs;
  };

  useEffect(() => {
    
    loadGlobe().then(({ default: Globe }) => {
      setGlobeLib(() => Globe);
    });
  }, []);

  useEffect(() => {
    if (!GlobeLib || !globeEl.current) return;

    const globe = GlobeLib()(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .arcColor(() => ['#ff4d4d', '#ff9933', '#ffcc00'][Math.floor(Math.random() * 3)])
      .arcDashLength(0.3)
      .arcDashGap(2)
      .arcDashInitialGap(1)
      .arcDashAnimateTime(2000)
      .arcStroke(0.6)
      .arcAltitude(() => Math.random() * 0.2)
      .arcCurveResolution(64)
      .onGlobeReady(() => {
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.5;
        globe.arcsData(generateRandomArcs(50));
        setInterval(() => {
          globe.arcsData(generateRandomArcs(50));
        }, 2000);
      });
  }, [GlobeLib]);

  return (
    <div>
      <div className="header">
        <h1>SIMPLE RTC</h1>
        <h2>REAL-TIME COMMUNICATION oleh:</h2>
        <h3>1. Luqman Al Yasin (2305095)</h3>
        <h3>2. Muchamad Fauzi Nurhidayah (2305099)</h3>
        <h3>3. Hasan Maulana Ainulyaqin (2305093)</h3>
        <button onClick={() => router.push('/login')}>Login</button>
      </div>

      <div ref={globeEl} id="globeViz" />

      <div className="footer">
        <p>Website ini, website darkweb</p>
      </div>

      <style jsx>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: black;
          color: white;
          overflow: hidden;
        }

        .header {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 10;
          font-family: 'Segoe UI', sans-serif;
        }

        .header h1 {
          font-size: 36px;
          margin: 0;
          font-weight: 900;
        }

        .header h2, .header h3 {
          font-size: 18px;
          margin: 5px 0;
        }

        .header button {
          padding: 10px 20px;
          background-color: #2c67ff;
          border: none;
          color: white;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s ease;
        }

        .header button:hover {
          background-color: #1741cc;
        }

        #globeViz {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        }

        .footer {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          font-size: 14px;
          color: #ccc;
          width: 90%;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
