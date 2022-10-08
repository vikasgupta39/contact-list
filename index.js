const express = require('express');
const { request } = require('https');
const path= require('path');
const port = process.env.PORT || 8000;

const db=require('./config/mongoose');
const Contact= require('./models/contact');

const app= express();

app.set('view engine', 'ejs');
app.set('viess',path.join(__dirname,'views'));
 app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList= [
     {
        name:"Eren Jaeger",
        phone:"1234567890"
     },
     {
        name:"Naruto Uzumaki",
        phone:"1234567899"
     },
     {
        name:"Monkey D Luffy",
        phone:"1234567889"
     }
]

app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
         if(err){
            console.log('Error in fetching data');
            return;
         }
         return res.render('home',{
            title:"Contacts List",
            contact_list: contacts
        });
    });
    
    //  res.sendFile('/index.html');
});

app.get('/practice',function(req,res){
       return res.render('practice',{
        
       })
});
app.post('/create-contact',function(req,res){
    //   return res.redirect('/practice')
    //   console.log(req.body);
    //   console.log(req.body.name);
    //   console.log(req.body.phone);
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }, function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('***************',newContact);
        return res.redirect('/');
    });

    

});

app.get('/delete-contact',function(req,res){
      let id= req.query.id;
    //   let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    //   if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    //   }
    Contact.findByIdAndDelete(id,function(err){
          if(err){
            console.log("Error is there");
            return;
          }
          return res.redirect('back');
    });

      
});
app.listen(port,function(err){
    if(err)
    console.log("some error is there");
    else
    console.log("server is running at port: "+port);
})