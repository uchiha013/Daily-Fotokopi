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

exports.IndexRoutes = (req, res) => {
    // Make a get request to /api/fotokopi
    axios.get('http://localhost:3000/fotokopi/api/fotokopi')
        .then(function(response){
            res.render('index',{fotokopi: response.data, islogin: req.session.loggedin});
        })
        .catch(err =>{
            res.send(err)
        })

}

exports.PesananRoutes = (req, res) => {
    // Make a get request to /api/pesanan
    axios.all([
        axios.get('http://localhost:3000/pesanan/api/pesanan'),
        axios.get('http://localhost:3000/fotokopi/api/fotokopi')
    ])
        .then(function(response){
            res.render('pesanan',{pesanan: response[0].data,fotokopi: response[1].data, islogin: req.session.loggedin});
        })
        .catch(err =>{
            res.send(err)
        })
}

exports.OrderRoutes = (req, res) => {
    // Make a get request to /api/order
    axios.all([
        axios.get('http://localhost:3000/fotokopi/show', { params : { id : req.query.id }}),
        axios.get('http://localhost:3000/pesanan/api/pesanan')
    ])
        .then(function(userdata){
            res.render('order',{fotokopi: userdata[0].data, pesanan: userdata[1].data, islogin: req.session.loggedin});
        })
        .catch(err =>{
            res.send(err)
        })

}