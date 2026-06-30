import test from 'node:test'
import assert from 'node:assert'
import { get } from 'node:http'
import { server } from '../src/server.js'

test('GET /health returns 200 with ok status and numeric uptime', async (t) => {
  await new Promise((resolve) => {
    if (server.listening) return resolve()
    server.once('listening', resolve)
  })

  const { address, port } = server.address()
  const host = address === '::' || address === '0.0.0.0' ? '127.0.0.1' : address

  const result = await new Promise((resolve, reject) => {
    get({ host, port, path: '/health' }, (res) => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => { body += chunk })
      res.on('end', () => resolve({ statusCode: res.statusCode, body }))
    }).on('error', reject)
  })

  assert.strictEqual(result.statusCode, 200)

  const parsed = JSON.parse(result.body)
  assert.strictEqual(parsed.status, 'ok')
  assert.strictEqual(typeof parsed.uptime, 'number')
  assert.ok(Number.isFinite(parsed.uptime))
  assert.ok(parsed.uptime >= 0)

  await new Promise((resolve) => server.close(resolve))
})
