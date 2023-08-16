DROP SCHEMA IF EXISTS `member`;

DROP SCHEMA IF EXISTS `room`;

SET time_zone = '+09:00';

CREATE SCHEMA `member`;

CREATE SCHEMA `room`;

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
  `introduction` varchar(200),
  `join_date` timestamp default CURRENT_TIMESTAMP NOT NULL,
  `update_date` timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `member`.`authentication` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer unsigned NOT NULL,
  `cell_phone` varchar(128) NOT NULL,
  `email` varchar(128) UNIQUE NOT NULL,
  `sex` tinyint unsigned NOT NULL COMMENT '1: 남, 2: 여, 3: 기타',
  `birth` varchar(128) NOT NULL,
  `marketing_consent` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '마케팅 정보 수신 여부 - 0: 거부, 1: 승인'
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

CREATE TABLE `room`.`room` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `landlord_id` integer unsigned NOT NULL,
  `monthly_rent` smallint unsigned NOT NULL,
  `deposit` smallint unsigned NOT NULL,
  `building_type` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '1: 단독주택, 2: 오피스텔, 3: 아파트, 4: 빌라',
  `building_floor` tinyint unsigned NOT NULL,
  `room_floor` tinyint unsigned NOT NULL,
  `room_size` float unsigned NOT NULL,
  `move_in_date` varchar(128) NOT NULL,
  `address` varchar(128) NOT NULL,
  `post_date` timestamp default CURRENT_TIMESTAMP NOT NULL,
  `update_date` timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  `status` tinyint unsigned NOT NULL COMMENT '1: 게시, 2: 삭제, 3: 블라인드'
);

CREATE TABLE `room`.`option` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `bathroom` tinyint unsigned NOT NULL DEFAULT 0,
  `bed` tinyint unsigned NOT NULL DEFAULT 0,
  `air_conditioner` tinyint unsigned NOT NULL DEFAULT 0,
  `desk` tinyint unsigned NOT NULL DEFAULT 0,
  `free_parking` tinyint unsigned NOT NULL DEFAULT 0,
  `wifi` tinyint unsigned NOT NULL DEFAULT 0,
  `kitchen` tinyint unsigned NOT NULL DEFAULT 0,
  `washer` tinyint unsigned NOT NULL DEFAULT 0,
  `elevator` tinyint unsigned NOT NULL DEFAULT 0,
  `paid_parking` tinyint unsigned NOT NULL DEFAULT 0,
  `closet` tinyint unsigned NOT NULL DEFAULT 0,
  `tv` tinyint unsigned NOT NULL DEFAULT 0
);

CREATE TABLE `room`.`rule` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `curfew` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '통금시간 - 1~24, 0: 상관없음',
  `smoking` tinyint unsigned NOT NULL DEFAULT 0,
  `drinking` tinyint unsigned NOT NULL DEFAULT 0,
  `religion` tinyint unsigned NOT NULL DEFAULT 0 COMMENT '1: 개신교, 2: 불교, 3: 천주교'
);

CREATE TABLE `room`.`care_service` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `content` varchar(128)
);

CREATE TABLE `room`.`safety` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `cctv` tinyint unsigned NOT NULL DEFAULT 0,
  `fire_extinguisher` tinyint unsigned NOT NULL DEFAULT 0,
  `first_aid_kit` tinyint unsigned NOT NULL DEFAULT 0,
  `fire_alarm` tinyint unsigned NOT NULL DEFAULT 0,
  `carbon_monoxide_alarm` tinyint unsigned NOT NULL DEFAULT 0
);

CREATE TABLE `room`.`pet` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `dog` tinyint unsigned NOT NULL DEFAULT 0,
  `cat` tinyint unsigned NOT NULL DEFAULT 0,
  `etc` tinyint unsigned NOT NULL DEFAULT 0
);

CREATE TABLE `room`.`detail` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `title` varchar(128) NOT NULL,
  `content` varchar(500)
);

CREATE TABLE `room`.`image` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `thumbnail` integer unsigned NOT NULL COMMENT '0: 일반, 1: 썸네일',
  `image_url` varchar(100) NOT NULL
);

CREATE TABLE `room`.`like` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `lessee_id` integer unsigned NOT NULL
);

CREATE TABLE `room`.`contract` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `room_id` integer unsigned NOT NULL,
  `landlord_id` integer unsigned NOT NULL,
  `lessee_id` integer unsigned NOT NULL,
  `contract_date` timestamp default CURRENT_TIMESTAMP NOT NULL,
  `share_start_date` timestamp default CURRENT_TIMESTAMP NOT NULL,
  `share_end_date` timestamp default CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE `room`.`review` (
  `id` integer unsigned PRIMARY KEY AUTO_INCREMENT,
  `contract_id` integer unsigned NOT NULL,
  `landlord_id` integer unsigned NOT NULL,
  `lessee_id` integer unsigned NOT NULL,
  `rating` integer unsigned NOT NULL,
  `content` varchar(256),
  `post_date` timestamp default CURRENT_TIMESTAMP NOT NULL,
  `update_date` timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  `status` tinyint unsigned NOT NULL COMMENT '1: 게시, 2: 삭제, 3: 블라인드'
);

ALTER TABLE `member`.`lessee` COMMENT = '임차인';

ALTER TABLE `member`.`landlord` COMMENT = '임대인';

ALTER TABLE `member`.`title_search` COMMENT = '등기부등본';

ALTER TABLE `room`.`room` COMMENT = '방 정보';

ALTER TABLE `room`.`option` COMMENT = '방 옵션';

ALTER TABLE `room`.`rule` COMMENT = '방 규칙';

ALTER TABLE `room`.`care_service` COMMENT = '방 돌봄 서비스';

ALTER TABLE `room`.`safety` COMMENT = '방 안전 정보';

ALTER TABLE `room`.`pet` COMMENT = '방 애완동물';

ALTER TABLE `room`.`detail` COMMENT = '방 상세정보';

ALTER TABLE `room`.`image` COMMENT = '방 이미지';

ALTER TABLE `room`.`like` COMMENT = '방 좋아요';

ALTER TABLE `room`.`contract` COMMENT = '방 계약';

ALTER TABLE `room`.`review` COMMENT = '방 리뷰';