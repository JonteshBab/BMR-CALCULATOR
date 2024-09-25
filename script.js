document.getElementById('bmrForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = document.getElementById('activityLevel').value;

    let bmr;

    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Mifflin-St Jeor for Men
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161; // Mifflin-St Jeor for Women
    }

    // Activity multiplier
    const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        super_active: 1.9
    };

    const calorieNeeds = bmr * activityMultipliers[activityLevel];

    // Macronutrient distribution (assuming a common ratio)
    const proteinCalories = calorieNeeds * 0.25; // 25% from protein
    const fatCalories = calorieNeeds * 0.30; // 30% from fat
    const carbCalories = calorieNeeds * 0.45; // 45% from carbs

    // Convert calories to grams (1g protein = 4 calories, 1g fat = 9 calories, 1g carbs = 4 calories)
    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;
    const carbGrams = carbCalories / 4;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Your Results:</h2>
        <p>BMR: <strong>${bmr.toFixed(2)}</strong> calories/day</p>
        <p>Caloric Needs: <strong>${calorieNeeds.toFixed(2)}</strong> calories/day</p>
        <p>Protein: <strong>${proteinGrams.toFixed(2)}</strong> grams (25%)</p>
        <p>Fat: <strong>${fatGrams.toFixed(2)}</strong> grams (30%)</p>
        <p>Carbohydrates: <strong>${carbGrams.toFixed(2)}</strong> grams (45%)</p>
    `;
});

