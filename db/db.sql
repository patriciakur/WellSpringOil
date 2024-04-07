CREATE DATABASE fuelquote;

CREATE TABLE usercredentials (
    id BIGSERIAL NOT NULL,
    name  VARCHAR(50) NOT NULL, 
    password BYTEA NOT NULL
);

-- Command to create new database and table

CREATE TABLE clientInfo (
    username VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    state  CHAR(2) NOT NULL, 
    zipcode VARCHAR(10) NOT NULL
);

INSERT INTO clientInfo VALUES ('abc', 'John Doe', '123 Main St.', 'CA', '12345');