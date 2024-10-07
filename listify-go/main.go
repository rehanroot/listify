package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"time"

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

func main() {
	// Connect to databases
	connectMariaDB()
	connectMySQL()
	connectMongoDB()

	// Set up Gin router
	router := gin.Default()

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

	// Run the server on port 7000
	router.Run(":7000")
}
