// require libraries
const mongoose=require('mongoose');

// connect the database
mongoose.connect('mongodb://0.0.0.0:27017/contact_list_db');
const db=mongoose.connection;
// error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running 
db.once('open',function(){
    console.log('Successfully connected to db');
})