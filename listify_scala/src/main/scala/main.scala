package com.scala.microservice

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.unmarshalling.Unmarshal
import akka.stream.ActorMaterializer
import spray.json.DefaultJsonProtocol._
import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.io.StdIn
import scala.util.{Failure, Success}

// Case classes for JSON serialization
case class Response(message: String)
case class ServiceResponse(data: String)

// JSON Protocol
object JsonProtocol {
  implicit val responseFormat = jsonFormat1(Response)
  implicit val serviceResponseFormat = jsonFormat1(ServiceResponse)
}

// Main Microservice
object Microservice {
  import JsonProtocol._

  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem = ActorSystem("microservice-system")
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    implicit val executionContext: ExecutionContextExecutor = system.dispatcher

    // Function to call external services
    def callService(url: String, serviceName: String): Route = {
      println(s"Calling $serviceName at $url") // Log the URL being called
      val responseFuture: Future[HttpResponse] = Http().singleRequest(HttpRequest(uri = url))

      onComplete(responseFuture) {
        case Success(response) =>
          println(s"Received response from $serviceName: ${response.status}") // Log the response status
          if (response.status.isSuccess()) {
            val entityFuture: Future[String] = Unmarshal(response.entity).to[String]
            onComplete(entityFuture) {
              case Success(body) =>
                complete(Response(s"$serviceName Service Response: $body"))
              case Failure(ex) =>
                complete(Response(s"Error parsing response from $serviceName: ${ex.getMessage}"))
            }
          } else {
            complete(Response(s"Error from $serviceName service: ${response.status}"))
          }
        case Failure(ex) =>
          complete(Response(s"Error calling $serviceName: ${ex.getMessage}"))
      }
    }

    // Define routes
    val route =
      path("api" / "test") {
        get {
          complete(Response("This is a test response"))
        }
      } ~
        path("api" / "hello") {
          get {
            complete(Response("Hello from Scala Microservice!"))
          }
        } ~
        path("api" / "python-service") {
          get {
            callService("http://localhost:8000/api/test", "Python")
          }
        } ~
        path("api" / "java-service") {
          get {
            callService("http://localhost:8080/api/hello", "Java")
          }
        } ~
        path("api" / "node-service") {
          get {
            callService("http://localhost:5000/api/node", "Node")
          }
        } ~
        path("api" / "go-service") {
          get {
            callService("http://localhost:7000/call-services", "Go")
          }
        } ~
        path("api" / "dart-service") {
          get {
            callService("http://localhost:9191/api/dart", "Dart")
          }
        }

    // Bind the HTTP server to the specified port
    val bindingFuture = Http().bindAndHandle(route, "localhost", 9000)

    println(s"Server online at http://localhost:9000/\nPress RETURN to stop...")
    StdIn.readLine() // let it run until user presses return
    bindingFuture
      .flatMap(_.unbind()) // trigger unbinding from the port
      .onComplete(_ => system.terminate()) // and shutdown when done
  }
}
