CREATE DATABASE fuelquote;

CREATE TABLE usercredentials (
    id BIGSERIAL NOT NULL,
    name  VARCHAR(50) NOT NULL, 
    password BYTEA NOT NULL
);

-- Command to create new database and table