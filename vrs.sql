drop database vehicle_rental_software;

INSERT INTO `vehicle_rental_software`.`vehicle`
(
`vehicle_name`)
VALUES
('Benz'),('Toyota');

SELECT `vehicle`.`id`,
    `vehicle`.`vehicle_name`
FROM `vehicle_rental_software`.`vehicle`;

SELECT `place`.`place_id`,
    `place`.`category`,
    `place`.`from_or_to`,
    `place`.`place`
FROM `vehicle_rental_software`.`place`;

INSERT INTO `vehicle_rental_software`.`place`
(
`category`,
`from_or_to`,
`place`)
VALUES
('airport','from','Colombo'),('airport','from','Galle'),('inland','from','Matara');





