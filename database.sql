/*Script utilizado para criar o bando de dados MYSQL*/
CREATE DATABASE fuzzy_trader;

USE fuzzy_trader;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
flush privileges;

create table investments(
id int not null primary key auto_increment,
symbol varchar(100),
last float,
low float,
high float,
invested float,
usd_invested float,
date_created timestamp default current_timestamp);