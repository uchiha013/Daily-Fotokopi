const Pesanan = require("../models/pesanan")
const axios = require('axios')
const { google } = require("googleapis");
const stream = require("stream");
const path = require("path");

const KEYFILEPATH = path.join(__dirname, "pk.json");;

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["1I3NePtd-pkyCMfWwDgP-giJaGPwiUx0D"],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
};

const uploadFileBuktiPembayaran = async (fileObject2) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject2.buffer);
    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject2.mimeType,
            body: bufferStream,
        },
        requestBody: {
            name: fileObject2.originalname,
            parents: ["1pxmbQmx-GS8gzfSE5oi4szKCe5R32SOW"],
        },
        fields: "id,name",
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
};


//Menampilkan List Pesanan
const index = (req, res, next) => {
    Pesanan.find()
    .then((data, err)=>{
        if(err){
            console.log(err);
        }
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({ message: err})
    })
}

const show = (req, res, next) => {
    const OrderId = req.query.id;

    Pesanan.findById(OrderId)
    .then(response =>{
        res.send(response)
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}



const store = async (req, res) =>{

    let pesanan = new Pesanan({
        namafotokopi: req.body.namafotokopi,
        namapemesan: req.body.namapemesan,
        layanan: req.body.layanan,
        noAntrian: req.body.noAntrian,
        status: req.body.status
    })
    try {

    console.log(req.body);
    console.log(req.files);
    // console.log(req.body.files.name);
    const { body, files, filesbuktipembayaran } = req;

    for (let f = 0; f < req.files.length; f += 1) {
        await uploadFile(files[f]);
        console.log("the file it's work")
    }

    // uploadFileBuktiPembayaran(filesbuktipembayaran);
    pesanan.save()
    .then(response => {   
            res.status(200).send("pesanan berhasil ditambahkan");
            console.log("the database pesanan it's work")
    })
    .catch(error =>{
        res.json({
            message: error
        })
    })
    } catch (f) {
        res.send(f.message);
        console.log(f)
    } 
}

const update = (req, res, next) =>{
    let orderId = req.body.OrderId

    let updateOrder = {
        namapemesan: req.body.namapemesan,
        namafotokopi: req.body.namafotokopi,
        layanan: req.body.layanan,
        jenisfile: req.body.jenisfile,
        buktifotopembayaran: req.body.buktifotopembayaran,
        noAntrian: req.body.noAntrian,
        status: req.body.status
    }
    Pesanan.findByIdAndUpdate(orderId, {$set: updateOrder})
    .then(response => {
        res.json({
            massage: 'Pesanan updated Successfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}

const destroy = (req, res, next) =>{
    let orderId = req.body.OrderId

    Pesanan.findIdandRemove(orderId, {$set: updateOrder})
    .then(response => {
        res.json({
            massage: 'Pesanan deleted Successfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}




module.exports ={
    index,show,store,update,destroy
}

