import pandas as pd
from sklearn.linear_model import LinearRegression
from pymongo import MongoClient

# Mongo Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['employee_directory']
collection = db['employees']

# Retrieve employee data from MongoDB
data = list(collection.find({}, {'_id': 0, 'role': 1, 'location': 1, 'salary': 1}))

# Create pandas DataFrame
df = pd.DataFrame(data)

# Encode categorical variables (job role and location)
df_encoded = pd.get_dummies(df, columns=['role', 'location'])

# Separate features (X) and target variable (y)
X = df_encoded.drop('salary', axis=1)
y = df_encoded['salary']

# Train the Linear Regression model
model = LinearRegression()
model.fit(X, y)
