
// const fs = require('fs');

// function get(req, res) {
//     fs.readFile("cart.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             res.send(JSON.parse(data));
//         }

//     })
// }
// //אפשרות ראשונה ליצא פונקציה מדף
// exports.getById = (req, res) => {

//     fs.readFile("cart.json", "utf-8", (err, data) => {
//         if (err) {
//             res.status(500).send("error read file student ")
//         } else {
//             let id = req.params.id;

//             data = JSON.parse(data);
//             let cart = data.find(st => st.id == id)

//             if (cart == undefined) {
//                 res.status(500).send("not found student by tz " + id);
//             } else {
//                 res.send(cart);
//             }

//         }


//     })
// }


// exports.post = (req, res) => {

//     fs.readFile("cart.json", "utf-8", (err, data) => {
//         //המרה של טקסט למערך
//         let cart = JSON.parse(data);
//         //body =  לתוכן שנשלח בפונקציה פןסט 
//         cart.push(req.body);
//         fs.writeFile("cart.json", JSON.stringify(cart), (err) => {
//             if (err) {
//                 res.status(500).send("error  in add cart ");
//             } else {
//                 res.send("sucess add cart");
//             }
//         })
//     })
// }
// //פונקציה להוספת מוצר לעגלה

// // const fs = require("fs");
// // const filePath = "carts.json";

// // exports.addToCart = (req, res) => {
// //     const { userId, product } = req.body;

// //     if (!userId || !product) {
// //         return res.status(400).send("Missing userId or product");
// //     }

// //     fs.readFile(filePath, "utf-8", (err, data) => {
// //         if (err) return res.status(500).send("Error reading cart data");

// //         let carts = [];
// //         try {
// //             carts = JSON.parse(data);
// //         } catch (e) {
// //             return res.status(500).send("Invalid JSON format");
// //         }

// //         let userCart = carts.find(c => c.id == userId);

// //         if (userCart) {
// //             // אם כבר יש מוצר כזה – נעדכן רק את הכמות
// //             const existing = userCart.cart.find(p => p.id === product.id);
// //             if (existing) {
// //                 existing.qty += product.qty || 1;
// //             } else {
// //                 userCart.cart.push(product);
// //             }
// //         } else {
// //             carts.push({
// //                 id: userId,
// //                 cart: [product]
// //             });
// //         }

// //         fs.writeFile(filePath, JSON.stringify(carts, null, 2), (err) => {
// //             if (err) return res.status(500).send("Error saving cart data");

// //             res.send({ message: "Cart updated successfully", carts });
// //         });
// //     });
// // };

// // exports.addToCart = (req, res) => {
// //     const { userId, product } = req.body;

// //     if (!userId || !product) {
// //         return res.status(400).send("Missing userId or product");
// //     }

// //     fs.readFile(filePath, "utf-8", (err, data) => {
// //         if (err) return res.status(500).send("Error reading cart data");

// //         let carts = [];
// //         try {
// //             carts = JSON.parse(data);
// //         } catch (e) {
// //             return res.status(500).send("Invalid JSON format");
// //         }

// //         // סינון אובייקטים ריקים
// //         carts = carts.filter(c => Object.keys(c).length > 0);

// //         let userCart = carts.find(c => String(c.id) === String(userId));

// //         if (userCart) {
// //             const existing = userCart.cart.find(p => p.id === product.id);
// //             if (existing) {
// //                 existing.qty += product.qty || 1;
// //             } else {
// //                 userCart.cart.push({ ...product, qty: product.qty || 1 });
// //             }
// //         } else {
// //             carts.push({
// //                 id: userId,
// //                 cart: [{ ...product, qty: product.qty || 1 }]
// //             });
// //         }

// //         fs.writeFile(filePath, JSON.stringify(carts, null, 2), (err) => {
// //             if (err) return res.status(500).send("Error saving cart data");

// //             res.send({ message: "Cart updated successfully", carts });
// //         });
// //     });
// // };
// const fs = require('fs');
// const filePath = './carts.json'; // נתיב לקובץ JSON של העגלות

// exports.addToCart = (req, res) => {
//   const { userId, product } = req.body;

//   if (!userId || !product) {
//     return res.status(400).send("Missing userId or product");
//   }

//   fs.readFile(filePath, "utf-8", (err, data) => {
//     if (err) return res.status(500).send("Error reading cart data");

//     let carts = [];
//     try {
//       carts = JSON.parse(data);
//     } catch (e) {
//       return res.status(500).send("Invalid JSON format");
//     }

//     // סינון אובייקטים ריקים (אם יש)
//     carts = carts.filter(c => Object.keys(c).length > 0);

//     let userCart = carts.find(c => String(c.id) === String(userId));

//     if (userCart) {
//       const existing = userCart.cart.find(p => p.id === product.id);
//       if (existing) {
//         existing.qty += product.qty || 1;
//       } else {
//         userCart.cart.push({ ...product, qty: product.qty || 1 });
//       }
//     } else {
//       carts.push({
//         id: userId,
//         cart: [{ ...product, qty: product.qty || 1 }]
//       });
//     }

//     fs.writeFile(filePath, JSON.stringify(carts, null, 2), (err) => {
//       if (err) return res.status(500).send("Error saving cart data");

//       res.send({ message: "Cart updated successfully", carts });
//     });
//   });
// };




// //אפשרות שניה ליצא פונקציה מדף
// exports.get = get;
