-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (arm64)
--
-- Host: localhost    Database: unicon
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `buyings`
--

DROP TABLE IF EXISTS `buyings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `bid_price` decimal(20,2) DEFAULT NULL,
  `bid_status_id` int NOT NULL,
  `due_date` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyings`
--

LOCK TABLES `buyings` WRITE;
/*!40000 ALTER TABLE `buyings` DISABLE KEYS */;
/*!40000 ALTER TABLE `buyings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_items` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_FK` (`user_id`),
  KEY `productId_FK` (`product_items`),
  CONSTRAINT `productId_FK` FOREIGN KEY (`product_items`) REFERENCES `product` (`id`),
  CONSTRAINT `userId_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (102,21,31,1),(103,21,31,1),(104,6,12,1),(105,6,17,1),(106,1014,17,2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gender_type` varchar(10) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_gender_FK` (`user_id`),
  CONSTRAINT `userId_gender_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'f',1014);
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_category`
--

DROP TABLE IF EXISTS `main_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_category`
--

LOCK TABLES `main_category` WRITE;
/*!40000 ALTER TABLE `main_category` DISABLE KEYS */;
INSERT INTO `main_category` VALUES (1,'소파'),(2,'의자'),(3,'조명');
/*!40000 ALTER TABLE `main_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_orderItem_FK` (`user_id`),
  KEY `ordersId_orderItem_FK` (`order_id`),
  KEY `productId_orderItem_FK` (`product_id`),
  CONSTRAINT `ordersId_orderItem_FK` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `productId_orderItem_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `userId_orderItem_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (137,21,42,2,1,75000.00);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'PENDING_PAYMENT'),(2,'COMPLETED_PAYMENT'),(3,'DELIVERING'),(4,'DELVERY_COMPLETED');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_number` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` int NOT NULL DEFAULT '0',
  `order_status_id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `userId_orders_FK` (`user_id`),
  KEY `orders_order_status_fk` (`order_status_id`),
  CONSTRAINT `orders_order_status_fk` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`),
  CONSTRAINT `userId_orders_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (42,21,'46aa7cc0-8e56-45a6-995d-2eb7fe142bf2','2023-04-17 06:50:36',75000,2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `names` varchar(50) DEFAULT NULL,
  `descriptions` varchar(300) DEFAULT NULL,
  `sub_description` varchar(100) DEFAULT NULL,
  `sub_category_id` int DEFAULT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  `product_size` json DEFAULT NULL,
  `is_new` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `show_room_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subCategory_product_FK` (`sub_category_id`),
  KEY `show_room_id_product_FK` (`show_room_id`),
  CONSTRAINT `show_room_id_product_FK` FOREIGN KEY (`show_room_id`) REFERENCES `show_room` (`id`),
  CONSTRAINT `subCategory_product_FK` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'LINANASWE 리나네스위','차에 실어서 집까지 편하게 운반할 수 있도록 만들어졌습니다','3인용소파',1,99999.00,'\"121cm x 68cm x 78cm\"',1,'2023-04-09 07:17:38',1),(2,'ANGERSBYWE 앙에르스뷔','이 소파는 편안하고 거의 모든 곳에서 사용할 수 있으며 수많은 커버를 선택','2인용소파, 크니사 다크그레이',2,75000.00,'\"130cm x 75cm x 85cm\"',NULL,'2023-04-09 07:17:38',2),(3,'GLOSTADWE 글로스타드위','소파는 클래식한 디자인과 두툼하고 안락한 쿠션으로 많은 사랑을 받아온 제품입니다. 커버는 쉽게 교체할 수 있어 분위기나 계절에 따라 다양한 인테리어를 시도해볼 수 있어요.','2인용 소파',1,60000.00,'\"115cm x 65cm x 75cm\"',1,'2023-04-09 07:17:38',NULL),(4,'KLIPPANWE 클리판위','1950년대 스칸디나비아 스타일에서 영감을 받은 슬림하고 튼튼한 소파예요.','3인용 소파',2,85000.00,'\"135cm x 68cm x 80cm\"',NULL,'2023-04-09 07:17:38',NULL),(5,'FRIHETENWE 프리헤테위','스타일리시하고 산뜻한 느낌이 좋다면 시트가 깊고 넓은 소파는 어떨까요?','수납코너소파베드',1,79000.00,'\"120cm x 68cm x 80cm\"',1,'2023-04-09 07:17:38',3),(6,'EXTORPWE 엑토르프위','소파에 혼자 또는 가족 모두와 함께 앉아 편안한 휴식을 즐겨보세요.','3인용 소파',2,80000.00,'\"160cm x 65cm x 75cm\"',NULL,'2023-04-09 07:17:38',NULL),(7,'KIVIKWE 쉬비크위','소파에 혼자 또는 가족 모두와 함께 앉아 편안한 휴식을 즐겨보세요.','3인용 소파',1,75000.00,'\"170cm x 70cm x 85cm\"',1,'2023-04-09 07:17:38',NULL),(8,'EKENASET 에케네세트위','푹 주무셨나요? 간밤에 사용했던 침실이나 게스트룸이 순식간에 넓은 거실로 변신할 수 있어요. 빌트인수납장에 침구, 책, 파자마를 담기만 하면 된답니다.','4인용 소파 + 수납',2,86000.00,'\"200cm xcm 147cm x 78cm\"',NULL,'2023-04-09 07:17:38',NULL),(9,'LINANASWE 리나세스위',' 측면에 수납할 수 있는 포켓이 있어 더욱 편리합니다.','3인용 소파',1,95000.00,'\"160cm x 77cm x 88cm\"',NULL,'2023-04-09 09:48:02',NULL),(10,'LANDSKRONAWE 란스크로나','긴의자는 좌우 어디에든 놓을 수 있고 언제든지 위치를 바꿀 수 있습니다.','4인용 소파+ 긴의자',2,95000.00,'\"328cm x 140cm x 178cm\"',1,'2023-04-09 09:48:02',NULL),(11,'OSTANOWE 외스타뇌위','의자를 포개둘 수 있어서 보관할 때 공간을 많이 차지하지 않습니다.','의자',3,86000.00,'\"34cm x 76cm x 45cm\"',NULL,'2023-04-09 09:54:40',1),(12,'TEODORESWE 테오도레스위','이 편안한 의자는 견고하지만 가벼우며 쌓아 둘 수도 있습니다. 식당에 두든 입구나 침대 옆에 두든, 다양한 테이블 및 스타일과 잘 어울리므로 높은 만족감을 선사합니다.','접이식 의자',4,65000.00,'\"44cm x 78cm x 50cm\"',NULL,'2023-04-09 09:54:40',NULL),(13,'FROSETWE 프뢰세트위','이 이지체어는 깔끔한 스칸디나비아 실루엣과 경쾌한 느낌의 디자인으로 보는 순간 첫눈에 반하게 만들어요. 스마트한 생산 기법으로 환경에 대한 영향과 가격은 낮추고, 접근성은 최대한 높였어요!','이지체어',3,54000.00,'\"39cm x 80cm x 55cm\"',NULL,'2023-04-09 09:54:40',1),(14,'MARIUSWE 마리우스위',' 만능 스툴은 갑자기 손님이 들렀을 때나 책 또는 음료를 둘 공간이 더 필요할 때 아주 유용해요.','스툴, 45cm',4,36000.00,'\"37cm x 72cm x 60cm\"',NULL,'2023-04-09 09:54:40',NULL),(15,'ODGERWE 오드게르위','쌓아서 보관할 수 있어 공간이 절약됩니다.','스툴',3,55000.00,'\"45cm x 55cm x 78cm\"',1,'2023-04-09 09:54:40',2),(16,'VOXLOVWE 복슬뢰브위','의자는 어느 정도의 가치를 담고 있을까요? 특별한 디자인이 의자의 가치를 높여줍니다.','회전의자',4,68000.00,'\"55cm x 67cm x 78cm\"',NULL,'2023-04-09 09:54:40',NULL),(17,'KARLJANWE 칼리안위','등받이와 시트가 몸에 맞게 디자인되어 있어서 편안하게 앉을 수 있습니다.\n\n의자를 벽에 걸어두면 공간을 차지하지 않습니다.\n\n접이식 의자로 간편하게 보관할 수 있습니다.','접이식 의자',3,73000.00,'\"50cm x 65cm x 80cm\"',NULL,'2023-04-09 09:54:40',NULL),(18,'GRASALAW 그로살라위','의자를 포개둘 수 있어서 보관할 때 공간을 많이 차지하지 않습니다.','의자',4,49000.00,'\"50cm x 45cm x 78cm\"',NULL,'2023-04-09 09:54:40',NULL),(19,'PERSOBOLW 페르스볼르','튼튼한 구조에 목재의 자연스럽고 부드러운 느낌이 더해져, 포근하고 안락한 분위기를 연출합니다. 1950~60년대 의자 스타일에 착안한 간결한 디자인은 어디에 두어도 잘 어울립니다.','고정식의자, 베이지',3,88000.00,'\"55cm x 45cm x 78cm\"',NULL,'2023-04-09 09:54:40',3),(20,'UDMUNDE 우드문드이','19세기 비엔나에서 흔히 사용되던 벤트우드 소재의 클래식한 카페 의자에서 착안한 디자인입니다. 전체를 하나의 몰드로 제작하여 나사를 사용하지 않은 것이 특징이에요. 자외선 차단 처리가 되어 있으며 실내외 겸용으로 공공장소 사용 승인을 받았습니다.','팔걸이 의자',4,89000.00,'\"45cm x 45cm x 80cm\"',1,'2023-04-09 09:54:40',NULL),(21,'LILLANASWE 릴로네스위','10년 품질보증을 제공합니다. 자세한 내용은 품질보증 브로슈어의 약관을 참조하세요.','회전의자',4,79000.00,'\"43cm x 55cm x 75cm\"',NULL,'2023-04-09 09:54:40',NULL),(22,'FORSAR 포르소르','스틸 소재의 클래식한 작업등으로 매일을 밝혀보세요. 조명의 각도를 자유롭게 조절하여 원하는 곳에 빛을 비출 수 있어 책상과 침대, 소파에서 독서등으로 사용하기 좋습니다.','독서등',5,65000.00,'\"68cm x 44cm\"',NULL,'2023-04-09 10:09:53',NULL),(23,'DEJSAT 데이사티','숙련된 전문가가 직접 입으로 불어서 만든 제품입니다.','탁상스탠드, 25cm',6,23000.00,'\"45cm x 24cm\"',1,'2023-04-09 10:09:53',NULL),(24,'TALLBTNWE 텔뷘위','아담한 크기로 어디에든 놓고 포근함과 무드를 더할 수 있습니다.','탁상스탠드, 오프화이트 세라믹/베이지',5,19000.00,'\"85cm x 30cm\"',NULL,'2023-04-09 10:09:53',3),(25,'LERSTAR 레르스타르','독서등으로 사용해보세요.\n','LED 스폿조명',6,39000.00,'\"64cm x 24cm\"',NULL,'2023-04-09 10:09:53',NULL),(26,'STOTTASS 스퇴티','조명은 메탈과 입으로 불어 만드는 유리 소재로 만들어서 클래식하면서도 튼튼한 디자인이에요. 멋진 분위기를 연출하는 기능성 조명이죠. 집안에 추억을 떠올리게 하는 공간을 만들어보세요.','플로어스탠드',6,24000.00,'\"145cm x 54cm\"',NULL,'2023-04-09 10:09:53',NULL),(27,'TOKABOWE 토카보위','풍부한 불빛이 넓게 퍼지며 방 전체를 밝혀줍니다.','플로어스탠드',5,70000.00,'\"66cm x 24cm\"',NULL,'2023-04-09 10:09:53',NULL),(28,'LAMPANEW 람팜파','보석처럼 은은하게 반짝이는 전등입니다. 기분 좋은 빛을 눈부심 없이 고르게 비춰주는 제품으로, 함께 구성된 디머 스위치로 원하는 무드를 간편하게 설정할 수 있습니다.','플로어스탠드/독서등,화이트',5,18000.00,'\"35cm x 55cm\"',NULL,'2023-04-09 10:09:53',NULL),(29,'LEDBERGEW 레드베리이','세월이 흘러도 변치 않는 아름다움을 지닌 근사한 조명을 소개합니다. 시리즈에 포함된 조명 제품과 함께 사용해 은은하고 부드러운 불빛으로 방안을 가득 채우고 통일감 있는 인테리어를 연출해보세요.','독서등',5,6000.00,'\"35cm x 40cm\"',1,'2023-04-09 10:09:53',NULL),(30,'PILSKOTTWE 필스코트리','위쪽 그리드로 인해 빛이 위쪽으로 퍼져 전체 조명의 역할을 하여 공간 전체를 환하게 밝혀줍니다. 또한 아래쪽 그리드는 눈부심을 방지하므로 기분 좋은 빛이 아래쪽으로 퍼집니다.','플로어램프 베이스',6,34000.00,'\"165cm x 24cm\"',NULL,'2023-04-09 10:09:53',2),(31,'STOCKHOLM2017 스토코롬2017','전등갓 상단에 있는 스위치로 전원을 조작할 수 있습니다.','탁상스탠드',5,36000.00,'\"30cm x 45cm\"',NULL,'2023-04-09 10:09:53',NULL),(32,'HEKTOGRAMER 헥토그라머','원하는 곳에 놓고 사용할 수 있습니다.','펜던트등',6,67000.00,'\"55cm x 20cm\"',NULL,'2023-04-09 10:09:53',NULL),(33,'TARNABYER 테르나부리','전통식 등유 램프 디자인에서 영감을 받은 무드등 제품으로, 빛이 따뜻하고 부드럽습니다. 불빛이 나오는 전구를 직접 볼 수 있는 형태이며, 디머로 밝기 조절을 할 수 있습니다.','LED 장식조명',5,43000.00,'\"45cm x 24cm\"',NULL,'2023-04-09 10:09:53',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_detail`
--

DROP TABLE IF EXISTS `product_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descriptions` varchar(300) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productId_productDetail_FK` (`product_id`),
  CONSTRAINT `productId_productDetail_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_detail`
--

LOCK TABLES `product_detail` WRITE;
/*!40000 ALTER TABLE `product_detail` DISABLE KEYS */;
INSERT INTO `product_detail` VALUES (1,'쉽게 침대로 바꿀 수 있어요.\n\n의자시트 밑에 넓고 실용적인 수납공간이 있습니다.\n\n10년 보증이 적용됩니다. 보증서의 약관을 참조하세요.',1),(2,'쉽게 침대로 바꿀 수 있어요.\n\n젖은 천으로 닦으면 깨끗해집니다.\n\n10년 품질보증. 자세한 내용은 품질보증 브로슈어를 참조하세요.',2),(3,'누구든지 쉽게 2인용 침대로 바꿀 수 있습니다.\n\n라텍스 소재를 사용하여 통기성이 좋고 수분이 쉽게 증발합니다.\n\n고탄성폼과 라텍스로 제작된 매트리스로 체형에 따라 몸을 편안하게 받쳐주며 척추를 곧게 펴줍니다.\n\n매트리스 커버를 벗겨서 물세탁할 수 있습니다.\n\n3종 매트리스와 다양한 디자인의 커버 중에서 나에게 가장 잘 맞는 제품을 선택해보세요.\n\n새로운 분위기를 연출하고 싶다면 커버를 교체해보세요.\n\n10년 보증이 적용됩니다. 보증서의 약관을 참조하세요.\n\n',3),(4,'원착방식으로 염색한 폴리에스테르 소재의 KNISA/크니사 패브릭으로 만든 커버입니다. 내구성이 뛰어난 소재로 감촉이 부드럽습니다.\n\n10년 보증이 적용됩니다. 보증서의 약관을 참조하세요.',4),(5,'소파는 공간을 효율적으로 활용할 수 있도록 포장되어 집까지 편하게 운반할 수 있습니다.\n\n팔걸이 옆쪽의 주머니에는 리모컨과 소품 등을 넣어두세요.\n\n10년 보증이 적용됩니다. 보증서의 약관을 참조하세요.\n\n',5),(6,'10년 보증이 적용됩니다. 보증서의 약관을 참조하세요.\n\n소파는 공간을 효율적으로 활용할 수 있도록 포장되어 집까지 편하게 운반할 수 있습니다.',6),(7,'깔끔한 라인과 잘 받쳐주는 편안함 덕분에 독서할 때나 친구들과 어울릴 때, 잠시 휴식할 때도 유용해요.\n\n나무 프레임을 먼저 다크브라운 톤으로 스테인 처리한 후 투명래커로 마감해서 목재의 자연스러운 결을 살려 소파마다 고유한 개성을 표현합니다.\n\n프레임에는 10년 품질보증이 제공됩니다. 브로슈어에서 품질보증 기간에 대한 내용을 읽어 보세요.',7),(8,'시트와 등받이의 고탄성 폼 덕분에 일어나면 바로 소파의 모양이 회복되며, 시트의 지그재그 스프링과 허리의 지지력 좋은 패브릭이 더욱 단단한 편안함을 선사합니다. 프레임에는 10년 품질보증이 제공됩니다. 브로슈어에서 품질보증 기간에 대한 내용을 읽어 보세요.\n\n',8),(9,'이 커버는 폴리에스테르 소재의 GUNNARED/군나레드 원착 패브릭으로 제작되었습니다. 울과 같은 느낌을 지닌 내구성이 우수한 패브릭으로, 따스한 분위기와 투톤의 멜란지 효과가 특징입니다.\n\n커버는 분리하여 물세탁이 가능하기 때문에 오랫동안 깨끗하게 사용할 수 있습니다.\n\n10년 보증이 적용됩니다. 보증서의 약관을 참조하세요.',9),(10,'커버는 분리하여 물세탁이 가능하기 때문에 오랫동안 깨끗하게 사용할 수 있습니다.\n\n10년 보증이 적용됩니다. 보증서의 약관을 참조하세요.',10),(11,'FIXA 바닥보호패드와 함께 사용해 아래의 표면이 마모되지 않도록 보호할 수 있습니다.',11),(12,'최대 4개의 의자를 쌓아둘 수 있습니다.',12),(13,'최대 6개까지 포개놓을 수 있어서 편하게 보관할 수 있습니다.\n\n',15),(14,'등받이와 시트가 몸에 맞게 디자인되어 있어서 편안하게 앉을 수 있습니다.\n\n의자를 벽에 걸어두면 공간을 차지하지 않습니다.\n\n접이식 의자로 간편하게 보관할 수 있습니다.',16),(15,'대부분의 환경에서 사용할 수 있도록 테스트와 승인을 거쳐 집과 식당, 대기실 등 어디서나 사용하기 좋은 이지체어입니다.\n\n10년 품질보증. 자세한 내용은 품질보증 브로슈어를 참조하세요.\n\n',13),(16,'실내에서만 사용하세요.\n\n본 제품은 재생이 가능하며 에너지를 재생하는데 사용할 수도 있습니다.',14),(17,'견고한 나무 의자 프레임이 구조를 매우 견고하며 내구성이 우수하게 만듭니다.\n\n좌석에 완벽하게 들어맞는 부드러운 의자패드를 추가해 편안함을 높이세요.',17),(18,'의자시트와 등받이의 부드러운 곡선 디자인 덕분에 편안하게 앉을 수 있습니다.\n\n생생하게 드러나 있는 나뭇결은 따스하고 자연스러운 느낌을 줍니다.\n\n같은 색상의 의자 여러 개로 통일된 분위기를 연출하거나, 서로 다른 색상의 의자를 섞어서 배치해 보세요.\n\n경목원목으로 내구성이 뛰어나고 튼튼하며, 오랫동안 많이 사용해도 견고함을 잃지 않습니다.',18),(19,'높은 등받이와 의자의 곡선 형태는 척추 아랫부분을 충실하게 받쳐주며 등이 피로해지는 것을 방지해줍니다. 편안하고 이완된 자세로 더 오랫동안 앉아 있을 수 있습니다.\n\n등받이에 메시 소재를 사용하여 오랫동안 앉아있어도 상쾌하고 편안합니다.\n\n가죽은 시간이 흐를수록 멋스럽게 태닝되어 은은한 색감을 가지게 됩니다.',19),(20,'튼튼하고 내구성이 뛰어나서 공용 가구의 기준에 부합합니다.\n\n단일 몰드로 만든 의자로 조립하거나 나사를 다시 조일 필요가 없어요.\n\n가벼워서 쉽게 옮길 수 있습니다.\n\n실내, 실외에서 모두 사용하기 적합합니다.\n\n청소가 쉽습니다.\n\n보관시에는 쌓아둘 수 있어 공간을 절약할 수 있습니다.',20),(21,'독서등으로 사용해보세요.\n\n조명의 각도를 자유롭게 조절하여 원하는 곳에 빛을 비출 수 있습니다.\n\n',21),(22,'조명의 각도와 방향을 자유롭게 조절할 수 있습니다.',22),(23,'조명의 각도와 방향을 자유롭게 조절할 수 있습니다.',23),(24,'부드러운 느낌의 불빛이 따뜻하고 포근한 분위기를 연출합니다.\n\n이 유리 전등갓은 숙련된 전문가가 입으로 불어서 만든 제품으로 독특한 개성을 느낄 수 있어요.\n\n',24),(25,'불빛이 부드럽고 눈부심이 없어서 눈이 편합니다.\n\n',25),(26,'디머가 내장되어 있어서 전체조명과 무드조명으로 모두 사용할 수 있습니다.\n\n전등갓 위아래에 반투명유리를 덧대어 은은하고 아늑한 빛을 비춥니다.\n\n불빛의 밝기를 약하게 하면 에너지도 절약되고 전기료도 줄어듭니다.\n\n전원코드를 가느다랗고 투명하게 디자인해 섬세한 디테일을 더한 제품입니다.\n\n바닥에 펠트 패드가 있어서 흠집이 생기지 않습니다.\n\n',26),(27,'텍스타일 전등갓으로 은은하고 아름다운 조명효과를 느낄 수 있습니다.',27),(28,'전등갓 상단에 있는 스위치로 전원을 조작할 수 있습니다.',28),(29,'아담한 크기로 어디에든 놓고 포근함과 무드를 더할 수 있습니다.\n\n다이얼을 돌려 밝기를 조절하세요.',29),(30,'조명본체에 원하는 전등갓을 조합하거나 장식용 전구를 달아 간편하게 개성 있는 조명으로 꾸밀 수 있습니다.',30),(31,'매우 편리하고 간편하게 사용할 수 있습니다.\n\n',31),(32,'모던한 디자인에 기분 좋은 빛을 비춰줄 낮은 가격의 탁상스탠드를 찾고 있나요? ',32),(33,'위쪽 그리드로 인해 빛이 위쪽으로 퍼져 전체 조명의 역할을 하여 공간 전체를 환하게 밝혀줍니다. 또한 아래쪽 그리드는 눈부심을 방지하므로 기분 좋은 빛이 아래쪽으로 퍼집니다.',33);
/*!40000 ALTER TABLE `product_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(2000) DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId_productImage_FK` (`product_id`),
  CONSTRAINT `productId_productImage_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5556 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,'https://images.unsplash.com/photo-1595500403311-02b6a50c9109?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',1),(2,'https://plus.unsplash.com/premium_photo-1673548917207-8747dffd1391?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',1),(3,'https://images.unsplash.com/photo-1517334526283-a2a3969df57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',1),(4,'https://images.unsplash.com/photo-1557316158-7aa9ed99a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',1),(5,' https://images.unsplash.com/photo-1562184248-cc9e4688a166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',11),(6,'https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',13),(7,'https://images.unsplash.com/photo-1602098206909-a104231d688b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',30),(8,' https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1087&q=80',15),(9,'https://images.unsplash.com/photo-1595500403311-02b6a50c9109?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',2),(10,'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',4),(11,'https://images.unsplash.com/photo-1603192399946-8bbb0703cfc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',5),(12,'https://images.unsplash.com/photo-1617325710236-4a36d46427c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',19),(13,'https://images.unsplash.com/photo-1601349112684-a2400a4586ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',24),(14,'https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2586&q=80',12),(15,'https://images.unsplash.com/photo-1589584649628-b597067e07a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',12),(16,'https://images.unsplash.com/photo-1610647186667-c62601403304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',18),(17,'https://images.unsplash.com/photo-1606066168002-7cebcd7aecd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2788&q=80',18),(18,'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1709&q=80',8),(19,'https://images.unsplash.com/photo-1551029612-9760a92ad772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',8),(20,'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',5),(21,'https://images.unsplash.com/photo-1517334526283-a2a3969df57f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',2),(22,'https://images.unsplash.com/photo-1630585308572-f53438fc684f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80',3),(23,'https://plus.unsplash.com/premium_photo-1673548917229-0132c816cd79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',4),(24,'https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',6),(25,'https://images.unsplash.com/photo-1603192399946-8bbb0703cfc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2786&q=80',7),(26,'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',9),(27,'https://images.unsplash.com/photo-1464564531096-f0163633a18a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1194&q=80',10),(28,'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',13),(29,'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',14),(30,'https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1687&q=80',16),(31,'https://images.unsplash.com/photo-1622880355742-af182a61b362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2844&q=80',17),(32,'https://images.unsplash.com/photo-1561677978-583a8c7a4b43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',20),(33,'https://images.unsplash.com/photo-1599004831521-f9b1f81f5a84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1019&q=80',21),(34,'https://images.unsplash.com/photo-1542728928-1413d1894ed1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',22),(35,'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',23),(36,'https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',25),(37,'https://images.unsplash.com/photo-1567459045800-4d77c81fc3f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',26),(38,'https://images.unsplash.com/photo-1551380701-5dd33d5b5d06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',27),(39,'https://images.unsplash.com/photo-1590003689662-0773d48b6417?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',28),(40,'https://plus.unsplash.com/premium_photo-1670914333012-f4093b108aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',29),(41,'https://images.unsplash.com/photo-1579888028917-47462bb03ca9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',31),(42,'https://images.unsplash.com/photo-1543512214-4f76e81f8bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',32),(43,'https://images.unsplash.com/photo-1587386241957-300248e4ff27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=798&q=80',33);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `order_number` varchar(200) DEFAULT NULL,
  `user_id` int NOT NULL,
  `lists` json DEFAULT NULL,
  `total_amount` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id_FK` (`user_id`),
  KEY `order_id_FK` (`order_id`),
  CONSTRAINT `order_id_FK` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES (65,42,'46aa7cc0-8e56-45a6-995d-2eb7fe142bf2',21,'[{\"price\": 75000, \"quantity\": 1, \"productId\": 2}]',75000,'2023-04-17 06:50:52'),(66,42,'46aa7cc0-8e56-45a6-995d-2eb7fe142bf2',21,'[{\"price\": 75000, \"quantity\": 1, \"productId\": 2}]',75000,'2023-04-17 06:50:52');
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(500) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `producId_review_FK` (`product_id`),
  KEY `userId_review_FK` (`user_id`),
  CONSTRAINT `producId_review_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `userId_review_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (62,1,1,'2023. 4. 13.','안녕안녕',3.0,'2023-04-13 05:49:32',NULL),(66,1,1,'4/13/2023','사용감이 너무 좋습니다',5.0,'2023-04-13 14:55:39',NULL),(68,1,1,'4/13/2023','프론트 분들도 수고하셨습니다',5.0,'2023-04-13 14:56:02',NULL);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(128) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20230404062516'),('20230404062616'),('20230404062646'),('20230404065343'),('20230404065406'),('20230404065430'),('20230404065448'),('20230404070559'),('20230404070619'),('20230404070632'),('20230404070654'),('20230404070715'),('20230404070724'),('20230406080612'),('20230408130919'),('20230408134953'),('20230410132044');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `show_room`
--

DROP TABLE IF EXISTS `show_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `show_room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(2000) DEFAULT NULL,
  `descriptions` varchar(1000) DEFAULT NULL,
  `header` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `show_room`
--

LOCK TABLES `show_room` WRITE;
/*!40000 ALTER TABLE `show_room` DISABLE KEYS */;
INSERT INTO `show_room` VALUES (1,'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80','스타일리시한 윙체어에 몸을 깊숙이 기대고 풋스툴에 발을 올려두는 것보다 더 기분 좋은 일은 없을 거예요. 안에 실용적인 수납 공간이 숨어 있다면 더 그렇겠죠? 그 안에 무얼 넣고 싶으신가요? 그건 주인 마음에 달렸죠...','어떤 거실을 꿈꾸시나요?'),(2,'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80','새로운 HICKTOGRAM 힉토그람은 정교하게 제작되었으며 유행을 타지 않는 디자인이에요. 어느 공간에도 개성을 더할 수 있는 심플하면서도 눈에 확 띄는 제품이죠. 디자이너 Carlson은 \"클래식한 디자인이라 친숙한 느낌이 들고, 목재 소재가 자연 그대로의 따뜻한 느낌을 주며, 동시에 가볍고 쾌적한 분위기를 연출해요.\"라고 전합니다.','쉽게 꾸미는 조화로운 거실'),(3,'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80','\"공간을 돋보이게 하는 우아한 룩과 실용성을 겸비한 제품을 만들고자 JÄTTESTA 예테스타 수납용품 시리즈를 디자인했어요.\"라고 디자이너 Maja Ganszyniec은 말합니다. \"대나무와 메탈 소재를 사용해 가볍고 안정적이죠. 여기에 모던한 느낌을 주는 디자인을 착용했죠\"','퍼스트 클래스의 편안함');
/*!40000 ALTER TABLE `show_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(100) DEFAULT NULL,
  `main_category_id` int DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mainCategory_subCategory_FK` (`main_category_id`),
  CONSTRAINT `mainCategory_subCategory_FK` FOREIGN KEY (`main_category_id`) REFERENCES `main_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category`
--

LOCK TABLES `sub_category` WRITE;
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
INSERT INTO `sub_category` VALUES (1,'오랜 세월 동안 편안하게 앉을 수 있는 소파를 만들기 위해 재료를 세심하게 처리했답니다. 자신에게 꼭 맞는 소파를 골라보세요.',1,'인조가죽 소파'),(2,'새로운 패브릭소파에서 편안한 시간을 보내고 싶으세요? 다양한 소파를 저렴하게 만나볼 수 있어요. 2인용과 3인용소파, 코너소파를 다양한 컬러와 스타일에서 골라보세요.',1,'패브릭소파'),(3,'편한 책상의자에 앉아 있으면 허리 통증이 적어 일에 더 많은 시간을 집중할 수 있습니다.  다양한 스타일로 편하게 일하고 싶은 어느 공간에나 잘 어울린답니다.',2,'사무용의자'),(4,'바스툴에 앉아 편안한 아침 식사를 먹으며 하루를 시작하거나 밤에 세련된 바스툴에 앉아 한 잔 마시면서 하루를 마무리하고 싶으세요? IKEA에는 다양한 스타일의 바스툴을 만나보세요.',2,'바의자'),(5,'스마트 조명으로 마음에 꼭 드는 무드와 분위기를 연출해보세요. 리모컨이나 앱을 사용하여 조명을 끄거나 켜고 밝기를 조절하며 조명 색도 바꿀 수 있죠.',3,'스마트조명'),(6,'스위치를 딸깍하거나 앱을 한 번 탭하는 것으로 조명을 통해 방 분위기를 바꿀 수 있어요. 하루를 시작할 땐 활기찬 조명이 어떨까요? ',3,'일반조명');
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `names` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `passwords` varchar(200) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `addresses` varchar(200) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `points` decimal(12,2) DEFAULT '100000000.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1015 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'김','kim@gmail.com','$2b$12$DuJV/GWoPU9p88qSgjP.rOaxwgbKaUBdkG.DojOqoW.3UVIyuY.4a','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-04-09 05:00:14',NULL),(2,'김정환','ggkim0614@gmail.com','$2b$12$ytFIc8Br8OY6QIWnDy7lyuAwnOae0aoSFLuhbn/KKH4D5wBDdDYMa','010-2767-6979','위워크 10층','1999-06-14',7566008.00,'2023-04-12 11:11:59','2023-04-14 02:11:05'),(3,'김정환','kimjh0614@gmail.com','$2b$12$aKoMBDnjS5qrgv7UmU79NOeHyGbs7GUModSSD9QuJSmaPfaSiGguu','010-2767-6979','asl;dkfasdl;jsdkl','1999-06-14',99999.00,'2023-04-13 08:30:08',NULL),(4,'김민서','kimkim@gmail.com','$2b$12$uN7YTGpancVpbn/.TPX89uhOIiuojgN9XGLib3soXOV1APKWs4ls2','010-1234-5678','위워크 10층 야호!','2000-12-12',-418001.00,'2023-04-13 09:42:54','2023-04-13 11:19:26'),(6,'민서','kimmin@gmail.com','$2b$12$/wYD2qd5cKMdY4bxvctI..8sy1zEp9DYPklk6U0xbFayHe2BosalC','010-3333-3333','테헤란로427','2000-02-22',-54035.00,'2023-04-13 13:06:42','2023-04-13 23:21:49'),(12,'김정환','georgekim0614@gmail.com','$2b$12$3sdUxupngrNHVdhg8geG2.WsbXY7zi50pYmCOlz6bM9oLN6zaeTAS','010-2767-6979','서울시 강남구 테헤란로 427 위워크 10층','1999-06-14',99999.00,'2023-04-13 14:24:37',NULL),(21,'홍길동','hong123@gmail.com','$2b$12$jN8qCXnzh4wmq3ALG01QluCxxWxIRSPGpAvsTyRpUlNLpf/.pgEp6','010-0000-0000','서울시 테해란로 123','2000-01-01',9604002.00,'2023-04-15 04:16:02','2023-04-17 06:50:52'),(22,'minseo','gmail','password','010-1234-5678',NULL,NULL,100000000.00,'2023-05-09 04:52:49',NULL),(23,'kim','23@gmail','$2b$10$bZTWMMrX2B7hhvc67u0I9Oy4KICr23qtRhe6biH5UbevZBqGKtKIe','010-5678-1234',NULL,NULL,100000000.00,'2023-05-09 05:59:45',NULL),(24,'min','24@gmail','$2b$10$0GZ0m3z0uwr8pouk8aPRL.CnAPSIbKrBRFG.Phfhs5l9dlJorAxAi','010-5678-1234',NULL,NULL,100000000.00,'2023-05-09 06:00:39',NULL),(100,'minseo','1234@gmail.com','$2b$10$JVmS7XQrvJ0lT9hjnrTrAeARUh2fu1qrlFXWPFfyDV8gSTG2j82MG','01032132331',NULL,NULL,100000000.00,'2023-05-21 05:54:01',NULL),(1002,'pia','pia@gmail.com','$2b$10$lO1FCs9gHR9W1gblLU9FKuL2M37idXW5DNFPyCHrkEiD6R6TuxayG','010-3333-3333',NULL,NULL,100000000.00,'2023-05-31 08:59:39',NULL),(1003,'민서','test@gmail.com','$2b$14$LlAxqxvq94HfZ4RMx2hCiu9anTtukcTeBzpqZvrFpPZ9n8otgdjZK','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:26:55',NULL),(1004,'민서','test1@gmail.com','$2b$14$NLVJLIZOLTmcJ4Whx9J0bOqCfsotiItnx1lLPH7ESlPftPu7oVQnO','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:28:47',NULL),(1005,'민서','test3@gmail.com','$2b$14$EyFPsi0gHfIQeXZW3DLhk.x7Q5CM8i1I5MHpel9TG.7TurLRQJZpC','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:29:58',NULL),(1006,'민서','test4@gmail.com','$2b$14$z1ubuFN.Jzqi8MqzPxVNUOOzudZf4idbTefzFyGxe95ZOeo9yZEIG','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:30:28',NULL),(1007,'민서','test5@gmail.com','$2b$14$/T3yKXkruY6FddkU/QCI5ugZ8YnWUXUvRkPd/5jMQA0klr.336J0y','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:30:56',NULL),(1008,'민서','test6@gmail.com','$2b$14$23AULXN0ErYbAAw8DsgKQuBzHccG/q11W9zFmEYTeruOsocFfb3DG','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:37:19',NULL),(1009,'민서','test7@gmail.com','$2b$14$uXWXsPgVPo2GXmLiNNlgb.UVl1TmtbEy/cjzR46tV5I69PXJ/AzcC','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:38:18',NULL),(1010,'민서','test11@gmail.com','$2b$14$8uzMvDjUH793X2uO.qDo/OhL4xLklzFpF759eNzRrQElnC5cRgpwi','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:39:37',NULL),(1011,'민서','test12@gmail.com','$2b$14$mLSGKbhfVgg2TegJTIM4w.gZkHUHVTaYErUnnUOeAnV9cYklulmge','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:40:51',NULL),(1012,'민서','test8@gmail.com','$2b$14$u/T3zJr3yzT3m1HO5B6vxOD0UYiVqdi6y3/FQ/D9Qoz4ItFhwNjcC','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:41:44',NULL),(1013,'민서','test9@gmail.com','$2b$14$hX6RK8T5mKndJYgxzm3XnOxOc6Abm618JFnRdE/FfQ4PYqiHIXwkW','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:43:48',NULL),(1014,'민서','test10@gmail.com','$2b$14$MnlnK7aplsXVSAZqqNXtceH09U/9/mFQ/2YCgbyoJFTv7qFN3Ex6K','010-3333-3333','테헤란로427','2000-02-22',99999.00,'2023-06-05 06:44:45',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 18:42:20
