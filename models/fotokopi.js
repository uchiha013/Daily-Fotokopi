const mongoose = require('mongoose');
const schema = mongoose.Schema
    
const fotokopiSchema = new schema({
            namafotokopi: {
                type: String
            },
            alamat: {
                type: String
            },
            whatsapp: {
                type: String
            },
            fasilitas: {
                type: Array
            },
            img:
            {
                data: Buffer,
                contentType: String
            }
        },{
            timestamps: true,
        })

const Fotokopi = mongoose.model('Fotokopi', fotokopiSchema)

module.exports = Fotokopi