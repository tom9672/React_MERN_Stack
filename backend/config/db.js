import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`MongoDB successfully connected, ${conn.connection.host}}`.cyan)
    } catch (error) {
        console.log(`ERRPR: ${error.message}`.red)
    }
}

export default connectDB