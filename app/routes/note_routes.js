var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.post('/notes/:id', (req, res) => {
    //create note from post
    const note = { text: req.body.body, title: req.body.title };
    //creat db collection named notes 
    db.collection('notes').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
