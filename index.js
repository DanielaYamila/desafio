import http from 'http';

const server = http.createServer((rq, rs) => {
    rs.end('Hi World!')
})

const connectedserver = server.listen(8080, () => {
    console.log('First servidor')
})