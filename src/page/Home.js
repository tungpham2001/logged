import React from 'react';
import "../style/Home.css";

const Home = () => {
    return (
        <div className="home_container">
            <h1 className="home_title">Welcome back, Tung Pham</h1>
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
                        <div className="left"></div>
                    </div>
                    <div className="box recipe">
                        <div className="row_1">
                            <div className="column">
                                picture
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
                                serving size
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;