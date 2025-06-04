// const express = require('express');
// const user = require('./router/user')
// const product = require('./router/product')
// const order = require('./router/order')
// // const cart = require('./router/cart')
// const app = express();
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const fs = require('fs');

// app.use(cors())
// app.listen(4000, () => {
//     console.log("listen port 4000");
// })
// // const express = require('express');
// // const app = express();
// const path = require('path');

// // נתיב סטטי לקבצים
// // app.use('/images', express.static(path.join(__dirname, 'public/images')));
// app.use('/images', express.static(path.join(__dirname, 'public/images')));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use((req, res, next) => {

//     let text = new Date().toGMTString() + "  : " + req.url + '\n';
//     fs.appendFile("log.txt", text, () => {
//         next();
//     })
// })
// app.get('/', (req, res) => {
//     res.send("hello world");
// })

// app.get('/person', (req, res) => {
//     res.send("hello world person");
// })

// // app.use("/student", student);

// app.use("/product", product);
// app.use("/order", order);
// app.use("/user", user);
// // app.use("/cart", cart);

// app.use((req, res, next) => {

//     let text = new Date().toGMTString() + "  : " + req.url + '\n';
//     fs.readFile("404.html", 'utf-8', (err, data) => {
//         res.status(404).send(data);
//     })
// })
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const user = require('./router/user');
const product = require('./router/product');
const order = require('./router/order');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ מוודא שהתמונות יהיו נגישות
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use((req, res, next) => {
  const text = new Date().toGMTString() + "  : " + req.url + '\n';
  fs.appendFile("log.txt", text, () => next());
});

app.get('/', (req, res) => res.send("hello world"));

app.use("/product", product);
app.use("/order", order);
app.use("/user", user);

app.use((req, res, next) => {
  fs.readFile("404.html", 'utf-8', (err, data) => {
    res.status(404).send(data);
  });
});

app.listen(4000, () => {
  console.log("listen port 4000");
});

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
