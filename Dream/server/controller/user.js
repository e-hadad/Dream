
const fs = require('fs');

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.send(JSON.parse(data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let user = data.find(st => st.id == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(user);
            }

        }


    })
}

exports.login = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let user = req.body
            data = JSON.parse(data);
            let currentUser = data.find(st => st.password == user.password)

            if (currentUser == undefined) {
                res.status(500).send("user isn't exist!, please register");
            } else {
                res.send(currentUser);
            }

        }

    })
    }

exports.post = (req, res) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("error in add users");
        }

        let users = JSON.parse(data);
        req.body.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const user = req.body;
        users.push(user);

        fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                res.status(500).send("error in add users");
            } else {
                res.send(user); // Return the newly created user object
            }
        });
    });
}
exports.deleteProductFromCart=(req,res)=>{
    const userId=parseInt(req.params.userId);
    const productId=parseInt(req.params.productId);
    fs.readFile("users.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).send("שגיאה בקריאת הקובץ");
        }
        let users=JSON.parse(data);
        let indexUser=users.findIndex(u=>u.id===userId);
        if(indexUser===-1){
            return res.status(404).send("משתמש לא נמצא");
        }
        users[indexUser].cart=users[indexUser].cart.filter(p=>Number(p.id)!==productId)
       
        fs.writeFile("users.json",JSON.stringify(users,null,2),(err)=>{
        if(err){
            return res.status(500).send("שגיאה בשמירת הנתונים");

        }
        res.send(users[indexUser].cart);
    });
    });
};
exports.addProductToCart=(req,res)=>{
    const userId=parseInt(req.params.id);
    const ProductToAdd=req.body;
    fs.readFile("users.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).send("שגיאה בקריאת הקובץ");
        }
        let users=JSON.parse(data);
        let user=users.find(u=>u.id===userId);
        if(!user){
            return res.status(404).send("משתמש לא נמצא");
        }
        if (!user.cart) {
            user.cart = [];
        }
        let findIndexProduct=user.cart.findIndex(p=>Number(p.id) === Number(ProductToAdd.id))
        if(findIndexProduct!=-1){
            user.cart[findIndexProduct].count++;
           
        }
        else{
            ProductToAdd.count=1;
            user.cart.push(ProductToAdd);
        }
        fs.writeFile("users.json",JSON.stringify(users,null,2),(err)=>{
        if(err){
            return res.status(500).send("שגיאה בשמירת הנתונים");

        }
        res.send(user.cart);
    });
    });
};

exports.deleteProductFromCart=(req,res)=>{
    const userId=parseInt(req.params.userId);
    const productId=parseInt(req.params.productId);
    fs.readFile("users.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).send("שגיאה בקריאת הקובץ");
        }
        let users=JSON.parse(data);
        let user=users.find(u=>u.id===userId);
        if(!user){
            return res.status(404).send("משתמש לא נמצא");
        }
        if (!user.cart) {
            user.cart = [];
        }
        user.cart=user.cart.filter(p=>Number(p.id)!==productId)
       
        fs.writeFile("users.json",JSON.stringify(users,null,2),(err)=>{
        if(err){
            return res.status(500).send("שגיאה בשמירת הנתונים");

        }
        // res.send("המוצר נוסף בהצלחה");
        res.send(user.cart);
    });
    });
};
exports.del1ProductToCart=(req,res)=>{
    const userId=parseInt(req.params.id);
    const ProductToAdd=req.body;
    fs.readFile("users.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).send("שגיאה בקריאת הקובץ");
        }
        let users=JSON.parse(data);
        let user=users.find(u=>u.id===userId);
        if(!user){
            return res.status(404).send("משתמש לא נמצא");
        }
        let findIndexProduct=user.cart.findIndex(p=>Number(p.id) === Number(ProductToAdd.id))
        if(findIndexProduct!=-1){
            user.cart[findIndexProduct].count--;
           
            if(user.cart[findIndexProduct].count<=0)
            {
                user.cart.splice(findIndexProduct, 1);
            }
        }
        else{
            ProductToAdd.count=1;
            user.cart.push(ProductToAdd);
        }
        fs.writeFile("users.json",JSON.stringify(users,null,2),(err)=>{
        if(err){
            return res.status(500).send("שגיאה בשמירת הנתונים");

        }
        // res.send("הכמות הופחתה  בהצלחה");
        res.send(user.cart);
    });
    });
};
exports.deleteCartUser = (req, res) => {
     const userId=req.params.id;
     console.log("req.params",req.params.id)
    fs.readFile("users.json","utf-8",(err,data)=>{
        if(err){
            return res.status(500).send("שגיאה בקריאת הקובץ");
        }
        let users=JSON.parse(data);
        // console.log(users)
        let user=users.find(u=>Number(u.id)===Number(userId));
        console.log("user",user)
        let userIdnex=users.findIndex(u=>u.id==userId);
        if(userIdnex==-1){
            return res.status(404).send("משתמש לא נמצא");
        }
        // const lengthCart = user.cart.length;
        user["cart"]=[]
        console.log(user)
        users[userIdnex]=user
        fs.writeFile("users.json",JSON.stringify(users,null,2),(err)=>{
        if(err){
            return res.status(500).send("שגיאה בשמירת הנתונים");
        }
        // res.send("עגלה נמחקה בהצלחה");
        res.json(user.cart)
    });
    });

}
exports.getCartById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;
            data = JSON.parse(data);
            let user = data.find(st => st.id == id)
            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.send(user.cart);
            }
        }
    })
}

//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
