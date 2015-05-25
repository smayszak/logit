/**
 * Created by mayszaks on 5/6/15.
 */
var mongoose = require( 'mongoose' ),
    dbURI = 'mongodb://localhost/logit';
mongoose.connect(dbURI);

var categorySchema = new mongoose.Schema({
    name: String
});
mongoose.model('category', categorySchema, 'categories');
var memberSchema = new mongoose.Schema({
    name: String,
    created: Date,
    defaultCategory: [categorySchema],
    categories: [categorySchema]
});
mongoose.model('member', memberSchema);
var accountSchema = new mongoose.Schema({
    members: [memberSchema],
    login: String,
    password: String
})
mongoose.model('account', accountSchema);

var transactionSchema =  new mongoose.Schema({
    category: mongoose.Schema.Types.ObjectId,
    owner: mongoose.Schema.Types.ObjectId,
    cost: Number,
    date: Date,
    comments: String,
    payment: String
});
mongoose.model('transaction', transactionSchema);

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});


mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});