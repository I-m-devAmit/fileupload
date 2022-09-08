const express = require('express');
const multer = require('multer');
const upload = require("express-fileupload");
const bodyParser = require('body-parser');
const util = require('util');
 let port = 5000;

let app = express();

app.use(upload());

app.set('view engine', "ejs");

app.get('/' , (req,res) => {
    res.render("upload");
});



var arrayFile = [
    {
        "name":"",
        "category": ""
    }
]


app.post('/upload', async (req,res) => {

    try{
        if(req.files){
            console.log("files: ",req.body);
            const result = arrayFile.find((ele) => {
                return ele.name == req.files.image.name && ele.category == req.body.category;
            })
            console.log("arrayFile: " , arrayFile)
            if(result){
                console.log(result);
                res.status(500).send({
                    error: "File already exists",
                    status: false
                });
            }else{
                arrayFile.push({
                    name: req.files.image.name,
                    category: req.body.category
                })
        const moveFile = await  util.promisify(req.files.image.mv)(`./images/${req.body.category}/ ` + req.files.image.name );
        res.status(200).send({
            message: "File uploaded",
            status: true

        })
    }}}
    catch(error){
        res.send(error);

    }
    

})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
