## git

```
git clone https://github.com/alceanicu/zce.git
cd zce
npm install
ng serve

npm outdated
npm update
```

## ng
```
ng new zce --routing=true --style=scss

-- modules
ng g m home --routing=true
ng g m about --routing=true
ng g m random --routing=true
ng g m exam --routing=true

-- components
ng g c home/home
ng g c about/about
ng g c random/random
ng g c exam/exam
ng g c shared/layout/footer
ng g c shared/layout/header
ng g c shared/confirm/confirm 

-- models
ng g m core

-- interfaces
ng g i core/models/i-question --type=interface
ng g i core/models/i-question-row --type=interface
ng g i core/models/i-answer-row --type=interface
ng g i core/models/i-config --type=interface
ng g i core/models/i-exam --type=interface
ng g i core/models/i-exam-question --type=interface
ng g i core/models/i-deactivate-component --type=interface
ng g i core/models/i-sync --type=interface

-- class
ng g class core/models/question --type=model
ng g class core/models/exam --type=model
ng g class core/utils/helper

-- services
ng g s core/services/prism/prism
ng g s core/services/session-storage/session-storage
ng g s core/services/local-storage/local-storage
ng g s core/services/firestore/php-question
ng g s core/services/data-sync/data-sync
ng g s core/services/question/question
ng g s core/services/countdown/countdown

```

## npm - angular

```
npm i --save @angular/animations
npm i --save @angular/fire firebase
npm i --save prismjs
npm i --save rxjs
npm i --save dexie
npm i --save pdfmake
npm i --save angular-svg-round-progressbar
npm i --save moment
npm i --save ngx-simple-modal
npm i --save ngx-toastr
npm i --save ngx-ui-loader
npm i --save bootstrap
npm i --save @ng-bootstrap/ng-bootstrap
```

### ngh

```
ng build --prod --base-href="./"
ngh --dir dist/zce --message="V 2.0.0"
```

### others

> [PrismJs](https://auralinna.blog/post/2017/code-syntax-highlighting-with-angular-and-prismjs)
>

