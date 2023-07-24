import React from 'react';
// import SearchBar from '../component/SearchBar';
import "../style/LogBoard.css";

function LogBoard() {
    return (
        <div className="log-board-container">
            <h1 className="master-title">Let's get LOGGED!!</h1>
            <div className="grid-container">
                <div className="column log-summary">
                    <div className="log-calories-progress">
                        2000/3000 kcal consumed
                    </div>
                    <div className="log-progress-reminder">
                        you have 1000 kcal left!
                    </div>
                    <div className="log-nutrition-summary">
                        <div className="nutrition protein">200g protein</div>
                        <div className="nutrition carb">100g carb</div>
                        <div className="nutrition fat">54g fat</div>
                    </div>
                </div>
                <div className="column log-items">
                    tung
                </div>
                <div className="column log-entry">
                    fsdffsdfsd
                </div>
            </div>
            {/* <SearchBar /> */}
        </div>
    );
  }
  
export default LogBoard;