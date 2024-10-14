require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv/load'
require_relative '../app/models/user'
require_relative '../config/mongo'

# Set the database configuration
set :database_file, File.expand_path('../../config/database.yml', __FILE__)

# Use the RACK_ENV or default to 'development'
environment = ENV['RACK_ENV'] || 'development'

# Load the database configuration based on the current environment
ActiveRecord::Base.establish_connection(environment.to_sym)

# Serve static files from the public directory
set :public_folder, 'public'

# Serve the UI
get '/users' do
  <<-HTML
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Management</title>
      <link rel="stylesheet" href="/css/styles.css"> <!-- Link to your CSS -->
  </head>
  <body>
      <h1>User Management</h1>
      <form id="createUserForm">
          <input type="text" id="name" placeholder="Name" required>
          <input type="email" id="email" placeholder="Email" required>
          <button type="submit">Create User</button>
      </form>
      <ul id="userList"></ul>
      <script src="/js/app.js"></script> <!-- Link to your JavaScript -->
  </body>
  </html>
  HTML
end

# Handle user creation
post '/users' do
  data = JSON.parse(request.body.read)
  user = User.new(name: data['name'], email: data['email'])

  if user.save
    status 201
    user.to_json
  else
    status 422
    user.errors.full_messages.to_json
  end
end

# Connect to external APIs
helpers do
  def call_api(api_url)
    response = HTTParty.get(api_url)
    response.parsed_response
  rescue => e
    "Error connecting to API: #{e.message}"
  end
end

# Endpoints to connect to each service separately
get '/api/test' do
  call_api('http://localhost:8000/api/test').to_json
end

get '/api/hello' do
  call_api('http://localhost:8080/api/hello').to_json
end

get '/api/node' do
  call_api('http://localhost:5000/api/node').to_json
end

get '/api/go' do
  call_api('http://localhost:7000/call-services').to_json
end

get '/api/dart' do
  call_api('http://localhost:9191/api/dart').to_json
end

# SQLite connection test
get '/check_sqlite' do
  begin
    User.first # Simple query to test connection
    'SQLite connected successfully!'
  rescue => e
    "SQLite connection error: #{e.message}"
  end
end

# PostgreSQL connection test
get '/check_postgresql' do
  begin
    ActiveRecord::Base.establish_connection(:postgresql)
    ActiveRecord::Base.connection
    'PostgreSQL connected successfully!'
  rescue => e
    "PostgreSQL connection error: #{e.message}"
  end
end

# MongoDB connection test
get '/check_mongodb' do
  begin
    client = Mongo::Client.new(['127.0.0.1:27017'], database: 'test')
    client.database_names # Query to test connection
    'MongoDB connected successfully!'
  rescue => e
    "MongoDB connection error: #{e.message}"
  end
end
