DROP DATABASE IF EXISTS `member`;

CREATE SCHEMA `member`;
USE `member`;

CREATE TABLE `member`.`user` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `login_type` tinyint unsigned NOT NULL COMMENT '1: 카카오, 2: 휴대폰',
  `user_type` tinyint unsigned NOT NULL COMMENT '1: 임대인, 2: 임차인',
  `user_name` varchar(30) NOT NULL,
  `status` tinyint unsigned NOT NULL COMMENT '1: 활성화, 2: 휴면, 3: 탈퇴'
);

CREATE TABLE `member`.`profile` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer unsigned NOT NULL,
  `image_url` varchar(100),
  `religion` tinyint unsigned NOT NULL COMMENT '1: 개신교, 2: 불교, 3: 천주교, 4: 기타',
  `join_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `member`.`authentication` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer unsigned NOT NULL,
  `cell_phone` varchar(128) NOT NULL,
  `email` varchar(128) UNIQUE NOT NULL,
  `sex` tinyint unsigned NOT NULL COMMENT '1: 남, 2: 여, 3: 기타',
  `birth` varchar(128) NOT NULL
);

CREATE TABLE `member`.`lessee` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer unsigned NOT NULL,
  `university` varchar(128) NOT NULL,
  `image_url` varchar(100) NOT NULL
);

CREATE TABLE `member`.`landlord` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer unsigned NOT NULL,
  `address` varchar(128) NOT NULL
);

CREATE TABLE `member`.`title_search` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `landlord_id` integer unsigned NOT NULL,
  `image_url` varchar(100)
);