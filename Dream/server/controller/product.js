
const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(product);
            }

        }


    })
}
exports.delete = (req, res) => {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let index = data.findIndex(st => st.id == id)
            if (index == -1) {
                res.status(500).send("not found student by tz " + id);
            } else {
                data.splice(index, 1);
                fs.writeFile("products.json", JSON.stringify(data), (err) => {
                    if (err) {
                        res.status(500).send("error write file student ")
                    } else {
                        res.send(data);
                    }
                })
            }
        }
    })
}
exports.put = (req, res) => {
    console.log("sdnfb")

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let index = data.findIndex(st => st.id == id)
            if (index == -1) {
                res.status(500).send("not found student by tz " + id);
            } else {
                data[index] = req.body;
                fs.writeFile("products.json", JSON.stringify(data), (err) => {
                    if (err) {
                        res.status(500).send("error write file student ")
                    } else {
                        res.send(data);
                    }
                })
            }
        }
    })
}

// exports.post = (req, res) => {

//     fs.readFile("products.json", "utf-8", (err, data) => {
//         //המרה של טקסט למערך
//         let products = JSON.parse(data);
//         //body =  לתוכן שנשלח בפונקציה פןסט 
//         let product =req.body
//         // מוסיף איידי למוצר החדש 
//         products.push(product);
//         fs.writeFile("products.json", JSON.stringify(products), (err) => {
//             if (err) {
//                 res.status(500).send("error  in add products ");
//             } else {
//                 res.send(product);
//             }
//         })
//     })
// };
// //אפשרות שניה ליצא פונקציה מדף
exports.post = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        //  let orders = JSON.parse(data);
        let products = JSON.parse(data);

        // let idPro = products.length > 0 ? [products.length - 1].id + 1 : 0;
        delete req.body.id;

        let validIds = products
            .map(o => Number(o.id))
            .filter(id => !isNaN(id) && id >= 0);

        let idPro = validIds.length > 0
            ? Math.max(...validIds) + 1
            : 1;

        // let idPro = maxId + 1;
        //body =  לתוכן שנשלח בפונקציה פןסט 
        let product = req.body
        // מוסיף איידי למוצר החדש 
        let newProduct = {
            ...req.body,          // קודם כל כל השדות מהבקשה
            id: idPro
        }
        products.push(newProduct);
        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("error  in add products ");
            } else {
                res.send(newProduct); // ✅ מחזיר לקליינט את המוצר עם id
            }
        })
    })
}

exports.get = get;
