var mongoose = require('mongoose')
var Schema = mongoose.Schema

var orderItemSchema = new Schema({
    productDescription: {type: String},
    itemStatus: {type: String},
    hsnCode: {type: Number},
    size: {type: String},
    discount: {type: Number},
    quantity: {type: Number},
    amount: {type: Number},
    taxableAmount: {type: Number},
    cgstRate: {type: Number},
    cgstAmount: {type: Number},
    sgstRate: {type: Number},
    sgstAmount: {type: Number},
    igstRate: {type: Number},
    igstAmount: {type: Number},
    totalAmount: {type: Number},
    fulfilledDate: {type: Date},
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'orderModel'},
    invoice: {type: mongoose.Schema.Types.ObjectId, ref: 'invoiceModel'},
})

orderItemSchema.pre('remove', function (callback) {
    this.model('invoiceModel').updateOne({orderItems: {"$in": [this._id]}}, {$pull: {orderItems: {_id: this._id}}}, callback)
    this.model('orderModel').updateOne({orderItems: {"$in": [this._id]}}, {$pull: {orderItems: {_id: this._id}}}, callback)
});


var orderItemModel = mongoose.model('orderItemModel', orderItemSchema)
module.exports = orderItemModel