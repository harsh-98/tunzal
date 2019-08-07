import mongoose from 'mongoose';

var TokenSchema = mongoose.Schema({
	token: {
		type: String,
		index:true,
		unique:true
	},
    refundInvoice:String,
    payInvoice:String,
	planAmount: {
		type: Number
    },
    useTime: { type : Number, default: 0 },
    createTime : { type : Date, default: Date.now },
    payTime : { type : Date, default: Date.now },
    revoked: { type : Boolean, default: true },
    revokeTime: { type : Date, default: Date.now }
});

export default mongoose.model('Token', TokenSchema);
