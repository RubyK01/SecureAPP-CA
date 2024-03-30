-- Made by Ruby
DROP DATABASE IF EXISTS `reqqit`;

create database if not exists`reqqit` default character set utf8 collate utf8_general_ci;

use reqqit;

create table customer(
customerID int not null primary key auto_increment,
fName varchar(255) not null,
lName varchar(255) not null,
userName varchar(255) not null,
email varchar(255) not null,
pass_word varchar(255) not null
);

create table address(
addressline1 varchar(255) not null,
addressline2 varchar(255),
townOrCity varchar(255) not null,
county varchar(255) not null,
zipCode varchar(255),
customerID int not null,
foreign key (customerID) references customer(customerID) on delete cascade 
);

create table products(
productID int not null primary key auto_increment,
productName varchar(255) not null,
price double not null,
customerID int not null,
foreign key (customerID) references customer(customerID) on delete cascade 
);

create table productIMG(
image varchar(800) not null,
productID int not null auto_increment primary key,
customerID int not null,
foreign key (customerID) references customer(customerID) on delete cascade 
);

create table reciepts(
orderDate date,
orderID int not null primary key,
price double,
productID int not null,
customerID int not null,
foreign key (productID) references products(productID) on delete cascade,
foreign key (customerID) references customer(customerID) on delete cascade 
);

create table payment(
cardNum int,
fName varchar(255) not null,
lName varchar(255) not null,
secruityNum int,
expiray varchar(255) not null,
customerID int not null,
foreign key (customerID) references customer(customerID) on delete cascade
);

create table recProducts(
productID int not null primary key auto_increment,
productName varchar(255) not null,
price double not null,
productType varchar(255) not null,
productUse varchar(255) not null
);

-- customer table insert
-- Jcena password is password1 
insert into customer(fName, Lname, userName, email, pass_word) values ("John","Cena","Jcena","johnc@email.com","$2a$05$yvHo6wr5kC4FqQKvGEXqF.RUIw0sO3NtuZHNzNDz1TSAjypDhvzuS");

-- recProducts insert
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12345', "Lenovo 250GB SSD 8GB Memory", '200', "Laptop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12346', "Dell 500GB SSD 16GB Memory", '400', "Laptop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12347', "Alienware 500GB SSD 32GB Memory 250GB HDD", '800', "Laptop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12348', "Dell 250GB HDD 4GB Memory", '200', "Laptop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12349', "Asus 500GB SSD 8GB Memory", '200', "Laptop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12350', "HP 250GB SSD 16GB Memory", '200', "Laptop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12351', "Lenovo 250GB SSD 8GB Memory", '400', "Laptop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12352', "Dell 500GB SSD 16GB Memory", '800', "Laptop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12353', "Alienware 500GB SSD 32GB Memory 250GB HDD", '800', "Laptop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12354', "Dell 250GB HDD 4GB Memory", '400', "Laptop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12355', "Asus 500GB SSD 8GB Memory", '400', "Laptop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12356', "HP 250GB SSD 16GB Memory", '400', "Laptop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12357', "Lenovo 250GB SSD 8GB Memory", '800', "Laptop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12358', "Dell 500GB SSD 16GB Memory", '800', "Laptop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12359', "Alienware 500GB SSD 32GB Memory 250GB HDD", '800', "Laptop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12360', "Dell 250GB HDD 64GB Memory", '800', "Laptop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12361', "Asus 500GB SSD 8GB Memory 500GB HDD", '800', "Laptop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12362', "HP 1TB SSD 64GB Memory", '800', "Laptop", "games");

-- insert into recProducts(productID, productName, price, productType, productUse) values ('12363', "Lenovo 250GB SSD 8GB Memory", '200', "Desktop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12364', "Dell 500GB SSD 16GB Memory", '400', "Desktop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12365', "Alienware 500GB SSD 32GB Memory 250GB HDD", '800', "Desktop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12366', "Dell 250GB HDD 4GB Memory", '200', "Desktop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12367', "Asus 500GB SSD 8GB Memory", '200', "Desktop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12368', "HP 250GB SSD 16GB Memory", '200', "Desktop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12369', "Lenovo 250GB SSD 8GB Memory", '400', "Desktop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12370', "Dell 500GB SSD 16GB Memory", '800', "Desktop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12371', "Alienware 500GB SSD 32GB Memory 250GB HDD", '800', "Desktop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12372', "Dell 250GB HDD 4GB Memory", '400', "Desktop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12373', "Asus 500GB SSD 8GB Memory", '400', "Desktop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12374', "HP 250GB SSD 16GB Memory", '400', "Desktop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12375', "Lenovo 250GB SSD 8GB Memory", '800', "Desktop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12376', "Dell 500GB SSD 16GB Memory", '800', "Desktop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12377', "Alienware 500GB SSD 32GB Memory 250GB HDD", '800', "Desktop", "games");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12378', "Dell 250GB HDD 64GB Memory", '800', "Desktop", "casual");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12379', "Asus 500GB SSD 8GB Memory 500GB HDD", '800', "Laptop", "work");
-- insert into recProducts(productID, productName, price, productType, productUse) values ('12380', "MINECRAFT ELITE DESKTOP PC AMD Ryzen 5 3600 8GB DDR4 2666MHz 4GB GTX 1650 256GB SSD", '800', "Desktop", "games");