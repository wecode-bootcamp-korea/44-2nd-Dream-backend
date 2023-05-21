# 44-2nd-Dream-backend 경매 플랫폼 제작 프로젝트

박세익([**Github**](https://github.com/), [회고록]())<br>
장다희([**Github**](https://github.com/walwald), [회고록](https://walwaldev.tistory.com/57))<br>
김민서([**Github**](https://github.com/), [회고록](https://just-process.tistory.com/45/))<br>
송석준([**Github**](https://github.com/), [회고록]())<br>
<br>
> **위코드 44기 2차 프로젝트 <br>
p2p 명품 경매 거래 플랫폼 KREAM을 모델링하여 레고 상품 p2p 경매 거래 플랫폼 웹사이트 제작<br>
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


**즉시 구매 결제**<br>
: 거래가 성사되었을 때 구매자의 결제 진행 시 사용되는 API
- 'dealNumber'를 사용하여 데이터베이스에서 구매 거래에 대한 결제 정보를 검색
- buyings 테이블에 addressId를 추가하고 deals 테이블에서 deal_status를 결제 완료로 변경 <br>


**구매 입찰 완료**<br>
: 구매 입찰 완료 시 사용되는 API
- 데이터베이스의 구매 입찰에 addressId를 업데이트하도록 설계
- userId 및 biddingId를 기반으로 데이터베이스의 buyings 테이블에서 address_id필드 업데이트 <br>


  
***
 ## Reference

- 이 프로젝트는 [KREAM](https://kream.co.kr/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
