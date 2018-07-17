//Dependencies
const mysql = require('mysql');


//Settings
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'db_clothes'
});

//Exports Repository

let productRepo = {};

productRepo.findAll = callback => {
    if(con){
        let sql = 'SELECT * FROM products';
        con.query(sql,(err,rows) => {
            if(err)
                throw err;
            else
                callback(rows);
        });
    }
};

productRepo.findById = (id,callback) => {
    if(con){
        let sql = `SELECT * FROM products WHERE id=${id} LIMIT 1`;
        con.query(sql, (err,rows) => {
            if(err)
                throw err;
            else
                callback(rows[0]);
        });
    }
}

module.exports = productRepo;