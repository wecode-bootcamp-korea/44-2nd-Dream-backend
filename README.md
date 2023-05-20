# 44-2nd-Dream-backend 경매 플랫폼 제작 프로젝트

박세익([**Github**](https://github.com/), [회고록]())<br>
장다희([**Github**](https://github.com/walwald), [회고록](https://walwaldev.tistory.com/57))<br>
김민서([**Github**](https://github.com/), [회고록](https://just-process.tistory.com/45/))<br>
송석준([**Github**](https://github.com/), [회고록]())<br>
<br>
> **위코드 44기 2차 프로젝트 <br>
p2p 명품 경매 거래 플랫폼 KREAM을 모델링하여 레고 상품 p2p 경매 거래 플랫폼 웹사이트 제작<br>
[DREAM 결과물 웹사이트 링크]()<br>
[결과물 시연 영상 링크](https://www.youtube.com/watch?v=UFuS91VcVp8)**

> **짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인/기획 부분만 클론했습니다.<br>
개발은 초기 세팅부터 전부 직접 구현했으며, 아래 데모 영상에서 보이는 부분은 모두 백앤드와 연결하여 실제 사용할 수 있는 서비스 수준으로 개발한 것입니다.*


## 📍프로젝트 기간 & 인원
* 프로젝트 기간: 2주 (2023.04.20 ~ 2023.05.04)   
* 개발 인원:  
  `Frontend`: 최선영(Product Manager), 김영운, 조건호 <br>
  `Backend`: 박세익(Project Manager), 장다희, 김민서, 송석준 <br>
* [프론트엔드 Github 저장소](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-frontend)
* 모델링한 사이트: [KREAM](https://kream.co.kr/)

<br>


## 📍사용 기술

* BackEnd   

 |JavaScript|Node.js|Jest|MySql|Rest|Prettier|Docker|AWS|
|---|---|---|---|---|---|---|---|
|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /></div>| <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/jest-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/restapi-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/docker-icon.svg" alt="icon" width="65" height="65" /></div>|<div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /></div>|
<br>

* 협업 <br><br>

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <br>
<img src="https://img.shields.io/badge/trello-0055cc?style=for-the-badge&logo=trello&logoColor=yellow"> <br>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"> <br>
<img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=Slack&logoColor=wihte"> <br>
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"> <br>
<br>


 ## 📍[ERD](https://dbdiagram.io/d/64426bdf6b31947051f9b394)
 > User가 구매자이자 판매자가 될 수 있으며, 하나의 Product에 구매 입찰과 판매 입찰이 동시에 이루어진다는 점에 주안점을 두고 데이터베이스 모델 구축 <br><br>
![DREAM (3)](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/b18561e6-0888-4aaa-8eaa-452122d73e11)


 ## 📍[Postman](https://documenter.getpostman.com/view/26858291/2s93eWzskR)
> Postman의 Documentation을 프로젝트 진행 시 프론트엔드와의 소통 및 협업 도구로 활용 <br><br>
<img width="1512" alt="스크린샷 2023-05-18 23 35 50" src="https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/3bff3e11-24d2-495c-81e4-f815da108948"><br>

 <br>
 
 
 ## 핵심 기능
 
 ### Users
 **회원가입(Kakao Social Login)**<br>
 **로그인(Kakao Social Login)**

https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/acdfa770-73bd-4775-a10a-e924592faed4

 : KaKao에서 제공하는 API를 활용하여 user 회원 가입, 로그인 기능 구현
 
 <br>
 
 ***
 
### Products

**상품 리스트 & 필터**

![image](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/f3ea9ebf-8142-414a-9436-07e7f7494f08)

: query parameter로 필터 및 정렬 조건을 전달 받아, 그에 따라 상품 리스트를 응답하는 API
-  좋아요 많은 순, 즉시 구매가 순, 즉시 판매가 순, 리뷰 순, 프리미엄 가격 순으로 정렬 가능
-  상품 카테고리, 사용 연령, 난이도로 필터 가능 

<br>

**상품 상세 정보** 

![image](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/34ac8dc6-1671-44df-92c8-8c3ef5de0c75)

: path parameter로 productId를 전달 받아, 해당하는 product의 상세 정보를 응답하는 API.

- 상품명, 모델넘버, 카테고리, 좋아요 수 등 기본 정보 뿐만 아니라, 즉시 구매가, 즉시 판매가, 최근 거래가, 프리미엄 퍼센트 등의 경매가 관련 데이터도 함께 전달
- 즉시 구매가는 판매 입찰된 금액 중 가장 낮은 금액
- 즉시 판매가는 구매 입찰된 금액 중 가장 높은 금액
- 최근 거래가는 체결 거래 중 가장 최신 거래의 거래 성사 가격
- 프리미엄 퍼센트는 상품 발매가와 최근 거래가의 비율로 계산

<br>

***

 ### Bid

 
 **구매 입찰**
 

https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/e8887c3d-0b93-4e28-b57c-53c8156b11bd


 **즉시 구매**
  

https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/0837d058-7d15-4b29-8b2f-5e2a775153c5

 
 **판매 입찰**
 

https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/8e57fdb7-82eb-4eeb-8f2c-d52bc1164ace


 **즉시 판매**
 

https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/0de776fd-5559-4882-b4da-bff2eea4cd7d

**입찰 API**

:[상품 productId, 구매/판매 중 해당하는 입찰 유형, 입찰 금액, 입찰 마감 기한]을 request의 body로 전달받아 입찰 내역이 기록되는 API. 
- userId는 token의 payload에 저장된 정보를 이용함.
- 입찰 금액에 따라 즉시 거래가 성사 되기도 함.
- 즉시 거래가 성사되는 경우, transaction을 사용하여 [거래 건 생성, 입찰 상태를 낙찰로 변경, 거래 상대방의 입찰 내역도 낙찰 상태로 변경] 등의 처리가 동시에 이루어지도록 함.
- 해당 user와 상품에 대해 기존 입찰 내역이 존재할 경우 '금액' 혹은 '입찰 기한'이 변경되도록 하여, 입찰 건 생성 외에도 입찰 내역 업데이트에 본 API가 사용될 수 있도록 함.
<br>
 
**입찰 상세 내역 조회 API**

: 입찰 금액 및 기한 입력 후 이어지는 개인 정보 입력 페이지에서 입찰 내역 확인 용으로 요청되는 입찰 상세 정보 조회 API.
- path parameter로 상품의 productId를, query parameter로 구매/판매 등의 입찰 유형을 전달 받음. userId는 token의 payload에 저장된 정보를 이용함.
- 거래 성사 여부에 따라 dealId(거래 Id)와 dealNumber(고유 거래 번호) 전달 여부가 달라짐. 거래가 성사되지 않고 입찰만 완료된 경우 null 값으로로 전달.
- 상품에 대한 기본 정보와, 입찰 건의 Id, 입찰 금액, 입찰 기한, 수수료 금액 등 전달함.
 
 
 <br>
 
 ***
 
 ### Search
 
 
https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/072f8bfd-b3f0-483a-9115-a07871b613c1
 
 **상품 검색**
 
 : 상품 검색 기능 API
 - keyword에 상품명 또는 basic, building, movie, car 등의 카테고리 명 기입 시 검색됨
 
 **인기 검색어**
 :누적 인기검색어 조회 API
 - 검색어 데이터를 역대 검색량 순으로 정렬하여 상위 10개의 검색어 응답

  <br>
  
 ***

 ### Likes

https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/e7475a80-6037-4691-aa5d-7af24bbb8110

**관심상품 등록/삭제**<br>
: 관심상품 등록/삭제 API
- path parameter로 productId를 받아 해당 유저의 관심상품 생성
- 동일한 product와 동일한 user에 대해 API가 재실행될 경우 관심상품 삭제 <br>

**관심상품 리스트**<br>
: user별로 관심 상품 리스트를 조회하는 API
- 경매플랫폼이기 때문에 즉시구매가와 함께 관심상품 리스트를 보여줌

 <br>
 
   ***
 
 ### Reviews

https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/119482288/4a612806-8010-4162-8d5b-fa2b8bff27c5

 **리뷰 게시**<br>
 
 :리뷰를 게시하는는 API
 - multer-3와 multer를 이용하여 s3에 사진을 올려 사진리뷰를 게시 가능하도록 함 <br>
 
 **리뷰 조회**<br>
 : 사용자가 작성한 리뷰를 불러오는 API
 - productId를 사용하여 데이터베이스에서 제품에 대한 리뷰를 검색
 - appDataSource 개체를 사용하여 SQL 쿼리를 실행하여 reviews 테이블에서 특정 필드를 선택하고 users 및review_images 테이블과 LEFT JOIN 함
 - 제공된 product_id를 기반으로 결과를 필터링
 - 쿼리가 성공하면 함수는 검색된 데이터를 반환하고, 그렇지 않은 경우 "DATABASE_ERROR" 메시지와 함께 DatabaseError가 발생하게 함 <br>
 
 **리뷰 수정**<br>
 : 리뷰를 업데이트(수정)를 할 수 있는 API
 - reviewId를 확인하고, 존재하는 reviewId라면 리뷰 수정 가능
 - reviewImg는 사용자가 이미지를 지우고 싶다면 데이터베이스에서 s3 해당 이미지의 url이 삭제 되도록 구현함 <br>
 
 **리뷰 삭제**<br>
 : 사용자가 작성한 리뷰를 삭제할 수 있는 API
 - appDataSource 객체를 사용하여 SQL 쿼리를 실행하는 queryRunner를 생성하여 트랜잭션 내에서 리뷰와 해당 이미지를 삭제함
 - 프로세스 중에 오류가 발생하면 함수는 트랜잭션을 롤백하고 "DATABASE_ERROR" 메시지와 함께 DatabaseError를 발생시킴 <br>
  <br>
  
  ***
  
 ### Payment
 ![image](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/29151875-568c-4c0c-b3f2-e4600cfbc1e3)

![image](https://github.com/wecode-bootcamp-korea/44-2nd-Dream-backend/assets/120387100/5e3806a3-0a6b-4d89-b17a-339938c1ac92)


**회원 주소 저장**<br>
: 배송지로 사용될 회원의 주소 저장 API <br>

**회원 계좌번호 & 카드번호 저장**<br>
: 회원의 신규 입력된 계좌번호/카드 번호 저장 API
- 판매 입찰 절차 중, user의 카드 번호 및 계좌 번호 입력 과정에서 신규 계좌/카드 번호 등록 시 사용됨
- userId는 token의 payload에 저장된 정보를 이용함 <br>

**회원별 계좌번호/카드번호 리스트**<br>
:  회원별 등록된 계좌번호/카드번호 조회 API
- 판매 입찰 절차 중, user의 계좌 번호/카드 번호 입력 과정에서 기 입력된 카드 번호 list를 불러오는 기능
- userId는 token의 payload에 저장된 정보를 이용함 <br>

**즉시 구매 결제**<br>
: 거래가 성사되었을 때 구매자의 결제 진행 시 사용되는 API
- 'dealNumber'를 사용하여 데이터베이스에서 구매 거래에 대한 결제 정보를 검색
- buyings 테이블에 addressId를 추가하고 deals 테이블에서 deal_status를 결제 완료로 변경 <br>

**즉시 판매 정산**<br>
: 거래가 성사되었을 때 판매자의 정산 진행 시 사용되는 API
- 'dealNumber'를 사용하여 데이터베이스에서 판매 거래에 대한 결제 정보 검색
- 'product_images', 'sellings' 및 'deals' 테이블에서 특정 필드를 선택하고 지정된 열을 기반으로 JOIN하는 'queryRunner'를 사용하여 SQL 쿼리를 실행시킴 
- 쿼리는 제공된 'dealNumber'를 기반으로 결과를 필터링함
- 쿼리가 성공하면 트랜잭션을 커밋하고 검색된 데이터를 반환하고 렇지 않으면 트랜잭션을 롤백하고 "DATABASE_ERROR" 메시지와 DatabaseError를 발생시킴 <br>

**구매 입찰 완료**<br>
: 구매 입찰 완료 시 사용되는 API
- 데이터베이스의 구매 입찰에 addressId를 업데이트하도록 설계
- userId 및 biddingId를 기반으로 데이터베이스의 buyings 테이블에서 address_id필드 업데이트 <br>

**판매 입찰 완료**<br>
: 판매 입찰 완료 시 사용되는 API
- 데이터베이스의 특정 판매 거래 입찰에 대한 카드 및 계좌 번호 ID를 업데이트하도록 설계
- userId 및 biddingId를 기반으로 데이터베이스의 sellings 테이블에서 card_number_id 및 account_number_id 필드를 업데이트하기 위해 queryRunner를 사용하여 두 개의 별도 SQL 쿼리를 실행시킴
- 쿼리가 성공적으로 완료되면 함수는 트랜잭션을 커밋하고, 그렇지 않은 경우 트랜잭션을 롤백하고 "DATABASE_ERROR" 메시지와 함께 DatabaseError를 발생시킴
  <br>
  
***
 ## Reference

- 이 프로젝트는 [KREAM](https://kream.co.kr/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
