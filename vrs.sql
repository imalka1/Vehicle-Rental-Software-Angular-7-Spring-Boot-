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
    `place`.`place`
FROM `vehicle_rental_software`.`place`;


INSERT INTO `vehicle_rental_software`.`place`
(`category`,
`place`)
VALUES
('airport','Colombo'),('airport','Galle'),('inland','Matara'),('inland','Malabe');





