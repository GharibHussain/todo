drop database if exists todo;

create database todo;

use todo;

create table task(
    id primary key auto_increment,
    description varchar(255) not null
);

insert into task(description) values ('My test task...');
insert into task(description) values ('Another test task...');