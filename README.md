# Camper's Project REST API

## Camper's 구조
<pre>
  .
  ├── app.js                     
  ├── bin 
  │   └── www
  ├── package.json
  ├── config
  ├── controllers
  ├── middlewares
  ├── models
  ├── public
  │   ├── images
  │   ├── javascripts
  │   └── stylesheets
  │       └── style.css
  ├── routes                 
  │   ├── index.js      
  │   ├── users.js
  ├── services
  └── views
      ├── error.pug
      ├── index.pug
      └── layout.pug
</pre>

- MVC 패턴
- routes → controller (middlewares) → services → models
- 검색 → query string / 조회 → path parameter


