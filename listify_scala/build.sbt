name := "scala-microservice"

version := "0.1"

scalaVersion := "2.13.12" // Specify the Scala version you want

// Add these dependencies to your build.sbt
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor" % "2.6.20",
  "com.typesafe.akka" %% "akka-stream" % "2.6.20",
  "com.typesafe.akka" %% "akka-http" % "10.2.10",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.2.10",
  "org.mongodb.scala" %% "mongo-scala-driver" % "4.7.1",
  "org.postgresql" % "postgresql" % "42.2.23", // Add PostgreSQL dependency
  "org.mariadb.jdbc" % "mariadb-java-client" % "2.7.2", // Add MariaDB dependency
  "mysql" % "mysql-connector-java" % "8.0.25", // Add MySQL dependency
  "io.spray" %% "spray-json" % "1.3.6"
)


// Add any other configurations or plugins if needed
