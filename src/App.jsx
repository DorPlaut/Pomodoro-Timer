import React, { useEffect, useState } from 'react';
import './App.css';
// components
import TimeControl from './components/TimeControl';
import Timer from './components/Timer';
// icons
import {
  BsFillStopwatchFill,
  BsFillSunFill,
  BsFillMoonFill,
} from 'react-icons/bs';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [intervalNumb, setIntervalNumb] = useState();
  const [currentSecond, setCurrentSecond] = useState();
  const [currentMinuts, setCurrentMinuts] = useState();
  const [isReset, setIsReset] = useState(true);
  const [isCounting, setIsCounting] = useState(false);
  const [isBreak, setIsBreak] = useState(true);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isDark, setIsDark] = useState(true);

  // theme control
  function switchToLightMode() {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.style.setProperty('--primaryColor', '#0462b1');
      document.documentElement.style.setProperty('--primaryColor2', '#0e6bba');
      document.documentElement.style.setProperty('--primaryColor3', '#277fc9');
      document.documentElement.style.setProperty('--primaryColor4', '#5ea7e6');
      document.documentElement.style.setProperty('--seconderyColor', '#eeeeee');
      document.documentElement.style.setProperty(
        '--seconderyColor2',
        '#cbcbcb'
      );
    } else {
      document.documentElement.style.setProperty('--primaryColor', '#bd2453');
      document.documentElement.style.setProperty('--primaryColor2', '#d03b68');
      document.documentElement.style.setProperty('--primaryColor3', '#ff709d');
      document.documentElement.style.setProperty('--primaryColor4', '#db7998');
      document.documentElement.style.setProperty('--seconderyColor', '#252525');
      document.documentElement.style.setProperty(
        '--seconderyColor2',
        '#3f3f3f'
      );
    }
  }
  // set useState to start Countdown
  useEffect(() => {
    countDown();
  }, [isCounting]);
  useEffect(() => {
    countDown();
  }, [isBreak]);

  // Countdown Timer functinality
  let minuts = sessionLength;
  let seconds = 0;
  const countDown = () => {
    if (!isReset) {
      minuts = currentMinuts;
      seconds = currentSecond;
    }
    if (isCounting) {
      let timerRunning = setInterval(() => {
        setIntervalNumb(timerRunning);
        if (seconds > 0) {
          seconds--;
        }
        if (seconds === 0 && minuts > 0) {
          minuts--;
          seconds = 59;
        }
        if (minuts === 0 && seconds === 0 && isBreak) {
          setTimerLabel('Break');
          startBreak();
        }
        if (minuts == 0 && seconds == 0) {
          minuts = sessionLength;
          setIsCounting(true);
          setIsReset(true);
          setIsBreak(true);
          setTimerLabel('Session');
        }
        setCurrentSecond(seconds);
        setCurrentMinuts(minuts);
        setIsReset(false);
      }, 1000);
    } else {
      clearInterval(intervalNumb);

      minuts = currentMinuts;
      seconds = currentSecond;
    }
    clearInterval(intervalNumb);
  };

  // handle play/pause button

  const playPauseClick = () => {
    setIsCounting(!isCounting);
  };

  // handle reset button

  const resetClick = () => {
    setIsCounting(false);
    setIsBreak(true);
    setIsReset(true);
    setTimerLabel('Session');
  };

  //  handle break time
  const stopBreak = () => {
    setIsBreak(false);
  };
  const startBreak = () => {
    if (isBreak) {
      minuts = breakLength;
      stopBreak();
    } else {
      minuts = 0;
      resetClick();
      setIsBreak(true);
    }
  };

  // Format Timer to Display '00:00' format
  let newSec;
  const formatdsec = () => {
    if (currentSecond < 10) {
      newSec = '0' + currentSecond;
    } else {
      newSec = currentSecond;
    }
  };
  formatdsec();
  let newMin;
  const formatdMin = () => {
    if (currentMinuts < 10) {
      newMin = '0' + currentMinuts;
    } else {
      newMin = currentMinuts;
    }
  };
  formatdMin();
  let newSession;
  const formatdSession = () => {
    if (sessionLength < 10) {
      newSession = '0' + sessionLength;
    } else {
      newSession = sessionLength;
    }
  };
  formatdSession();

  if (currentMinuts == 1) {
  }

  // render page
  return (
    <>
      <main>
        {/* theme button */}
        <div className="dark-light">
          <button
            className="btn"
            onClick={() => {
              switchToLightMode();
            }}
          >
            <div className="btn-icon">
              {isDark ? <BsFillSunFill /> : <BsFillMoonFill />}
            </div>
          </button>
        </div>
        {/* background icon */}
        <div className="background">
          <div className="filler"></div>
          <BsFillStopwatchFill className="backgroundIcon" />
        </div>
        {/* pomdoro clock */}
        <div className="container">
          <h1>Pomodoro Timer</h1>
          <TimeControl
            sessionLength={sessionLength}
            setSessionLength={setSessionLength}
            breakLength={breakLength}
            setBreakLength={setBreakLength}
          />
          <Timer
            newSec={newSec}
            newMin={newMin}
            newSession={newSession}
            isReset={isReset}
            resetClick={resetClick}
            playPauseClick={playPauseClick}
            timerLabel={timerLabel}
          />
        </div>
        {/* footer */}
        <footer>
          <p>
            build by{' '}
            <a target="#" href="https://dorplaut.github.io/portfolio/">
              Dor Plaut
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}

export default App;
