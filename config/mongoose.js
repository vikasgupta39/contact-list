// require libraries
const mongoose=require('mongoose');

// connect the database
mongoose.connect('mongodb://localhost/contact_list_db');
const db=mongoose.connection;
// error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running 
db.once('open',function(){
    console.log('Successfully connected to db');
})