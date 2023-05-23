from flask import Flask, render_template
import datetime
import random

app = Flask(__name__)

def get_last_update_datetime():
    current_datetime = datetime.datetime.now()
    last_update_date = current_datetime.strftime("%d/%m/%y")
    last_update_time = current_datetime.strftime("%I:%M %p")
    return last_update_date, last_update_time

def get_previous_monday():
    today = datetime.date.today()
    monday = today - datetime.timedelta(days=today.weekday())
    return monday

def get_current_week():
    return datetime.date.today().isocalendar()[1]

def get_recent_restaurants():
    with open('recent_restaurants.txt', 'r') as file:
        recent_restaurants = [line.strip().split(' - ')[0] for line in file.readlines() if line.strip()]

    return recent_restaurants

def get_restaurant_type(current_week):
    restaurant_types = ['Chinese', 'Korean', 'Japanese', 'Mexican', 'Indian', 'Vietnamese', 'Thai']
    selected_types = get_recent_restaurants()  # Load recent restaurants from file

    if len(selected_types) >= len(restaurant_types):
        # Reset the list of recent restaurants
        last_entry = selected_types[-1]  # Remember the last entry
        selected_types = [last_entry]  # Reset the selected types with the last entry
        print("Cycle Restart.")

    available_restaurants = [restaurant for restaurant in restaurant_types if restaurant not in selected_types]

    restaurant_type = random.choice(available_restaurants)
    selected_types.append(restaurant_type)

    # Update the recent restaurants file
    with open('recent_restaurants.txt', 'w') as file:
        last_update_datetime = datetime.datetime.now().strftime("%d/%m/%y %I:%M %p")
        for restaurant in selected_types:
            file.write(f"{restaurant} - {last_update_datetime}\n")

    return restaurant_type, selected_types[-2] if len(selected_types) >= 2 else None

@app.route('/')
def index():
    current_week = get_current_week()
    current_restaurant_type, previous_restaurant_type = get_restaurant_type(current_week)
    last_update_date, last_update_time = get_last_update_datetime()
    return render_template(
        'index.html',
        current_restaurant_type=current_restaurant_type,
        previous_restaurant_type=previous_restaurant_type,
        last_update_date=last_update_date,
        last_update_time=last_update_time
    )

if __name__ == '__main__':
    app.run()
