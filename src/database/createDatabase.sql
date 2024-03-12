CREATE DATABASE IF NOT EXISTS cartoon;
USE cartoon;
CREATE TABLE `Casts` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Characters` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Cast_Characters` (
    `cast_id` int DEFAULT NULL,
    `character_id` int DEFAULT NULL,
    KEY `cast_id` (`cast_id`),
    KEY `character_id` (`character_id`),
    CONSTRAINT `Cast_Characters_ibfk_1` FOREIGN KEY (`cast_id`) REFERENCES `Casts` (`id`),
    CONSTRAINT `Cast_Characters_ibfk_2` FOREIGN KEY (`character_id`) REFERENCES `Characters` (`id`)
);
-- Inserir dados na tabela Casts (Dubladores)
INSERT INTO Casts (name) VALUES
('Dan Castellaneta'),
('Julie Kavner'),
('Nancy Cartwright'),
('Yeardley Smith'),
('Hank Azaria'),
('Harry Shearer');

-- Inserir dados na tabela Characters (Personagens dos Simpsons)
INSERT INTO Characters (name) VALUES
('Homer Simpson'),
('Marge Simpson'),
('Bart Simpson'),
('Lisa Simpson'),
('Maggie Simpson'),
('Ned Flanders'),
('Mr. Burns'),
('Principal Skinner'),
('Krusty the Clown'),
('Milhouse Van Houten');

-- Inserir dados na tabela Cast_Characters (Relação entre dubladores e personagens)
-- Dan Castellaneta (Homer Simpson)
-- Julie Kavner (Marge Simpson)
-- Nancy Cartwright (Bart Simpson)
-- Yeardley Smith (Lisa Simpson)
-- Hank Azaria (Maggie Simpson)
-- Dan Castellaneta (Ned Flanders)
-- Harry Shearer (Mr. Burns)
-- Harry Shearer (Principal Skinner)
-- Hank Azaria (Krusty the Clown)
-- Nancy Cartwright (Milhouse Van Houten)
INSERT INTO Cast_Characters (cast_id, character_id) VALUES
(1, 1),   
(2, 2),   
(3, 3),   
(4, 4),   
(5, 5),   
(1, 6),   
(6, 7),   
(6, 8),   
(5, 9),   
(3, 10);  