const http = requiere('http');
const fs = requiere('fs');
const port = 300;

const server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'})
    fs.readFile('game.html', function(error, data){
        if(error){
            res.writeHead(404);
            res.write('Error: File Not Found');
        }
        else{
            res.write(data);
        }
        res.end();
    })
})

erver.listen(port, function(error){
    if(error){
        console.log(error);
    }
})