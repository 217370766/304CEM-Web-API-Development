var Userdb = require('../model/model');
var pddb = require('../model/pdmodel');


exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Can not be empty!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            // console.log(user);
            res.redirect('/admin');
        })
        
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}





exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}


exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)

            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
        
}


exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Deleted successfully!"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}



//product----

exports.pdcreate = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Can not be emtpy!"});
        return;
    }

    // new user
    const user = new pddb({
        title : req.body.title,
        description : req.body.description,
        price : req.body.price,
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            // console.log(user);
            res.redirect('/shop');
        })
        
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}



exports.pdupdate = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Can not be empty"})
    }

    const id = req.params.id;
    pddb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
        
}




exports.pdfind = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        pddb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        pddb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

exports.pddelete = (req, res)=>{
    const id = req.params.id;

    pddb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Successfully!"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
    }