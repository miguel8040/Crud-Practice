CREATE DATABASE MyDatabase;
GO

Use MyDatabase;
GO

CREATE TABLE CT_Director (
	PKDirector int IDENTITY (1,1) NOT NULL,	
	Name varchar(200) NOT NULL,
	Nationality varchar(100) NOT NULL,
	Age int NOT NULL,
	Active bit DEFAULT 0 NOT NULL,
	
	CONSTRAINT PrimryKey_CT_Director PRIMARY KEY (PKDirector),
	CONSTRAINT AgeCheck CHeCK(Age >0)
);


CREATE TABLE CT_Movie (
	PKMovie int IDENTITY (1,1) NOT NULL,
	FKDirector int NOT NULL,
	Name varchar(100)NOT NULL,
	Releasedate date NOT NULL,
	Duration time NOT NULL,
	Gender varchar(50) NOT NULL,
	
	CONSTRAINT PrimryKey_CT_Movie PRIMARY KEY (PKMovie),
	CONSTRAINT CT_Director_FK FOREIGN KEY (FKDirector) REFERENCES CT_Director(PKDirector)
)


INSERT INTO CT_Director (Name, Nationality, Age, Active) 
VALUES ('Guillermo del toro', 'MExicano', 90, 1);


INSERT INTO CT_Movie (FKDirector, Name, ReleaseDate, Gender, Duration) 
VALUES (1, 'El Laberinto del fauno', '2000-01-01', 'Suspenso', '02:30:00');