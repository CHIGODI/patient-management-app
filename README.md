# Medicare App

This is a web application designed to manage patient sign-ins and related operations. The project consists of both a backend (Django) and frontend (React) application.

## Instructions to Run the App
- Make sure you have node and python3 installed

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/CHIGODI/patient-management-app.git
cd patient-management-app
```

### 2. Set Up the Backend

#### a. Navigate to the Backend Directory

```bash
cd backend
```
#### b. Create the .env File
Create a `.env` file in the root of the backend directory and add the following environment variables:

```bash
SECRET_KEY=''
DB_NAME=''
DB_USER=''
DB_PASSWORD=''
DB_HOST='localhost'
DB_PORT='5432'
```
- Replace the values with your own configuration for PostgreSQL.

#### c. Set Up the Virtual Environment
Create a virtual environment for the backend:

```bash
python3 -m venv .venv
```

- Activate the virtual environment:

- For Linux/macOS:
```bash
source .venv/bin/activate
```

#### d. Install Required Dependencies
Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

#### e. Set Up the Database

- install PostgreSQL database
```bash
sudo apt install postgresql postgresql-contrib

```
- run setup database file
```bash
sudo -u postgres psql -d replace_with_your_db_name -f set_postgresdb.sql
```

After setting up your database, run the Django migrations:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

### 3. Set Up the Frontend
#### a. Navigate to the Frontend Directory

```bash
cd ../frontend
```

#### b. Install Frontend Dependencies
Install the necessary Node.js dependencies:

```bash
npm install
```

#### c. Build your react app
```bash
npm run build
```

Running the Full Application
```bash
cd ../backend
```
#### a. Create a templates directory in backend directory
```bash
mkdir templates
```

#### b. copy index.html file from build generated from react build into templates
```bash
cp ../frontend/build/templates .
```
- run
```bash
python manage.py collectstatic
```
Finally
```bash
python3 manage.py runserver
```

your app will be running on
http://localhost:8000
