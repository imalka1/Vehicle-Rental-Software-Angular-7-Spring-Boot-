INSERT INTO `vehicle_rental_software`.`place`
(
`placeName`)
VALUES
('Galle'),('Matara');


INSERT INTO `vehicle_rental_software`.`passenger`
(
`passengersCount`,
`passengersPrice`)
VALUES
(1,10.0),(2,20.0),(3,30.0),(4,25.50);

INSERT INTO `vehicle_rental_software`.`customer`
(
`customerContactNumber`,
`customerEmail`,
`customerName`)
VALUES
(123,'im@gmail.com','im');

SELECT `reservation`.`id`,
    `reservation`.`reservationAdults`,
    `reservation`.`reservationChildren`,
    `reservation`.`reservationCompleted`,
    `reservation`.`reservationDateAndTime`,
    `reservation`.`reservationInfants`,
    `reservation`.`reservationTrip`,
    `reservationCustomer_customerEmail`,
    `reservation`.`reservationPlaceFrom_id`,
    `reservation`.`reservationPlaceTo_id`
FROM `vehicle_rental_software`.`reservation`;

SELECT `customer`.`customerEmail`,
    `customer`.`customerContactNumber`,
    `customer`.`customerName`,
    `customer`.`customerComments`
FROM `vehicle_rental_software`.`customer`;

SELECT `place`.`id`,
    `place`.`placeName`
FROM `vehicle_rental_software`.`place`;


