const Pesanan = require("../models/pesanan")
const axios = require('axios')

//Menampilkan List Pesanan
const index = (req, res, next) => {
     Pesanan.find()
     .then(response =>{
        res.json({
            response
        })
     })
     .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
     })
}

const show = (req, res, next) => {
    let OrderId = req.body.OrderId

    Pesanan.findById(OrderId)
    .then(response =>{
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error occured!'
        })
    })
}
const store = (req, res, next) =>{

 let pesanan = new Pesanan({
     layanan: req.body.layanan,
     jenisfile: req.body.jenisfile,
     buktifotopembayaran: req.body.buktifotopembayaran,
     noAntrian: req.body.noAntrian,
     status: req.body.status
 })
 pesanan.save()
 .then(response => {
     res.json({
         massage: 'Pesanan Added Successfully'
     })
 })
 .catch(error =>{
     res.json({
         message: 'An error occured!'
     })
 })
}

const update = (req, res, next) =>{
    let orderId = req.body.OrderId

    let updateOrder = {
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

const daftarFotokopi = (req, res, next) => {
    let daftarFotokopi = new Fotokopi ({
        layanan: req.body.layanan,
        whatsapp: req.body.jenisfile,
        fasilitas: req.body.buktifotopembayaran,
        status: "not finished yet",
    })
    daftarFotokopi.save()
    .then(daftarFotokopi => {
        res.json({
            massage: 'fotokopi Added Successfully'
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

// const autoIncrementModelID = require('./counterModel');

// const myModel = new Schema({
//   id: { type: Number, unique: true, min: 1 },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date },
//   someOtherField: { type: String }
// });

// myModel.pre('save', function (next) {
//   if (!this.isNew) {
//     next();
//     return;
//   }

//   autoIncrementModelID('activities', this, next);
// });
