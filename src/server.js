import { createServer } from 'node:http'

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end('test-repo up')
    return
  }
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', uptime: Math.floor(process.uptime()) }))
    return
  }
  res.writeHead(404)
  res.end('not found')
})

server.listen(3000)
export { server }
