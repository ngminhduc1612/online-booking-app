import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
    },
    roomid:{
        type: String,
        required:true,
    },
    roomNumbers:[{ number:Number, unavailableDates:{type:[Date]} }],
},
{ timestamps : true }
);

export default mongoose.model("Order", OrderSchema)