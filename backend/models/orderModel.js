import mongoose from 'mongoose'

const orderSchema =  mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
    orderItems:[{
        name:{type:String, required:true},
        qty:{type:Number, required:true},
        image:{type:String, required:true},
        product:{type: mongoose.Schema.Types.ObjectId, required: true, ref:'Product'},
    }],
    shippingAddress:{address:{type:String, required:true},
                    city:{type:String, required:true},
                    postCode:{type:String, required:true},
                    province:{type:String, required:true},},
    paymentMethod:{type:String, required:true},
    paymentResult:{id:{type:String},
                    status:{type:String},
                    update_time:{type:String},
                    wechat:{type:String}},
    isDelived:{type:Boolean, required:true, default: false},
    deliveredAt:{type:Date},
    ShippingPrice:{type:Number, required:true, default:0},
    totalPrice: {type:Number, required:true, default:0},
    isPaid:{type:Boolean, required:true, default:false},
    paidAt:{type:Date}
},{
    timestampes: true,
})

const Order = mongoose.model('Order', orderSchema)

export default Order