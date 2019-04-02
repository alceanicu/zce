# ng

```
ng new zce --routing=true 

ng g m home --routing=true
ng g c home/home
ng g m random --routing=true
ng g c random/random
ng g m exam --routing=true
ng g c exam/exam

ng g c shared/layout/footer
ng g c shared/layout/header

ng g m core
ng g i core/models/i-question --type=interface
ng g i core/models/i-question-row --type=interface
ng g i core/models/i-answer-row --type=interface
ng g i core/models/i-config --type=interface

ng g class core/models/question --type=model

ng g s core/services/prism/prism
ng g s core/services/session-storage/session-storage
ng g s core/services/local-storage/local-storage
ng g s core/services/firestore/php-question
ng g s core/services/data-share/data-share        ## fixme
ng g s core/services/question/question

ng g class core/utils/helper

ng serve
```

## npm

```
npm i --save @ng-bootstrap/ng-bootstrap
## npm i --save bootstrap                         ## FARA  
npm i --save @fortawesome/fontawesome-free
npm i --save prismjs
npm i --save firebase @angular/fire
npm i --save dexie
npm i --save ngx-ui-loader
npm i --save angular-svg-round-progressbar
npm i --save pdfmake

##  npm i --save rxjs rxjs-compat
##  npm i --save ngx-toastr ngx-ui-loader
```

### ngh

```
ng build --prod --base-href="./"
ngh --dir dist/zce --message="V 1.0.1"
```

## git
