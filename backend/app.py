from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = "data.json"

# Initialize data.json if it doesn't exist or if it has an invalid structure
def initialize_data_file():
    if not os.path.exists(DATA_FILE):
        # Create a new data.json file with only ratings
        with open(DATA_FILE, "w") as file:
            json.dump({
                "ratings": {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}
            }, file, indent=4)
    else:
        # If the file exists, we load and check its structure
        try:
            with open(DATA_FILE, "r") as file:
                data = json.load(file)
                # Remove the visits and generated_emails sections if they exist
                if "generated_emails" in data:
                    del data["generated_emails"]
                if "visits" in data:
                    del data["visits"]
                # Ensure ratings section is correct
                if isinstance(data.get("ratings"), dict):
                    ratings = data["ratings"]
                    ratings = {str(i): ratings.get(str(i), 0) for i in range(1, 6)}  # Rebuild the ratings structure
                    data["ratings"] = ratings
                    save_data(data)
        except Exception as e:
            print(f"Error loading or fixing data.json: {e}")
            # Reinitialize the file if there's an error
            with open(DATA_FILE, "w") as file:
                json.dump({
                    "ratings": {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0}
                }, file, indent=4)

# Load data from data.json
def load_data():
    with open(DATA_FILE, "r") as file:
        return json.load(file)

# Save data to data.json
def save_data(data):
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

@app.route("/submit_rating", methods=["POST"])
def submit_rating():
    # Ensure the data.json file is initialized
    initialize_data_file()
    data = load_data()

    # Extract the rating from the request JSON
    try:
        rating = int(request.json.get("rating"))
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid rating value"}), 400

    # Validate that the rating is between 1 and 5
    if 1 <= rating <= 5:
        # Increment the count for the given rating
        data["ratings"][str(rating)] += 1

        # Save the updated data to the file
        save_data(data)

        # Return a success response
        return jsonify({"message": "Rating submitted successfully!"}), 200
    else:
        # Return an error for invalid ratings
        return jsonify({"error": "Rating must be between 1 and 5"}), 400

# Function to process ratings on script execution
def process_ratings():
    try:
        print("Processing ratings...")
        initialize_data_file()
        data = load_data()

        # Simulated pending ratings (replace with real logic if needed)
        pending_ratings = [5, 4, 3, 5, 2]  # Example ratings

        for rating in pending_ratings:
            if str(rating) in data["ratings"]:
                data["ratings"][str(rating)] += 1

        # Save updated ratings
        save_data(data)
        print("Ratings processed successfully.")
    except Exception as e:
        print(f"Error processing ratings: {e}")

@app.route('/')
def home():
    return "Backend is running!"

if __name__ == "__main__":
    # Process ratings when the script is run
    process_ratings()
    # Set the port to 3000, which Replit uses for web apps
    port = int(os.environ.get('PORT', 3000))
    app.run(host="0.0.0.0", port=port)
