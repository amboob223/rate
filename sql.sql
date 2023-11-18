CREATE DATABASE rate;

CREATE TABLE date(
    name VARCHAR(255),
    age  VARCHAR(255),
    status VARCHAR(255),
    intrest VARCHAR(255),
    pic VARCHAR(255)
);

ALTER TABLE date ADD COLUMN pic TYPE VARCHAR(255);
CREATE TABLE pass(
    username VARCHAR(255),
    password VARCHAR(255)
    );