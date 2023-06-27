const http = require("http")
const URL =  require("url")
 
const server = http.createServer((req, res) => {

    if(req.url === '/api/data' && req.method === 'GET'){
        
        const responseData = {message: "hello world"}  // customise 

        res.setHeader('Content-Type', 'application/json') // fix
        res.statusCode = 200; // optional
        res.end(JSON.stringify(responseData)) // fix

    } else if( req.url === '/api/post' && req.method === 'POST'){
            let body = '';

            // pre-processing 
            req.on('data', chunk => {
                body = body + chunk.toString()
            })  
            
            // post-processing
            req.on('end', () => {
                const requestData = JSON.parse(body);
                console.log(requestData)
                const responseData = {message:'Data Recevied'}

                res.setHeader('Content-Type', 'application/json') // fix
                res.statusCode = 201; // optional
                res.end(JSON.stringify(responseData)) // fix
            })
    }else {
        const queryObject = URL.parse(req.url, true).query
        console.log(queryObject)

        var num1 = Number(queryObject.temp1)
        var num2 = Number(queryObject.temp2)

        var sum = num1 + num2
         
        res.writeHead(200, {'Content-type': "text/html"})
    
        res.end(JSON.stringify(sum)) // fix
    }

});

server.listen(8080, () => {
    console.log("server is up and running")
})


