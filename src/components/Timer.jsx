import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { VscDebugRestart } from 'react-icons/vsc';
import { Howl, Howler } from 'howler';

function Timer({
  newSec,
  newMin,
  newSession,
  isReset,
  resetClick,
  playPauseClick,
  timerLabel,
}) {
  const [isPaused, setIsPaused] = useState(true);
  const [isAlert, setIsAlert] = useState(false);

  const sound = new Howl({
    src: [
      'https://github.com/DorPlaut/Pomodoro-Timer/blob/main/Media/tickingbuzzer-75859.mp3?raw=true',
    ],
    html5: true,
  });

  useEffect(() => {
    if (newMin == '00') {
      setIsAlert(true);
    } else {
      setIsAlert(false);
    }
  }, [newSec]);
  useEffect(() => {
    if (newMin == '00' && newSec == '28') {
      sound.play();
    }
  }, [newSec]);

  return (
    <>
      <div className="timer">
        <div className={isAlert ? 'time-controller pulse' : 'time-controller'}>
          <h3 id="timer-label">{timerLabel}</h3>

          <div className="counter" id="time-left">
            <h2>{isReset ? newSession + ':00' : newMin + ':' + newSec}</h2>
            <div className="btn-container">
              <button
                className="btn"
                id="start-stop"
                onClick={() => {
                  playPauseClick();
                  setIsPaused(!isPaused);
                  Howler.stop();
                  setIsAlert(false);
                }}
              >
                <div className="btn-icon">
                  {isPaused ? <BsFillPlayFill /> : <BsPauseFill />}
                </div>
              </button>
              <button
                className="btn"
                id="reset"
                onClick={() => {
                  resetClick();
                  setIsPaused(true);
                  Howler.stop();
                  setIsAlert(false);
                }}
              >
                <div className="btn-icon">
                  <VscDebugRestart />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Timer;
