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

// const counterSchema = new schema(
//   {
//   _id: {type: String, required: true},
//   seq: { type: Number, default: 0 }
//   }
// );

// counterSchema.index({ _id: 1, seq: 1 }, { unique: true })

// const counterModel = mongoose.model('counter', counterSchema);

// const autoIncrementModelID = function (modelName, doc, next) {
//   counterModel.findByIdAndUpdate(        // ** Method call begins **
//     modelName,                           // The ID to find for in counters model
//     { $inc: { seq: 1 } },                // The update
//     { new: true, upsert: true },         // The options
//     function(error, counter) {           // The callback
//       if(error) return next(error);

//       doc.id = counter.seq;
//       next();
//     }
//   );                                     // ** Method call ends **
// }

// module.exports = autoIncrementModelID;

const Pesanan = mongoose.model('Pesanan', pesananSchema)

module.exports = Pesanan