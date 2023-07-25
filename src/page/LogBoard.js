import React, { useState } from 'react';
// import SearchBar from '../component/SearchBar';
import "../style/LogBoard.css";

function LogBoard() {
    const [foodName, setFoodName] = useState('');
    const [quantity, setQuantity] = useState(1); // Initialize quantity to 1 by default
    const [caloriesPerServing, setCaloriesPerServing] = useState('');
    const [proteinPerServing, setProteinPerServing] = useState('');
    const [fatPerServing, setFatPerServing] = useState('');
    const [carbsPerServing, setCarbsPerServing] = useState('');
    const [recordedFoods, setRecordedFoods] = useState([]);

    const [editIndex, setEditIndex] = useState(-1);
    const [editedFoodName, setEditedFoodName] = useState('');
    const [editedQuantity, setEditedQuantity] = useState('');
    const [editedCaloriesPerServing, setEditedCaloriesPerServing] = useState(0);
    const [editedProteinPerServing, setEditedProteinPerServing] = useState(0);
    const [editedFatPerServing, setEditedFatPerServing] = useState(0);
    const [editedCarbsPerServing, setEditedCarbsPerServing] = useState(0);

    const calorieGoal = 3000;

    const handleEditTicket = (index) => {
        // Set the editIndex to the index of the ticket being edited
        setEditIndex(index);

        // Initialize the edited values with the current values of the ticket being edited
        const foodItem = recordedFoods[index];
        setEditedFoodName(foodItem.foodName);
        setEditedQuantity(foodItem.quantity);
        setCaloriesPerServing(foodItem.caloriesPerServing);
        setProteinPerServing(foodItem.proteinPerServing);
        setFatPerServing(foodItem.fatPerServing);
        setCarbsPerServing(foodItem.carbsPerServing);
    };

    const handleUpdateTicket = () => {
        if (editIndex === -1 || editIndex >= recordedFoods.length) {
            return;
        }
        
        // Create a copy of the recordedFoods array
        const updatedRecordedFoods = [...recordedFoods];
        
        // Update the edited ticket in the copy of the array
        updatedRecordedFoods[editIndex] = {
            ...recordedFoods[editIndex],
            foodName: editedFoodName,
            quantity: editedQuantity,
            calories: editedCaloriesPerServing * editedQuantity,
            protein: editedProteinPerServing * editedQuantity,
            fat: editedFatPerServing * editedQuantity,
            carbs: editedCarbsPerServing * editedQuantity,
        };
        
        // Update the recordedFoods state with the updated array
        setRecordedFoods(updatedRecordedFoods);
        
        // Reset the editIndex
        setEditIndex(-1);
    };

    const handleCancelEdit = () => {
        // Reset the editIndex and clear the edited values
        setEditIndex(-1);
    };

    const handleAddFood = () => {
        const totalCalories = caloriesPerServing * quantity;
        const totalProtein = proteinPerServing * quantity;
        const totalFat = fatPerServing * quantity;
        const totalCarbs = carbsPerServing * quantity;

        const newFoodItem = {
            foodName,
            quantity,
            calories: totalCalories,
            protein: totalProtein,
            fat: totalFat,
            carbs: totalCarbs,
        };

        // Update the list of recorded food items with the new food item
        setRecordedFoods([...recordedFoods, newFoodItem]);

        // Reset the input fields after adding the food item
        setFoodName('');
        setQuantity(1);
        setCaloriesPerServing('');
        setProteinPerServing('');
        setFatPerServing('');
        setCarbsPerServing('');
    };

    const handleDeleteTicket = (index) => {
        // Create a copy of the recordedFoods array and remove the ticket at the specified index
        const updatedRecordedFoods = [...recordedFoods];
        updatedRecordedFoods.splice(index, 1);

        // Update the recordedFoods state with the updated array
        setRecordedFoods(updatedRecordedFoods);
    };

    // Calculate total calories, protein, fat, and carbs from recorded food items
    const totalCalories = recordedFoods.reduce((sum, foodItem) => sum + foodItem.calories, 0);
    const totalProtein = recordedFoods.reduce((sum, foodItem) => sum + foodItem.protein, 0);
    const totalFat = recordedFoods.reduce((sum, foodItem) => sum + foodItem.fat, 0);
    const totalCarbs = recordedFoods.reduce((sum, foodItem) => sum + foodItem.carbs, 0);

    // Calculate remaining calories
    const remainingCalories = calorieGoal - totalCalories;

    return (
        <div className="log-board-container">
            <h1 className="master-title">Let's get LOGGED!!</h1>
            <div className="grid-container">
                <div className="column log-summary">
                    <div className="log-calories-progress">
                        {totalCalories}/{calorieGoal} kcal consumed
                    </div>
                    <div className="log-progress-reminder">
                        you have {remainingCalories} kcal left!
                    </div>
                    <div className="log-nutrition-summary">
                        <div className="nutrition protein">{totalProtein}g protein</div>
                        <div className="nutrition carb">{totalCarbs}g carb</div>
                        <div className="nutrition fat">{totalFat}g fat</div>
                    </div>
                </div>
                <div className="column log-items">
                    {recordedFoods.map((foodItem, index) => (
                        <div key={index} className="recorded-ticket">
                            {editIndex === index ? (
                            // Render the input fields in edit mode
                            <>
                                <input
                                    type="text"
                                    value={editedFoodName}
                                    onChange={(e) => setEditedFoodName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={editedQuantity}
                                    onChange={(e) => setEditedQuantity(e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={editedCaloriesPerServing}
                                    onChange={(e) => setEditedCaloriesPerServing(e.target.value)}
                                    placeholder="Calories Per Serving"
                                />
                                <input
                                    type="number"
                                    value={editedProteinPerServing}
                                    onChange={(e) => setEditedProteinPerServing(e.target.value)}
                                    placeholder="Protein Per Serving"
                                />
                                <input
                                    type="number"
                                    value={editedFatPerServing}
                                    onChange={(e) => setEditedFatPerServing(e.target.value)}
                                    placeholder="Fat Per Serving"
                                />
                                <input
                                    type="number"
                                    value={editedCarbsPerServing}
                                    onChange={(e) => setEditedCarbsPerServing(e.target.value)}
                                    placeholder="Carbs Per Serving"
                                />
                                <button onClick={handleUpdateTicket}>Save</button>
                                <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                            ) : (
                            // Render the ticket in view mode
                            <>
                                <p>
                                    Food Name: {foodItem.foodName}, 
                                    Quantity: {foodItem.quantity},
                                    Calories: {foodItem.calories},
                                    Protein: {foodItem.protein}g,
                                    Fat: {foodItem.fat}g,
                                    Carbs: {foodItem.carbs}g
                                </p>
                                <button onClick={() => handleEditTicket(index)}>Edit</button>
                                <button onClick={() => handleDeleteTicket(index)}>Delete</button>
                            </>
                            )}
                        </div>
                    ))}
                </div>
                <div className="column log-entry">
                    <input
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        placeholder="Food Name"
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                    />
                    <input
                        type="number"
                        value={caloriesPerServing}
                        onChange={(e) => setCaloriesPerServing(e.target.value)}
                        placeholder="Calories Per Serving"
                    />
                    <input
                        type="number"
                        value={proteinPerServing}
                        onChange={(e) => setProteinPerServing(e.target.value)}
                        placeholder="Protein Per Serving"
                    />
                    <input
                        type="number"
                        value={fatPerServing}
                        onChange={(e) => setFatPerServing(e.target.value)}
                        placeholder="Fat Per Serving"
                    />
                    <input
                        type="number"
                        value={carbsPerServing}
                        onChange={(e) => setCarbsPerServing(e.target.value)}
                        placeholder="Carbs Per Serving"
                    />
                    <button onClick={handleAddFood}>Add</button>
                </div>
            </div>
            {/* <SearchBar /> */}
        </div>
    );
}
  
export default LogBoard;