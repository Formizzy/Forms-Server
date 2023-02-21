const express = require('express');
const formidable = require('formidable');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res, next) => {
    let form = formidable();
    form.parse(req)
    form.on('fileBegin', function (formname, file){
        // here changing file.filepath is somehow uploading it to local server
        // but the deal is we can use formname to know the name from form field
        // and using it we can upload file as per our requirement
        file.filepath = __dirname + "/uploads/" + file.originalFilename;
    });

    res.sendFile(__dirname + "/index.html")
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000 ...');
});