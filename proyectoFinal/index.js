import http from 'http';

const server = http.createServer((rq, rs) => {
    rs.end('Hi');
});

const connectedServer = server.listen(8080, () => {
    console.log("Listen...");
})