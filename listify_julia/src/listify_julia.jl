using HTTP
using JSON

# ---- API Endpoints ----
const APIs = Dict(
    "python" => "http://localhost:8000/api/test",
    "java" => "http://localhost:8080/api/hello",
    "node" => "http://localhost:5000/api/node",
    "go" => "http://localhost:7000/call-services",
    "dart" => "http://localhost:9191/api/dart"
)

# ---- API Query Function ----
function query_api(api_url::String)
    try
        response = HTTP.get(api_url)
        if response.status == 200
            return JSON.parse(String(response.body))
        else
            return Dict("error" => "Failed to retrieve data from " * api_url)
        end
    catch e
        return Dict("error" => "Exception occurred: " * string(e))
    end
end

# ---- Microservice ----
function handle_request(req::HTTP.Request)
    if req.method == "GET"
        response_data = Dict()
        
        # Query all APIs
        for (key, url) in APIs
            response_data[key] = query_api(url)
        end
        
        return HTTP.Response(200, JSON.json(response_data))

    elseif req.method == "POST"
        body = String(req.body)
        data = JSON.parse(body)
        response_data = Dict("message" => "Data received", "data" => data)
        return HTTP.Response(200, JSON.json(response_data))

    else
        return HTTP.Response(405, "Method Not Allowed")
    end
end

function start_server()
    println("Starting server on http://127.0.0.1:8081")
    HTTP.serve(handle_request, "127.0.0.1", 8081)
end

start_server()
