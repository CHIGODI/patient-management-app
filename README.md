<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicare App - README</title>
</head>
<body>
    <h1>Medicare App</h1>
    <p>This is a web application designed to manage patient sign-ins and related operations. The project consists of both a backend (Django) and frontend (React) application.</p>

    <h2>Instructions to Run the App</h2>

    <h3>1. Clone the Repository</h3>
    <p>Start by cloning the repository to your local machine:</p>
    <pre><code>git clone https://github.com/your-repository-url.git
cd your-repository-name</code></pre>

    <h3>2. Set Up the Backend</h3>

    <h4>a) Navigate to the Backend Directory</h4>
    <pre><code>cd backend</code></pre>

    <h4>b) Create the .env File</h4>
    <p>Create a <code>.env</code> file in the root of the backend directory and add the following environment variables:</p>
    <pre><code>SECRET_KEY=''
DB_NAME=''
DB_USER=''
DB_PASSWORD=''
DB_HOST='localhost'
DB_PORT='5432'</code></pre>
    <p>Replace the values with your own configuration for PostgreSQL.</p>

    <h4>c) Set Up the Virtual Environment</h4>
    <p>Create a virtual environment for the backend:</p>
    <pre><code>python3 -m venv .venv</code></pre>

    <p>Activate the virtual environment:</p>
    <ul>
        <li>For Linux/macOS: <pre><code>source .venv/bin/activate</code></pre></li>
        <li>For Windows: <pre><code>.venv\Scripts\activate</code></pre></li>
    </ul>

    <h4>d) Install Required Dependencies</h4>
    <p>Install the required Python dependencies:</p>
    <pre><code>pip install -r requirements.txt</code></pre>

    <h4>e) Set Up the Database</h4>
    <p>Run the PostgreSQL setup commands to configure your database:</p>
    <p>Log into PostgreSQL (replace with your PostgreSQL credentials if needed):</p>
    <pre><code>psql -U postgres</code></pre>

    <p>Run the SQL script to set up the database. You can either use a script or manually create your database and user using the following commands:</p>
    <pre><code>CREATE DATABASE your_db_name;
CREATE USER your_db_user WITH PASSWORD 'your_db_password';
ALTER ROLE your_db_user SET client_encoding TO 'utf8';
ALTER ROLE your_db_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE your_db_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;</code></pre>

    <p>After setting up your database, run the Django migrations:</p>
    <pre><code>python manage.py migrate</code></pre>

    <h4>f) Run the Django Development Server</h4>
    <p>Start the Django development server:</p>
    <pre><code>python manage.py runserver</code></pre>
    <p>Your backend will now be running at <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a>.</p>

    <h3>3. Set Up the Frontend</h3>

    <h4>a) Navigate to the Frontend Directory</h4>
    <pre><code>cd ../frontend</code></pre>

    <h4>b) Install Frontend Dependencies</h4>
    <p>Install the necessary Node.js dependencies:</p>
    <pre><code>npm install</code></pre>

    <h3>4. Running the Full Application</h3>
    <p>Ensure both the backend and frontend servers are running:</p>
    <ul>
        <li>Backend: <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> (Django)</li>
        <li>Frontend: <a href="http://localhost:3000/">http://localhost:3000/</a> (React)</li>
    </ul>
    <p>Open <a href="http://localhost:3000/">http://localhost:3000/</a> in your browser to access the frontend, and it will interact with the backend running on Django.</p>

    <h2>Additional Notes</h2>
    <ul>
        <li>Make sure you have PostgreSQL installed on your machine for the database to work.</li>
        <li>To deploy this application in production, you will need to configure additional settings like a reverse proxy (e.g., Nginx) and SSL certificates.</li>
    </ul>
</body>
</html>
