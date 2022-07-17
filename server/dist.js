const fs = require('fs')
const express = require("express")
const path = require("path")
const app = express()
const routes = require('./routes.json');

const getTitle = (path) => {
    try {
        const name = `/${path.split('/')[1]}`;
        const route = Object.keys(routes).find(key => routes[key].path === name);
        if (route) return routes[route].title;
        return '';
    } catch (e) {
        return '';
    }
}

app.get('/health', (req, res) => {
    res.status(200).send('Good');
})
app.get("*", (req, res, next) => {
    //ignore resources path
    if (/static|libs|favicon/.test(req.url)) {
        next()
    } else {
        const indexFile = path.resolve('./index.html')
        fs.readFile(indexFile, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).send(`Oops, better luck next time! - ${err.message}`)
            }
            const title = getTitle(req.path);
            let html = data;
            if (title) html = html.replace('<title>Sonica Market</title>', `<title>Sonica Market - ${title}</title>`)
            return res.status(200).send(html);
        })
    }
})
app.listen(process.env.PORT || 8000);