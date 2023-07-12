import React, { useState, useEffect, useCallback, useContext } from 'react';
import "../style/Profile.css";
import { FullNameContext } from '../FullNameContext';

const Profile = () => {
    const { fullName, setFullName } = useContext(FullNameContext);

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };
    const [weight, setWeight] = useState(() => localStorage.getItem("weight") || "");
    const [height, setHeight] = useState(() => localStorage.getItem("height") || "");
    const [bmi, setBmi] = useState("");
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState(() => localStorage.getItem("gender") || "male");
    const [age, setAge] = useState(() => localStorage.getItem("age") || "");
    const [activityLevel, setActivityLevel] = useState(() => localStorage.getItem("activityLevel") || "very_active");
    const [isEditing, setIsEditing] = useState(false);

    const [maintenanceCalories, setMaintenanceCalories] = useState(() => localStorage.getItem("maintenanceCalories") || "");
    const [mildWeightLossCalories, setMildWeightLossCalories] = useState(() => localStorage.getItem("mildWeightLossCalories") || "");
    const [weightLossCalories, setWeightLossCalories] = useState(() => localStorage.getItem("weightLossCalories") || "");
    const [extremeWeightLossCalories, setExtremeWeightLossCalories] = useState(() => localStorage.getItem("extremeWeightLossCalories") || "");
    const [mildWeightGainCalories, setMildWeightGainCalories] = useState(() => localStorage.getItem("mildWeightGainCalories") || "");
    const [weightGainCalories, setWeightGainCalories] = useState(() => localStorage.getItem("weightGainCalories") || "");
    const [extremeWeightGainCalories, setExtremeWeightGainCalories] = useState(() => localStorage.getItem("extremeWeightGainCalories") || "");

    const calculateBMI = useCallback(() => {
        if (weight && height) {
            const bmiValue = (weight / Math.pow(height, 2)).toFixed(2);
            setBmi(bmiValue);
            if (bmiValue < 18.5) {
                setStatus("Underweight");
            } else if (bmiValue >= 18.5 && bmiValue < 25) {
                setStatus("Normal weight");
            } else if (bmiValue >= 25 && bmiValue < 30) {
                setStatus("Overweight");
            } else {
                setStatus("Obese");
            }
        }
    }, [weight, height]);

    const calculateMaintenanceCalories = () => {
        let bmr = 0;

        if (gender === "male") {
            bmr =
                88.362 +
                13.397 * weight +
                4.799 * (height * 100) -
                5.677 * parseInt(age);
        } else if (gender === "female") {
            bmr =
                447.593 +
                9.247 * weight +
                3.098 * (height * 100) -
                4.330 * parseInt(age);
        }

        let activityMultiplier = 1.2; // Sedentary (little to no exercise)

        if (activityLevel === "lightly_active") {
            activityMultiplier = 1.375;
        } else if (activityLevel === "moderately_active") {
            activityMultiplier = 1.55;
        } else if (activityLevel === "very_active") {
            activityMultiplier = 1.725;
        } else if (activityLevel === "extra_active") {
            activityMultiplier = 1.9;
        }

        let maintenanceCalories = bmr * activityMultiplier;
        let mildWeightLossCalories = maintenanceCalories * 0.9;
        let weightLossCalories = maintenanceCalories * 0.8;
        let extremeWeightLossCalories = maintenanceCalories * 0.7;
        let mildWeightGainCalories = maintenanceCalories * 1.1;
        let weightGainCalories = maintenanceCalories * 1.2;
        let extremeWeightGainCalories = maintenanceCalories * 1.3;

        if (bmi < 18.5) {
            maintenanceCalories += maintenanceCalories * 0.05; // Increase calories by 5%
            mildWeightGainCalories += mildWeightGainCalories * 0.05;
            weightGainCalories += weightGainCalories * 0.05;
            extremeWeightGainCalories += extremeWeightGainCalories * 0.05;
        } else if (bmi >= 25 && bmi < 30) {
            maintenanceCalories -= maintenanceCalories * 0.05; // Decrease calories by 5%
            mildWeightLossCalories -= mildWeightLossCalories * 0.05;
            weightLossCalories -= weightLossCalories * 0.05;
            extremeWeightLossCalories -= extremeWeightLossCalories * 0.05;
        } else if (bmi >= 30) {
            maintenanceCalories -= maintenanceCalories * 0.1; // Decrease calories by 10%
            mildWeightLossCalories -= mildWeightLossCalories * 0.1;
            weightLossCalories -= weightLossCalories * 0.1;
            extremeWeightLossCalories -= extremeWeightLossCalories * 0.1;
        }

        setMaintenanceCalories(maintenanceCalories.toFixed(0));
        setMildWeightLossCalories(mildWeightLossCalories.toFixed(0));
        setWeightLossCalories(weightLossCalories.toFixed(0));
        setExtremeWeightLossCalories(extremeWeightLossCalories.toFixed(0));
        setMildWeightGainCalories(mildWeightGainCalories.toFixed(0));
        setWeightGainCalories(weightGainCalories.toFixed(0));
        setExtremeWeightGainCalories(extremeWeightGainCalories.toFixed(0));

        localStorage.setItem("maintenanceCalories", maintenanceCalories.toFixed(0));
        localStorage.setItem("mildWeightLossCalories", mildWeightLossCalories.toFixed(0));
        localStorage.setItem("weightLossCalories", weightLossCalories.toFixed(0));
        localStorage.setItem("extremeWeightLossCalories", extremeWeightLossCalories.toFixed(0));
        localStorage.setItem("mildWeightGainCalories", mildWeightGainCalories.toFixed(0));
        localStorage.setItem("weightGainCalories", weightGainCalories.toFixed(0));
        localStorage.setItem("extremeWeightGainCalories", extremeWeightGainCalories.toFixed(0));
    };

    useEffect(() => {
        calculateBMI();
    }, [calculateBMI]);

    useEffect(() => {
        localStorage.setItem("fullName", fullName);
    }, [fullName]);

    useEffect(() => {
        localStorage.setItem("weight", weight);
    }, [weight]);
    
    useEffect(() => {
        localStorage.setItem("height", height);
    }, [height]);
    
    useEffect(() => {
        localStorage.setItem("gender", gender);
    }, [gender]);
    
    useEffect(() => {
        localStorage.setItem("age", age);
    }, [age]);
    
    useEffect(() => {
        localStorage.setItem("activityLevel", activityLevel);
    }, [activityLevel]);

    const handleUpdate = () => {
        calculateMaintenanceCalories();
        setIsEditing(false);
    };

    return (
        <div className="master_container">
            <h1 className="master_title">Hi {fullName}, how can LOGGED help you today?</h1>
            <div className="profile_container">
                <div className="input_field_container">
                    <h2>Your Profile Information</h2>
                    <div className="input_field">
                        <label>Full Name:</label>
                        <input 
                            type="text"
                            value={fullName}
                            onChange={handleFullNameChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="input_field">
                        <label>Weight (kg):</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="input_field">
                        <label>Height (m):</label>
                        <input
                            type="number"
                            step="0.01"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="input_field">
                        <label>Gender:</label>
                        <select 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)}
                            disabled={!isEditing}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="input_field">
                        <label>Age:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="input_field">
                        <label>Activity Level:</label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            disabled={!isEditing}
                        >
                            <option value="sedentary">Sedentary</option>
                            <option value="lightly_active">Lightly Active</option>
                            <option value="moderately_active">Moderately Active</option>
                            <option value="very_active">Very Active</option>
                            <option value="extra_active">Extra Active</option>
                        </select>
                    </div>
                    <div className="button_container">
                        {!isEditing && (
                            <button className="calculate_calories" onClick={() => setIsEditing(true)}>
                                Modify
                            </button>
                        )}
                        {isEditing && (
                            <button className="calculate_calories" onClick={handleUpdate}>
                                Update
                            </button>
                        )}
                    </div>
                </div>
                <div className="calories_container">
                    {/* <div className="calories_table"> */}
                        <div className="calories_status">
                            <h2>Your BMI: {bmi}</h2>
                            <h2>Status: {status}</h2>
                        </div>
                    {/* </div> */}
                    <div className="calories_table">
                        <div>
                            <h3>For weight loss:</h3>
                        </div>
                        <table className="calorie-table">
                            <thead>
                                <tr>
                                    <th>Goal</th>
                                    <th>Calories</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Maintenance</td>
                                    <td>{maintenanceCalories}</td>
                                </tr>
                                <tr>
                                    <td>Weight Loss</td>
                                    <td>{weightLossCalories}</td>
                                </tr>
                                <tr>
                                    <td>Mild Weight Loss</td>
                                    <td>{mildWeightLossCalories}</td>
                                </tr>
                                <tr>
                                    <td>Extreme Weight Loss</td>
                                    <td>{extremeWeightLossCalories}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="calories_table">
                        <div>
                            <h3>For weight gain:</h3>
                        </div>
                        <table className="calorie-table">
                            <thead>
                                <tr>
                                    <th>Goal</th>
                                    <th>Calories</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Maintenance</td>
                                    <td>{maintenanceCalories}</td>
                                </tr>
                                <tr>
                                    <td>Mild Weight Gain</td>
                                    <td>{mildWeightGainCalories}</td>
                                </tr>
                                <tr>
                                    <td>Weight Gain</td>
                                    <td>{weightGainCalories}</td>
                                </tr>
                                <tr>
                                    <td>Extreme Weight Gain</td>
                                    <td>{extremeWeightGainCalories}</td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;