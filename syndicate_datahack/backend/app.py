# backend/app.py (Flask example)
from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the model
with open('scaler.pkl', 'rb') as file:
    scaler = pickle.load(file)

@app.route('/predict-sales', methods=['POST'])
def predict_sales():
    data = request.json.get('sales')
    if not data or len(data) != 7:
        return jsonify({'error': 'Please provide 7 days of sales data.'}), 400

    # Process input
    input_data = np.array(data).reshape(1, -1)
    scaled_data = scaler.transform(input_data)  # Scale the data
    # Here you would call your model to predict the next day's sales
    # For now, we'll just return a mock prediction
    predicted_sales = scaled_data[0].sum() * 1.1  # Dummy logic for prediction

    return jsonify({'prediction': predicted_sales})

if __name__ == '__main__':
    app.run(debug=True)
