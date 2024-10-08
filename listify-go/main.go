package main

import (
	"context"
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

// Global variables for databases
var (
	mariaDB     *sql.DB
	mySQLDB     *sql.DB
	mongoClient *mongo.Client
)

// Connect to MariaDB
func connectMariaDB() {
	dsn := "root:Prithibi420@@tcp(127.0.0.1:3309)/listify_go"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("MariaDB connection failed:", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal("MariaDB ping failed:", err)
	}
	mariaDB = db
	fmt.Println("Connected to MariaDB")
}

// Connect to MySQL
func connectMySQL() {
	dsn := "gouser:Prithibi420@@tcp(localhost:3306)/listify_mysql_go"
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("MySQL connection failed:", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal("MySQL ping failed:", err)
	}
	mySQLDB = db
	fmt.Println("Connected to MySQL")
}

// Connect to MongoDB
func connectMongoDB() {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal("MongoDB client creation failed:", err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal("MongoDB connection failed:", err)
	}

	// Ping MongoDB to verify connection
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal("MongoDB ping failed:", err)
	}
	mongoClient = client
	fmt.Println("Connected to MongoDB")
}

// Call Python service
func callPythonService() (string, error) {
	resp, err := http.Get("http://localhost:8000/api/test")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

// Call Java service
func callJavaService() (string, error) {
	resp, err := http.Get("http://localhost:8080/api/hello")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

// Call Node.js service
func callNodeService() (string, error) {
	resp, err := http.Get("http://localhost:5000/api/node")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

// Handler to call all external services
func callExternalServicesHandler(c *gin.Context) {
	// Call Python service
	pythonResp, err := callPythonService()
	if err != nil {
		log.Println("Error calling Python service:", err)
		pythonResp = "Error calling Python service"
	}

	// Call Java service
	javaResp, err := callJavaService()
	if err != nil {
		log.Println("Error calling Java service:", err)
		javaResp = "Error calling Java service"
	}

	// Call Node.js service
	nodeResp, err := callNodeService()
	if err != nil {
		log.Println("Error calling Node.js service:", err)
		nodeResp = "Error calling Node.js service"
	}

	// Respond with results from all services
	c.JSON(http.StatusOK, gin.H{
		"pythonService": pythonResp,
		"javaService":   javaResp,
		"nodeService":   nodeResp,
	})
}

func main() {
	// Connect to databases
	connectMariaDB()
	connectMySQL()
	connectMongoDB()

	// Set up Gin router with CORS middleware
	router := gin.Default()

	// Configure CORS settings
	corsConfig := cors.Config{
		AllowOrigins:     []string{"*"}, // Allow all origins
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour, // Cache preflight requests
	}

	router.Use(cors.New(corsConfig))

	// MariaDB test route
	router.GET("/mariadb", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Connected to MariaDB successfully!",
		})
	})

	// MySQL test route
	router.GET("/mysql", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Connected to MySQL successfully!",
		})
	})

	// MongoDB test route
	router.GET("/mongodb", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Connected to MongoDB successfully!",
		})
	})
	// Hello World route
	router.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World!",
		})
	})

	// Route to call external services
	router.GET("/call-services", callExternalServicesHandler)

	// Run the server on port 7000
	router.Run(":7000")
}
