create schema if not exists alertrackSolution;

create table if not exists alertracksolution.employee (
id int unsigned not null auto_increment,
primary key (id),
cpf varchar(15) not null unique,
name varchar(100) not null,
born_at int not null,
occupation varchar(100) not null);

create table if not exists alertracksolution.address (
id int unsigned not null auto_increment,
zipcode int not null,
complement varchar(100) not null,
number int not null,
address_id int unsigned not null,
primary key (id),
foreign key (address_id) references employee(id));

create table if not exists alertracksolution.companies (
id int unsigned not null auto_increment,
companies_id int unsigned not null,
cnpj varchar(50) not null,
name Varchar(50) not null,
primary key(id),
foreign key (companies_id) references employee(id));

create table if not exists alertracksolution.phones (
id int unsigned not null auto_increment,
phones_id int unsigned not null,
phone1 varchar(13) not null,
phone2 varchar(13),
phone3 varchar(13),
primary key(id),
foreign key(phones_id) references employee(id));