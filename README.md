# 44-2nd-Dream-backend 경매 플랫폼 제작 프로젝트

박세익([**Github**](https://github.com/), [회고록](https://walwaldev.tistory.com/))<br>
장다희([**Github**](https://github.com/walwald), [회고록](https://walwaldev.tistory.com/57))<br>
김민서([**Github**](https://github.com/), [회고록](https://walwaldev.tistory.com/))<br>
송석준([**Github**](https://github.com/), [회고록](https://walwaldev.tistory.com/))<br>
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
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"> <br>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <br>
<img src="https://img.shields.io/badge/trello-0055cc?style=for-the-badge&logo=trello&logoColor=yellow"> <br>
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
 **회원가입**

<br> 

 **로그인(Kakao Social Login)**
 
***
 
 ### Products

 **상품 정보** 

<br>

**상품 검색**

***

<br>
 
 ### Bid
 
 ***
 
 <br>
 
 ### Payment
 
 **구매 입찰**
 
 **즉시 구매**
 
 **판매 입찰**
 
 **즉시 판매**
 
 ***
 
 <br>
 
 ### Search
 
 **상품 검색**
 
 **인기상품 검색**
 
 ***
 
 <br>
 
 ### Likes
 
 ***
 
 <br>
 
 ### Reviews
 
 **CREATE :**
 
 **READ :**
 
 **UPDATE :**
 
 **DELETE :**
 
 ## Reference

- 이 프로젝트는 [KREAM](https://kream.co.kr/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
