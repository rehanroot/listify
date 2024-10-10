import 'package:mysql1/mysql1.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:http/http.dart' as http;
import 'package:postgres/postgres.dart'; // Import the PostgreSQL package

/// MySQL connection setup
Future<MySqlConnection> connectToMySQL() async {
  final settings = ConnectionSettings(
    host: 'localhost',
    port: 3306,
    user: 'rustuser',
    password: 'Prithibi420@',
    db: 'listify_rust',
  );
  return await MySqlConnection.connect(settings);
}

/// MariaDB connection setup
Future<MySqlConnection> connectToMariaDB() async {
  final settings = ConnectionSettings(
    host: '127.0.0.1',
    port: 3309,
    user: 'root',
    password: 'Prithibi420@',
    db: 'listify_rust',
  );
  return await MySqlConnection.connect(settings);
}

/// MongoDB connection setup
Future<Db> connectToMongoDB() async {
  final db = Db('mongodb://localhost:27017/listify_rust');
  await db.open();
  return db;
}

/// PostgreSQL connection setup
Future<PostgreSQLConnection> connectToPostgreSQL() async {
  final connection = PostgreSQLConnection(
    'localhost', // Host
    5432,        // Port
    'listify', // Database name
    username: 'postgres', // Your PostgreSQL username
    password: 'Prithibi420@', // Your PostgreSQL password
  );
  await connection.open();
  return connection;
}

/// Function to call an API
Future<void> callApi(String url) async {
  try {
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      // Handle the response from the API
      print('Response from $url: ${response.body}');
    } else {
      print('Failed to call API: ${response.statusCode} - ${response.body}');
    }
  } catch (e) {
    print('Error calling API: $e');
  }
}

void main() async {
  MySqlConnection? mysqlConn;
  MySqlConnection? mariaDbConn;
  Db? mongoDb;
  PostgreSQLConnection? postgresConn; // Declare PostgreSQL connection

  try {
    // MySQL connection
    mysqlConn = await connectToMySQL();
    print('Connected to MySQL');

    // MariaDB connection
    mariaDbConn = await connectToMariaDB();
    print('Connected to MariaDB');

    // MongoDB connection
    mongoDb = await connectToMongoDB();
    print('Connected to MongoDB');

    // PostgreSQL connection
    postgresConn = await connectToPostgreSQL();
    print('Connected to PostgreSQL');

    // API connections
    print('Calling Java API...');
    await callApi('http://localhost:8080/api/hello');

    print('Calling Node.js API...');
    await callApi('http://localhost:5000/api/node');

    print('Calling Python API...');
    await callApi('http://localhost:8000/api/test');

    print('Calling Go API...');
    await callApi('http://localhost:7000/hello');

  } catch (e) {
    print('Error: $e');
  } finally {
    // Close connections
    if (mysqlConn != null) {
      await mysqlConn.close();
      print('MySQL connection closed.');
    }
    if (mariaDbConn != null) {
      await mariaDbConn.close();
      print('MariaDB connection closed.');
    }
    if (mongoDb != null) {
      await mongoDb.close();
      print('MongoDB connection closed.');
    }
    if (postgresConn != null) {
      await postgresConn.close();
      print('PostgreSQL connection closed.');
    }
    print('All connections closed successfully.');
  }
}
