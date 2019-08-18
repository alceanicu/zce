## git

```
git clone https://github.com/alceanicu/zce.git
cd zce
npm install
ng serve
```

## ng
```
ng new zce --routing=true 

ng g m home --routing=true
ng g c home/home
ng g m about --routing=true
ng g c about/about
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
ng g i core/models/i-exam --type=interface
ng g i core/models/i-exam-question --type=interface
ng g i core/models/i-deactivate-component  --type=interface

ng g class core/models/question --type=model
ng g class core/models/exam --type=model

ng g s core/services/prism/prism
ng g s core/services/session-storage/session-storage
ng g s core/services/local-storage/local-storage
ng g s core/services/firestore/php-question
ng g s core/services/data-share/data-share                          ## fixme
ng g s core/services/data-share-countdown/data-share-countdown      ## fixme
ng g s core/services/question/question
ng g s core/services/countdown/countdown

ng g class core/utils/helper

ng serve
```

## npm - angular

```
npm i --save @ng-bootstrap/ng-bootstrap             ## ??
npm i --save @fortawesome/fontawesome-free          ## ??
npm i --save prismjs
npm i --save firebase @angular/fire
npm i --save dexie
npm i --save ngx-ui-loader
npm i --save pdfmake
npm i --save angular-svg-round-progressbar
npm i --save moment
npm i --save ngx-toastr
npm i --save @angular/animations
npm i --save rxjs

## removed
## npm i --save bootstrap                             
## npm i --save ngx-countdown                       

npm outdated
npm update
```

### ngh

```
ng build --prod --base-href="./"
ngh --dir dist/zce --message="V 1.1.5"
```
