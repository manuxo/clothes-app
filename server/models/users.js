//Dependencies
const mysql = require('mysql');

const con = mysql.createConnection({
    user: 'root',
    password: 'admin',
    host: 'localhost',
    database: 'db_clothes'
});

module.exports = {
    findAll: (callback) => {
        if(con){
            let sql = 'SELECT * FROM users';
            con.query(sql, (err,rows) => {
                if(err)
                    throw err;
                else
                    callback(rows);
            });
        }
    },
    findById: (id, callback) => {
        if(con){
            let sql = `SELECT * FROM users WHERE id=${id}`;
            con.query(sql, (err,rows) => {
                if(err)
                    throw err;
                else
                    callback(rows[0]);
            });
        }
    },
    findByEmail: (email, callback) => {
        if(con){
            let sql = `SELECT * FROM users WHERE email=${con.escape(email)}`;
            con.query(sql, (err,rows) => {
                if(err)
                    throw err;
                else
                    callback(rows);
            });
        }
    },
    save: (userData, callback) => {
        if(con){
            let sql = 'INSERT INTO users SET ?';
            con.query(sql,userData, (err,results) => {
                if(err)
                    throw err;
                else
                    callback(results);
            });
        }
    }
}