CREATE TABLE owner
(
	id serial PRIMARY KEY,
	name varchar(20),
	email varchar(30),
	password varchar(12)
);

CREATE TABLE sensor
(
	id varchar(10) PRIMARY KEY,
	owner_id integer,
	name varchar(20),
	CONSTRAINT fk_owner
    	FOREIGN KEY(owner_id) 
    		REFERENCES owner(id)
);

CREATE TABLE consumption
(
	id SERIAL PRIMARY KEY,
    value numeric,
    sensor_id varchar(10),
    date timestamp without time zone,
	CONSTRAINT fk_sensor
    	FOREIGN KEY(sensor_id) 
    		REFERENCES sensor(id)
);
