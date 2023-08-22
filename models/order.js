const mongoose = require('mongoose');
const schema = mongoose.Schema
    
const pesananSchema = new schema({
            namafotokopi: {
                type: String
            },
            namapemesan:{
                type: string
            },
            layanan: {
                type: String
            },
            jenisfile: {
                type: String
            },
            buktifotopembayaran: {
                type: String
            },
            noAntrian: {
                type: String
            },
            status: {
                type: String
            }
        },{
            timestamps: true,
})


const Pesanan = mongoose.model('Pesanan', pesananSchema)

module.exports = Pesanan