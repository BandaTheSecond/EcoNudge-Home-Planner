import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv
import openai

load_dotenv()

external_bp = Blueprint("external_bp", __name__, url_prefix="/external")

# Load API keys from environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
ELECTRICITYMAP_API_KEY = os.getenv("ELECTRICITYMAP_API_KEY")
GOOGLE_GEOCODING_API_KEY = os.getenv("GOOGLE_GEOCODING_API_KEY")

# OpenAI Client
client = None
if OPENAI_API_KEY:
    try:
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
    except Exception as e:
        print(f"Error initializing OpenAI client: {e}")
        client = None

# AI Nudges Route
@external_bp.route("/ai-nudge", methods=["POST"])
def get_ai_nudge():
    if not client:
        return jsonify({"error": "OpenAI API key not configured"}), 500

    data = request.get_json()
    user_input = data.get("input", "Suggest an eco-friendly action")

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an eco-friendly assistant providing personalized tips."},
                {"role": "user", "content": user_input}
            ],
            max_tokens=150
        )
        nudge = response.choices[0].message.content.strip()
        return jsonify({"nudge": nudge}), 200
    except Exception as e:
        error_str = str(e)
        if "insufficient_quota" in error_str or "RateLimitError" in error_str:
            # Return a fallback message when quota is exceeded
            return jsonify({"nudge": "Consider walking or biking for short trips to reduce your carbon footprint!"}), 200
        elif "invalid_api_key" in error_str or "Incorrect API key" in error_str:
            # Return a fallback message when API key is invalid
            return jsonify({"nudge": "Consider walking or biking for short trips to reduce your carbon footprint!"}), 200
        else:
            return jsonify({"error": error_str}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Weather Route (OpenWeatherMap for weather-based eco tips)
@external_bp.route("/weather", methods=["GET"])
def get_weather():
    if not OPENWEATHER_API_KEY:
        return jsonify({"error": "OpenWeatherMap API key not configured"}), 500

    city = request.args.get("city", "New York")
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}&units=metric"

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        weather_info = {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
            "humidity": data["main"]["humidity"],
            "eco_tip": generate_weather_eco_tip(data["weather"][0]["main"], data["main"]["temp"])
        }
        return jsonify(weather_info), 200
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

def generate_weather_eco_tip(weather_main, temp):
    if weather_main == "Rain":
        return "Great weather for walking or biking instead of driving!"
    elif temp > 25:
        return "Hot day! Consider using public transport to reduce AC usage."
    elif temp < 10:
        return "Cold day! Bundle up and walk to save energy."
    else:
        return "Perfect weather for outdoor eco-friendly activities!"

# Carbon Calculation Route (Mock implementation - replace with actual API)
@external_bp.route("/carbon", methods=["POST"])
def calculate_carbon():
    data = request.get_json()
    # Mock carbon calculation based on input data
    # In a real implementation, this would call a carbon calculation API
    activity = data.get("activity", "general")
    amount = data.get("amount", 1)

    # Simple mock calculation
    carbon_footprint = amount * 0.5  # kg CO2

    carbon_data = {
        "carbon_footprint": carbon_footprint,
        "unit": "kg CO2",
        "activity": activity,
        "eco_tip": "Consider reducing this activity or offsetting your carbon footprint through tree planting."
    }
    return jsonify(carbon_data), 200

# EPA Data Route (Mock educational data)
@external_bp.route("/epa-data", methods=["GET"])
def get_epa_data():
    zip_code = request.args.get("zip", "10001")

    # Mock EPA data - in real implementation, this would fetch from EPA API
    epa_data = {
        "zip_code": zip_code,
        "air_quality_index": 45,
        "air_quality_category": "Good",
        "ozone_level": "0.035 ppm",
        "particulate_matter": "12.5 µg/m³",
        "eco_tips": [
            "Reduce vehicle emissions by carpooling or using public transport",
            "Plant trees and vegetation to improve air quality",
            "Use energy-efficient appliances to reduce pollution"
        ],
        "local_resources": [
            "Community recycling center",
            "Bike lanes and pedestrian paths",
            "Local clean energy programs"
        ]
    }
    return jsonify(epa_data), 200
