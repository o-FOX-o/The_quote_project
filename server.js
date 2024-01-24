const express = require("express");
const port = process.env.PORT || 3000;
const apiRouter = require("./route/apiRoute");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// app.get('/',(req,res) =>{
//     fs.readFile('./HTML/index.html','utf-8',(err,data) => {
//         if (err){
//             console.log("Error reading file");
//             res.status(500).send('Error reading the file');
//         }else {
//             res.send(data);
//             console.log('Main html page was loaded');
//         }
//     })
// })

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`The quotes project Server has started on port:${port}`);
});
