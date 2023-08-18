const axios = require('axios');


exports.fotokopiRoutes = (req, res) => {
    // Make a get request to /api/users
        axios.get('http://localhost:3000/fotokopi/api/fotokopi')
            .then(function(response){
                res.render('fotokopi',{fotokopi: response.data, islogin: req.session.loggedin});
            })
            .catch(err =>{
                res.send(err)
            })

}

exports.OrderRoutes = (req, res) => {
    // Make a get request to /api/users
        axios.get('http://localhost:3000/fotokopi/api/fotokopi')
        .then(function(response){
            res.render('order',{fotokopi: response.data, islogin: req.session.loggedin});
        })
        .catch(err =>{
            res.send(err)
        })

}