import React, { useState } from 'react';

function LogBoard() {
    const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [maintenanceCalories, setMaintenanceCalories] = useState("");
  const [mildWeightLossCalories, setMildWeightLossCalories] = useState("");
  const [weightLossCalories, setWeightLossCalories] = useState("");
  const [extremeWeightLossCalories, setExtremeWeightLossCalories] = useState("");
  const [mildWeightGainCalories, setMildWeightGainCalories] = useState("");
  const [weightGainCalories, setWeightGainCalories] = useState("");
  const [extremeWeightGainCalories, setExtremeWeightGainCalories] = useState("");

  const calculateBMI = () => {
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

      calculateMaintenanceCalories();
    }
  };

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
  };

  return (
    <div>
      <h2>BMI and Calorie Calculator</h2>
      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div>
        <label>Height (m):</label>
        <input
          type="number"
          step="0.01"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label>Activity Level:</label>
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        >
          <option value="sedentary">Sedentary</option>
          <option value="lightly_active">Lightly Active</option>
          <option value="moderately_active">Moderately Active</option>
          <option value="very_active">Very Active</option>
          <option value="extra_active">Extra Active</option>
        </select>
      </div>
      <button onClick={calculateBMI}>Calculate</button>
      {bmi && status && maintenanceCalories && (
        <div>
          <p>Your BMI: {bmi}</p>
          <p>Status: {status}</p>
          <h3>Calorie Calculations:</h3>
          <p>Maintenance Calories: {maintenanceCalories}</p>
          <p>Mild Weight Loss Calories: {mildWeightLossCalories}</p>
          <p>Weight Loss Calories: {weightLossCalories}</p>
          <p>Extreme Weight Loss Calories: {extremeWeightLossCalories}</p>
          <p>Mild Weight Gain Calories: {mildWeightGainCalories}</p>
          <p>Weight Gain Calories: {weightGainCalories}</p>
          <p>Extreme Weight Gain Calories: {extremeWeightGainCalories}</p>
        </div>
      )}
    </div>
  );
  }
  
export default LogBoard;