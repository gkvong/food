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

def get_restaurant_type(current_week):
    restaurant_types = ['Chinese', 'Korean', 'Japanese', 'Mexican (GYG)', 'Indian', 'Vietnamese', 'Thai']
    selected_types = ['Chinese', 'Indian']  # Sample data, update as needed
    
    last_index = (current_week - 1) % len(restaurant_types)
    
    if len(selected_types) >= len(restaurant_types):
        selected_types = []
    
    while True:
        restaurant_type = random.choice(restaurant_types)
        if restaurant_type not in selected_types:
            break
    
    selected_types.append(restaurant_type)
    
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
