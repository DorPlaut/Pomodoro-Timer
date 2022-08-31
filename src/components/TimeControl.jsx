import React, { useEffect } from 'react';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';

function TimeControl({
  sessionLength,
  breakLength,
  setSessionLength,
  setBreakLength,
}) {
  return (
    <>
      <div className="controllers-container">
        <div className="time-controller" id="break-label">
          <div className="session-label">
            <h3>Break Length</h3>
          </div>
          <h3 id="break-length">{breakLength}</h3>
          <button
            className="btn"
            id="break-increment"
            onClick={() => {
              if (breakLength < 60) {
                setBreakLength(breakLength + 1);
              }
            }}
          >
            <div className="btn-icon">
              <BsArrowUpShort />
            </div>
          </button>
          <button
            className="btn"
            id="break-decrement"
            onClick={() => {
              if (breakLength > 1) {
                setBreakLength(breakLength - 1);
              }
            }}
          >
            <div className="btn-icon">
              <BsArrowDownShort />
            </div>
          </button>
        </div>
        <div className="time-controller" id="session-label">
          <div className="session-label">
            <h3>Session Length</h3>
          </div>
          <h3 id="session-length">{sessionLength}</h3>
          <button
            className="btn"
            id="session-increment"
            onClick={() => {
              if (sessionLength < 60) {
                setSessionLength(sessionLength + 1);
              }
            }}
          >
            <div className="btn-icon">
              <BsArrowUpShort />
            </div>
          </button>
          <button
            className="btn"
            id="session-decrement"
            onClick={() => {
              if (sessionLength > 1) {
                setSessionLength(sessionLength - 1);
              }
            }}
          >
            <div className="btn-icon">
              <BsArrowDownShort />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default TimeControl;
