//MongoDB requires not just an ID as an ID object 
//ObjectID, not as a string 
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  //to read a node of particular id - findOne function
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;//grab id from URL parameters
     const details = { '_id' : new ObjectID(id) };
       db.collection('notes').findOne(details, (err, item) => {
         if(err){
           res.send({'error':'An error has occured'});
         }
         else{
           res.send(item);
         }
       });
  }); 

  //to create a note - insert function
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

//to delete a node of particular id - remove function
//similar to GET but use delete and remove 
//instead of GET and findOne 

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;//grab id from URL parameters
     const details = { '_id' : new ObjectID(id) };
       db.collection('notes').remove(details, (err, item) => {
         if(err){
           res.send({'error':'An error has occured'});
         }
         else{
           res.send('Note '+ id +' deleted');
         }
       });
  }); 

//update operation - PUT and update
//Imperfection - If we fail to give a title or body, the field will be nullified
//pending work - 
//add some conditional logic to update the fields only if they’re present in the request
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};

