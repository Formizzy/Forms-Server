const express = require("express")
const bodyParser = require("body-parser")
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const uploadStorage = multer({storage: storage})
const app = express()

const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("my api World!")
})

app.post("/test/:formId", async (req, res) => { 
    console.log({"params":req.params.formId,"body":req.body});
    var fetch_res = await fetch(`https://ipapi.co/${req.ip.split(":").pop()}/json/`);
    var fetch_data = await fetch_res.json()

    res.send({ "params": req.params.formId, "body": req.body,"clientIp":req.ip.split(":").pop(),"locationInfo":fetch_data})
    // res.redirect("http://127.0.0.1:5500/landing.html")
})


app.post('/upload/single', uploadStorage.single("file"), function(req, res, next){
    console.log("req:", req.file.fieldname)
    console.log("req ni body: ", JSON.stringify(req.body))
    console.log(req.file)
    return res.send("Signle file uploaded")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})