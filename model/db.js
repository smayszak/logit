/**
 * Created by mayszaks on 5/6/15.
 */
//dburi = 'mongodb://localhost/logit';
var dbURI = 'mongodb://172.31.33.60:27017/logit';
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: 'mongoguy',
  pass: 'grateful'
}


var mongoose = require( 'mongoose' );
mongoose.connect(dbURI, options);

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
    categoryId: mongoose.Schema.Types.ObjectId,
    memberId: mongoose.Schema.Types.ObjectId,
    accountId: mongoose.Schema.Types.ObjectId,
    category: String,
    member: String,
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