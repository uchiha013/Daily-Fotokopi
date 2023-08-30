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
    
    const { body, files, filesbuktipembayaran } = req;
    let pesanan = new Pesanan({
        namafotokopi: req.body.namafotokopi,
        namapemesan: req.body.namapemesan,
        layanan: req.body.layanan,
        namafile:  files[0].originalname,
        noAntrian: req.body.noAntrian,
        status: req.body.status
    })
    try {

    console.log(req.body);
    // console.log(files.originalname);
    // console.log(req.body.files.name);
    pesanan.save()
    .then(response => {   
            // res.status(200).send("pesanan berhasil ditambahkan");
            res.send({message:'pesanan berhasil silahkan untuk menunggu'});
            console.log("the database pesanan it's work")
    })
    .catch(error =>{
        console.log("the database pesanan it's work")
        res.send({message:error});
    })

    for (let f = 0; f < req.files.length; f += 1) {
        await uploadFile(files[f]);
        console.log("the file it's work")
    }

    // // uploadFileBuktiPembayaran(filesbuktipembayaran);
    } catch (f) {
        res.send(f.message);
        console.log(f)
    } 
}

const update = (req, res, next) =>{
    let updateOrder = {
        status: "Done"
    }
    Pesanan.findByIdAndUpdate(req.params.id, {$set: updateOrder})
    .then(response => {
        res.redirect("/pesanan")
    })
    .catch(error =>{
        res.json({
            message: error
        })
    })
}

const destroy = (req, res, next) =>{
    console.log(req.params.id)

    Pesanan.findByIdAndRemove(req.params.id)
    .then(response => {
        res.redirect("/pesanan")  
    })
    .catch(error =>{
        res.json({
            message: error
        })
    })
}


module.exports ={
    index,show,store,update,destroy
}

