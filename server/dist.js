const fs = require('fs')
const express = require("express")
const path = require("path")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const config = require('./config.json')
const firebase = require('./firebase');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

let products = [];
let categories = [];

const storage = multer.diskStorage(
    {
        destination: './storage/',
        filename: function (req, file, cb) {
            cb(null, `${+new Date()}-${file.originalname.replace(/[ \\(\\)]/g, '-')}`);
        }
    }
);
const upload = multer({ storage: storage });

const getProductsByIds = (ids) => {
    return products.filter(item => !!ids.find(id => id === item.id));
}

const getProductsByCategoryId = (categoryId, passwordHash) => {
    let prds = [];
    if (!categoryId || !categoryId.trim().length) prds = [...products];
    else if (categoryId === 'best-seller') prds = products.filter(item => item.buyersNumber > 150);
    else prds = products.filter(item => item.categoryId === categoryId);

    if (passwordHash) {
        const user = config.users.find(item => item.hash === passwordHash);
        if (user && user.role === 'admin') return prds;
    }

    return prds.map(item => ({
        ...item,
        priceFromCompany: 0,
        codeFromCompany: '',
    }))
}

app.get('/api/health', (req, res) => {
    res.status(200).send('Good');
})

//products
app.get('/api/products', (req, res) => {
    const { id, category, hash } = req.query;

    if (!products.length) {
        firebase.getDocuments('products', undefined, true).then(data => {
            products = data.map(item => ({
                ...item.data,
                id: item.id,
            }))
            res.status(200).json({
                data: id ? getProductsByIds(id.split(',')) : getProductsByCategoryId(category, hash),
            });
        })
    } else {
        res.status(200).json({
            data: id ? getProductsByIds(id.split(',')) : getProductsByCategoryId(category, hash),
        });
    }
})

// categories
app.get('/api/categories', (req, res) => {
    if (categories.length) res.status(200).json({
        data: categories,
    })
    else firebase.getDocuments('categories', undefined, true).then(docs => {
        categories = docs.map(item => ({
            ...item.data,
            id: item.id,
        }));
        res.status(200).json({
            data: categories,
        });
    });
})
// end of categories

app.post("/api/upload-file", upload.single('file'), (req, res, next) => {
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
                    const route = Object.keys(config.routes).find(key => config.routes[key].path === name);
                    if (route) return config.routes[route].title;
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