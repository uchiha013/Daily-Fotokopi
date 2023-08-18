const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI, mongooseconfig)
        console.log("Connect to MongoDB successfully")
    } catch (error) {
        console.log("Connect failed " + error.message )
    }
}

const mongooseconfig = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }

module.exports = connectDB