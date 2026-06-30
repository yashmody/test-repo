import { createServer } from 'node:http'

const server = createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end('test-repo up')
    return
  }
  res.writeHead(404)
  res.end('not found')
})

server.listen(3000)
export { server }
