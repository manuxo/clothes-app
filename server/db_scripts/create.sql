#user: root
#passw: admin
#script:

CREATE SCHEMA db_clothes;

use db_clothes;

CREATE TABLE users(
	id int primary key auto_increment,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    passw varchar(100) not null,
    created datetime not null
);

CREATE TABLE sales(
	id int primary key auto_increment,
    created datetime not null
);

CREATE TABLE payment_methods(
	id int primary key auto_increment,
    name varchar(45) not null
);

CREATE TABLE tickets(
	id int primary key auto_increment,
    total double not null,
    subtotal double not null,
    tax double not null
);

CREATE TABLE ticket_details(
	id int primary key auto_increment,
    quantity int not null,
    amount double not null
);

CREATE TABLE products(
	id int primary key auto_increment,
    image varchar(100) not null,
    name varchar(45) not null,
    description text not null,
    price double not null,
    brand varchar(45) not null
);

CREATE TABLE categories(
	id int primary key auto_increment,
    name varchar(45) not null
);

CREATE TABLE favorites(
	id int primary key auto_increment
);

/*FOREIGN KEYS*/

ALTER TABLE favorites ADD id_product int not null;
ALTER TABLE favorites ADD CONSTRAINT FK_Product
FOREIGN KEY(id_product) REFERENCES products(id);

ALTER TABLE favorites ADD id_user int not null;
ALTER TABLE favorites ADD CONSTRAINT FK_User
FOREIGN KEY(id_user) REFERENCES users(id);

ALTER TABLE products ADD id_category int not null;
ALTER TABLE products ADD CONSTRAINT FK_Category
FOREIGN KEY(id_category) REFERENCES categories(id);

ALTER TABLE ticket_details ADD id_ticket int not null;
ALTER TABLE ticket_details ADD CONSTRAINT FK_Ticket
FOREiGN KEY(id_ticket) REFERENCES tickets(id);

ALTER TABLE ticket_details ADD id_product int not null;
ALTER TABLE ticket_details ADD CONSTRAINT FK_TDProduct
FOREIGN KEY(id_product) REFERENCES products(id);

ALTER TABLE sales ADD id_payment int not null;
ALTER TABLE sales ADD CONSTRAINT FK_Payment
FOREIGN KEY(id_payment) REFERENCES payment_methods(id);

ALTER TABLE sales ADD id_ticket int not null;
ALTER TABLE sales ADD CONSTRAINT FK_STicket
FOREIGN KEY(id_ticket) REFERENCES tickets(id);

ALTER TABLE sales ADD id_user int not null;
ALTER TABLE sales ADD CONSTRAINT FK_SUser
FOREIGN KEY(id_user) REFERENCES users(id);

