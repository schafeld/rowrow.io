const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>RowRow.io</title></head>
        <body>
          <h1>RowRowIo is on the Go!</h1>  
          ${html}
          <p>Nothing to see yet... &#x1F642;</p>
        </body>
      </html>
    `)
  })
})

server.listen(3000)