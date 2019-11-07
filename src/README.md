## git

```
git clone https://github.com/alceanicu/zce.git
cd zce
npm install
ng serve

npm outdated
npm update

ng test --code-coverage --no-watch
```

## ng
```
ng new zce --routing=true --style=scss

-- modules
ng g m home --routing=true
ng g m about --routing=true
ng g m prepare --routing=true
ng g m exam --routing=true
ng g m shared
ng g m core

-- components
ng g c home/home
ng g c about/about
ng g c question-display
ng g c prepare/prepare
ng g c exam/exam
ng g c shared/layout/footer
ng g c shared/layout/header
ng g c shared/answer
ng g c shared/question
ng g c shared/confirm
ng g c shared/page-not-found

-- interfaces
ng g i core/interfaces/answer-row --type=interface
ng g i core/interfaces/config --type=interface
ng g i core/interfaces/confirm --type=interface
ng g i core/interfaces/countdown-time --type=interface
ng g i core/interfaces/deactivate-component --type=interface
ng g i core/interfaces/exam --type=interface
ng g i core/interfaces/exam-question --type=interface
ng g i core/interfaces/question --type=interface
ng g i core/interfaces/question-row --type=interface
ng g i core/interfaces/score --type=interface
ng g i core/interfaces/option --type=interface
ng g i core/interfaces/data-service --type=interface

-- class (model)
ng g class core/models/countdown-time --type=model
ng g class core/models/exam --type=model
ng g class core/models/question --type=model
ng g class core/models/score --type=model

-- services
ng g s core/services/countdown/countdown
ng g s core/services/firestore/php-question
ng g s core/services/indexeddb/indexed-db-quiz
ng g s core/services/local-storage/local-storage
ng g s core/services/prism/prism
ng g s core/services/question/question
ng g s core/services/session-storage/session-storage
ng g s core/services/sync-countdown-time/sync-countdown-time
ng g s core/services/sync-score/sync-score
ng g s core/services/sync-location/sync-location
ng g s core/services/pdf/pdf
ng g s core/services/logger/logger

-- guards
ng g guard core/guards/exam/exam

-- others
ng g class core/utils/abstract/sync-abstract
ng g class core/utils/helper

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

npm i webpack-bundle-analyzer -D
npm cache clear
```

### others

> [PrismJs](https://auralinna.blog/post/2017/code-syntax-highlighting-with-angular-and-prismjs)
>

