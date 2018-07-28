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
        let sql = `SELECT * FROM products WHERE id=${id}`;
        con.query(sql, (err,rows) => {
            if(err)
                throw err;
            else
                callback(rows[0]);
        });
    }
};

productRepo.findByCategoryId = (id_category, callback) => {
    if(con){
        let sql = `SELECT * FROM products p WHERE p.id_category=${id_category}`;
        con.query(sql, (err,rows)=> {
            if(err)
                throw err;
            else
                callback(rows);
        });
    }
};

productRepo.findByNameLike = (term, callback) => {
    if(con){
        let sql = `SELECT * FROM products p WHERE p.name like ?`;
        con.query(sql, term + '%', (err,rows) => {
            if(err)
                throw err;
            else
                callback(rows);
        });
    }
};

module.exports = productRepo;