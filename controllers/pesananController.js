const Pesanan = require("../models/pesanan")
const axios = require('axios')

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
const store = (req, res, next) =>{

 let pesanan = new Pesanan({
     namafotokopi: req.body.namafotokopi,
     namapemesan: req.body.namapemesan,
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

