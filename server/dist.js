const routes = require('./routes.json');
const fs = require('fs')
const express = require("express")
const path = require("path")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const multer = require('multer');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

var storage = multer.diskStorage(
    {
        destination: './storage/',
        filename: function (req, file, cb) {
            cb(null, `${+new Date()}-${file.originalname.replace(/[ \\(\\)]/g, '-')}`);
        }
    }
);
var upload = multer({ storage: storage });

app.get('/health', (req, res) => {
    res.status(200).send('Good');
})
app.post("/upload-file", upload.single('file'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send(`/storage/${file.filename}`)
});
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
            const getTitle = () => {
                const path = req.path;
                try {
                    const name = `/${path.split('/')[1]}`;
                    const route = Object.keys(routes).find(key => routes[key].path === name);
                    if (route) return routes[route].title;
                    return '';
                } catch (e) {
                    return '';
                }
            }
            const title = getTitle();
            let html = data;
            if (title) html = html.replace('<title>Sonica Market</title>', `<title>Sonica Market - ${title}</title>`)
            return res.status(200).send(html);
        })
    }
})
app.listen(process.env.PORT || 8000);