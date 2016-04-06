var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/books",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["books"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "books" : rows});
            }
        });
    });

    router.get("/books/:id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["books","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "books" : rows});
            }
        });
    });

    router.post("/books",function(req,res){
        var query = "INSERT INTO ?? (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
        var table = ["books","sales","author","title","price","link","no",req.body.sales,req.body.author,req.body.title,req.body.price,req.body.link,req.body.no];
/*
	var query = "INSERT INTO ??(??) VALUES (?)";
        var table = ["books","title",req.body.title];
*/
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

/*    
	router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });
*/

    router.put("/books",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["books","title",req.body.title,"id",req.body.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated books "+req.body.title});
            }
        });
    });

    router.delete("/books/:id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["books","id",req.params.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted books "+req.params.id});
            }
        });
    });
}

module.exports = REST_ROUTER;
