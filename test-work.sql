create table managers (
	id serial primary key,
	name varchar(80)
);

create table regions (
	region varchar(80) primary key
);

create table trailers_length (
	length varchar(5) primary key
);

create table work_experience (
	experience varchar(20) primary key
);

create table sources (
	source varchar(100) primary key
);

create table managers_convoy (
	id serial primary key,
	name varchar(80)
);

create table medical_inspections (
	medical varchar(30) primary key
);

create table candidates (
	name varchar(80),
	manager_id integer references managers (id),
	phone varchar(20) unique,
	date varchar(10),
	age integer,
	region_id varchar(80) references regions (region),
	trailer_length_id varchar(5) references trailers_length (length),
	experience_id varchar(20) references work_experience (experience),
	source_id varchar(100) references sources (source),
	refer varchar(80),
	security varchar(80),
	convoy_id integer references managers_convoy (id),
	medical_id varchar(30) references medical_inspections (medical),
	comment text
);


insert into managers (name) values
	('Яковлев'),
	('Иванов'),
	('Кузнецов'),
	('Соколов'),
	('Попов');

insert into regions values
	('Бурятия'),
	('Дагестан'),
	('Иркутская обл'),
	('Киргизия'),
	('Магнитогорск');
	
insert into trailers_length values
	('13'),
	('16'),
	('13+16'),
	('24'),
	('17');
	
insert into work_experience values
	('до 1 года'),
	('от 1 года до 3 лет'),
	('от 3 лет');
	
	
insert into sources values
	('авито звонок'),
	('турбо'),
	('фуры'),
	('акция'),
	('бывший сотрудник');
	
insert into managers_convoy (name) values
	('Мхитарян'),
	('Назаров'),
	('Анисимов'),
	('Шарафеев');
	
insert into medical_inspections values
	('Есть'),
	('Нет'),
	('Нет, готов пройти');
