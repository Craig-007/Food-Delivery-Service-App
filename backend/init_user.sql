DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users (
	username VARCHAR(64) PRIMARY KEY,
	hashedPassword VARCHAR(128) NOT NULL,
	phoneNumber NUMERIC(16,0) NOT NULL,
	name VARCHAR(64) NOT NULL
);

DROP TABLE IF EXISTS FDSManagers CASCADE;
CREATE TABLE FDSManagers (
	username VARCHAR(64) PRIMARY KEY REFERENCES Users ON DELETE CASCADE
);

DROP TABLE IF EXISTS FDSPromotions;
CREATE TABLE FDSPromotions (
    promoId VARCHAR(64) PRIMARY KEY,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    discount NUMERIC(4,2) NOT NULL,
	promoDescription VARCHAR(64),
	createdBy VARCHAR(64) NOT NULL REFERENCES FDSManagers
);