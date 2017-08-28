module.exports = (app, users) =>
{
    // GET ALL USERS
    app.get('/users', (req,res) => {
      users.find((err, users)=>{

        if(err){
          return res.status(500).send({error: 'Something went wrong while pulling all users from db.'});
        }
        res.json(users);
      })
    });

    // GET SINGLE USER
    app.get('/users/:_id', (req, res) => {
        users.findOne({_id: req.params._id}, (err, user) => {
          if (err) {
            return res.status(500).json({error: err});
          }
          if (!user) {
            return res.status(404).json({error: 'undefined user'});
          }
          res.json(user);
        })

    });

    // CREATE USER
    app.post('/users', (req, res) => {
        let user = new users();
        user.name = req.body.name;

        user.save((err)=>{
          if(err){
            console.error(err);
            res.status(400);
            return;
          }
          res.status(201).json(user);
        });
    });

    // UPDATE USERS
    app.put('/users/:_id', (req, res) => {
      users.findById(req.params._id, (err, user) => {
        if (!user) {
          return res.status(404).json({ error: "Nothing found."});
        }
        if (err) {
          return res.status(500).json({ error: "Something went wrong!"});
        }

        if (req.body.name) {
          user.name = req.body.name;
        }

        user.save((err) => {
          if (err) {
            res.status(500).json({ error: "Failed to update" });
          }
          res.status(201).json({message: "Successfully updated the user"});
        })
      })
    });

    // DELETE USERS
    app.delete('/users/:_id', (req, res) => {
        users.remove({ _id: req.params._id }, (err, output) => {
          if (err) {
            return res.status(500).json({ error: "Something went wrong!" })
          }
          res.status(204).end();
        })
    });

}
