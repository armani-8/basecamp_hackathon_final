import random
from pymongo import MongoClient

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['employee_directory']
collection = db['employees']

# Make Dummy Data
roles = ['Manager', 'Engineer', 'HR', 'Sales']
locations = ['Hartford', 'St Paul', 'Remote']

for _ in range(1000):
    name = 'Employee ' + str(_)
    phone = '123-456-7890'
    role = random.choice(roles)
    location = random.choice(locations)
    salary = random.randint(50000, 150000)

    employee = {
        'name': name,
        'phone': phone,
        'role': role,
        'location': location,
        'salary': salary
    }

    collection.insert_one(employee)
