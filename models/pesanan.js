const mongoose = require('mongoose');
const schema = mongoose.Schema
    
const pesananSchema = new schema({
            namapemesan: {
                type: String
            },
            namafotokopi: {
                type: String
            },
            layanan: {
                type: String
            },
            namafile: {
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