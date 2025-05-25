
const fs = require('fs');

function get(req, res) {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let order = data.find(st => st.id == id)

            if (order == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(order);
            }

        }


    })
}
exports.post = (req, res) => {
    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) return res.status(500).send("Error reading orders file");

        let orders = JSON.parse(data);

        // let validIds = orders
        //     .map(o => Number(o.id))
        //     .filter(id => !isNaN(id) && id >= 0);

        // let idOrder = validIds.length > 0
        //     ? Math.max(...validIds) + 1
        //     : 1;
        // let idOrder = orders.length > 0 ? [orders.length - 1].id + 1 : 0;

        delete req.body.id;

        let validIds = orders
            .map(o => Number(o.id))
            .filter(id => !isNaN(id) && id >= 0);

        let idOrder = validIds.length > 0
            ? Math.max(...validIds) + 1
            : 1;

        console.log("req.body לפני מחיקה:", req.body);

        delete req.body.id;

        let dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

        let newOrder = {
            ...req.body,
            id: idOrder,
            userId: req.body.userId,
            dueDate: dueDate
        };


        orders.push(newOrder);

        fs.writeFile("orders.json", JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving new order");
            } else {
                return res.json(newOrder);
            }
        });
    });
};


exports.deleteOrderByUser = (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    fs.readFile("orders.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("שגיאה בקריאת קובץ ההזמנות");
        }

        let orders = JSON.parse(data);
        const orderIndex = orders.findIndex(order =>
            Number(order.id) === Number(orderId) &&
            String(order.userId) === String(userId)
        );
        console.log("orderIndex", orderIndex)
        if (orderIndex === -1) {
            return res.status(404).send("ההזמנה לא נמצאה עבור המשתמש");
        }

        orders.splice(orderIndex, 1);

        fs.writeFile("orders.json", JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                return res.status(500).send("שגיאה בשמירת קובץ ההזמנות");
            }
            res.send("ההזמנה נמחקה בהצלחה");
        });
    });
};


//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
