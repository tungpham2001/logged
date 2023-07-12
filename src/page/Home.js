import React, { useContext } from 'react';
import "../style/Home.css";
import TempPic from "../images/logged.jpg";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FullNameContext } from '../FullNameContext';

const Home = () => {
    const { fullName } = useContext(FullNameContext);

    return (
        <div className="home_container">
            <h1 className="home_title">Welcome back, {fullName}!</h1>
            <div className="home_display_box">
                <div className="row">
                    <div className="box avg_cal_consumed">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                    <div className="box avg_cal_burned">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
                <div className="separator"></div>
                <div className="row">
                    <div className="box log_board_display">
                        <div className="left">
                            <div style={{ 
                                    width: 200, 
                                    height: 200, 
                                }}
                            >
                                <CircularProgressbar value="75" text={`75%`} />
                            </div>
                            <div className="log_detail">
                                <h3>you have 1000 kcal left!</h3>
                            </div>
                            <div className="log_button">
                                <button className="log_button_toggle">log in your food</button>
                            </div>
                        </div>
                        <div className="right">
                            <div className="log_row">lol</div>
                            <div className="log_row">lol</div>
                            <div className="log_row">lol</div>
                        </div>
                    </div>
                    <div className="box recipe">
                        <div className="row_1">
                            <div className="column">
                                <img 
                                    alt="recipe" 
                                    src={TempPic} 
                                    style={{ 
                                        borderRadius: "35px", 
                                        width: '100%', 
                                        height: '100%', 
                                        objectFit: 'fill' 
                                    }} 
                                />
                            </div>
                            <div className="column">
                                <div className="description_row">
                                    food name
                                </div>
                                <div className="description_row">
                                    tags
                                </div>
                                <div className="description_row">
                                    log button
                                </div>
                                <div className="description_row">
                                    view more
                                </div>
                            </div>
                        </div>
                        <div className="row_2">
                            <div className="nutrition_column">
                                protein
                            </div>
                            <div className="nutrition_column">
                                carb
                            </div>
                            <div className="nutrition_column">
                                fat
                            </div>
                            <div className="nutrition_column">
                                kcal
                            </div>
                            <div className="nutrition_column">
                                size
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;