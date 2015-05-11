/**
 * Created by mayszaks on 5/6/15.
 */
var mongoose = require( 'mongoose' ),
    dbURI = 'mongodb://localhost/logit';
mongoose.connect(dbURI);

var categorySchema = new mongoose.Schema({
    display: String,
    index: [Number]
});
mongoose.model('category', categorySchema, 'categories');
var userSchema = new mongoose.Schema({
    name: String,
    created: Date,
    categories: [categorySchema]
});
mongoose.model('user', userSchema);
var accountSchema = new mongoose.Schema({
    users: [userSchema],
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