(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{NWVb:function(n,l,e){"use strict";e.r(l);var t=e("8Y7J");class o{}var i=e("pMnS"),u=e("5iza"),s=e("s9Uj"),r=e("3RX/"),a=e("2cNf"),d=e("SVse"),c=e("FdbF"),p=e("HHV2"),m=e("cUpR");e("dJ3e");class f{constructor(n,l,e,t,o,i,u,s){this.firestorePhpQuestionService=n,this.indexedDbQuizService=l,this.localStorageService=e,this.sessionStorageService=t,this.prismService=o,this.ngxLoader=i,this.sync=u,this.questionService=s,this.interval=null}ngOnInit(){this.sync.currentScore.subscribe(n=>{this.message=n}),this.getAnRandomQuestion()}ngAfterViewChecked(){this.prismService.highlightAll()}getAnRandomQuestion(){const n=this;this.interval&&(clearInterval(this.interval),this.interval=null),this.ngxLoader.start(),this.reset(),this.questionService.getQuestion().subscribe(l=>{n.setQuestion(l)})}setQuestion(n){n.answerRows.forEach((n,l)=>{n.userAnswer=!1}),n.finalAnswer=!1,this.question=n,this.prismService.highlightAll();const l=this;setTimeout(()=>{l.ngxLoader.stopAll()},200)}reset(){this.isCorrect=!0,this.btnText="Get next question now ",this.question={id:null,category:1,difficulty:1,type:1,finalAnswer:!1,questionRows:[{}],answerRows:[{},{},{},{}]}}validateEachAnswerRows(){let n=!0;this.question.answerRows.forEach((l,e)=>{n=n&&l.correct===l.userAnswer}),this.isCorrect=n}onValidate(n=10){const l=this;this.question.finalAnswer=!0,this.validateEachAnswerRows(),this.sync.updatePercentage(this.isCorrect);const e=this.isCorrect?"Correct":"Wrong";this.btnText=`${e} [new quiz in ${n} seconds]`,l.interval=setInterval(()=>{l.btnText=1==--n?`${e} [new quiz in ${n} second] or push to get it now`:`${e} [new quiz in ${n} seconds] or push to get it now`,0===n&&l.getAnRandomQuestion()},1e3)}}var g=e("CXAK"),h=e("bd2b"),b=e("Ug4g"),v=e("MFIp"),w=e("NmCd"),C=e("X1XT"),R=e("zO6L"),S=t["\u0275crt"]({encapsulation:2,styles:[],data:{}});function A(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-question",[],null,null,null,u.b,u.a)),t["\u0275did"](1,49152,null,0,s.a,[],{questionRow:[0,"questionRow"]},null)],function(n,l){n(l,1,0,l.context.$implicit)},null)}function F(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-answer",[],null,null,null,r.b,r.a)),t["\u0275did"](1,49152,null,0,a.a,[],{answerRow:[0,"answerRow"],disabled:[1,"disabled"],i:[2,"i"]},null)],function(n,l){n(l,1,0,l.context.$implicit,l.component.question.finalAnswer,l.context.index)},null)}function I(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"button",[["class","btn btn-sm btn-info"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.onValidate()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,[" Validate "]))],null,null)}function q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"button",[["class","btn btn-sm"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getAnRandomQuestion()&&t),t},null,null)),t["\u0275prd"](512,null,d["\u0275NgClassImpl"],d["\u0275NgClassR2Impl"],[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2]),t["\u0275did"](2,278528,null,0,d.NgClass,[d["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),t["\u0275ted"](3,null,[" >>> "," "]))],function(n,l){var e=l.component;n(l,2,0,"btn btn-sm",!1===e.question.finalAnswer?"btn-info":!0===e.isCorrect?"btn-success":"btn-danger")},function(n,l){n(l,3,0,l.component.btnText)})}function N(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,10,"div",[["class","php-container"],["style","margin-top: 50px"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,A)),t["\u0275did"](2,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,F)),t["\u0275did"](4,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275eld"](5,0,null,null,5,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,4,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](8,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,q)),t["\u0275did"](10,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){var e=l.component;n(l,2,0,e.question.questionRows),n(l,4,0,e.question.answerRows),n(l,8,0,!e.question.finalAnswer),n(l,10,0,e.question.finalAnswer)},null)}function y(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","container"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,2,"div",[["class","col-lg-12 col-md-12"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,N)),t["\u0275did"](4,16384,null,0,d.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](5,0,null,null,1,"ngx-ui-loader",[],null,null,null,c.b,c.a)),t["\u0275did"](6,770048,null,0,p.f,[m.b,t.ChangeDetectorRef,p.d],null,null)],function(n,l){n(l,4,0,l.component.question),n(l,6,0)},null)}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-random",[],null,null,null,y,S)),t["\u0275did"](1,8503296,null,0,f,[g.a,h.a,b.a,v.a,w.a,p.d,C.a,R.a],null,null)],function(n,l){n(l,1,0)},null)}var M=t["\u0275ccf"]("app-random",f,x,{},{},[]),T=e("JeY4"),k=e("vjkF"),O=e("oM70"),V=e("s7LF"),L=e("IheW"),z=e("xN82"),D=e("/Sf3"),E=e("iInd");class P{}var Q=e("+wA8"),$=e("PCNd"),j=e("91uq");e.d(l,"RandomModuleNgFactory",function(){return X});var X=t["\u0275cmf"](o,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,M,T.a,k.a,O.a]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[t.LOCALE_ID,[2,d["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,V.l,V.l,[]),t["\u0275mpd"](4608,V.b,V.b,[]),t["\u0275mpd"](4608,L.h,L.n,[d.DOCUMENT,t.PLATFORM_ID,L.l]),t["\u0275mpd"](4608,L.o,L.o,[L.h,L.m]),t["\u0275mpd"](5120,L.a,function(n){return[n]},[L.o]),t["\u0275mpd"](4608,L.k,L.k,[]),t["\u0275mpd"](6144,L.i,null,[L.k]),t["\u0275mpd"](4608,L.g,L.g,[L.i]),t["\u0275mpd"](6144,L.b,null,[L.g]),t["\u0275mpd"](4608,L.f,L.j,[L.b,t.Injector]),t["\u0275mpd"](4608,L.c,L.c,[L.f]),t["\u0275mpd"](5120,z.SimpleModalService,D.SimpleModalServiceFactory,[t.ComponentFactoryResolver,t.ApplicationRef,t.Injector,z.SimpleModalServiceConfig]),t["\u0275mpd"](1073742336,d.CommonModule,d.CommonModule,[]),t["\u0275mpd"](1073742336,E.q,E.q,[[2,E.v],[2,E.o]]),t["\u0275mpd"](1073742336,P,P,[]),t["\u0275mpd"](1073742336,V.k,V.k,[]),t["\u0275mpd"](1073742336,V.c,V.c,[]),t["\u0275mpd"](1073742336,V.j,V.j,[]),t["\u0275mpd"](1073742336,L.e,L.e,[]),t["\u0275mpd"](1073742336,L.d,L.d,[]),t["\u0275mpd"](1073742336,p.b,p.b,[]),t["\u0275mpd"](1073742336,Q.SimpleModalModule,Q.SimpleModalModule,[]),t["\u0275mpd"](1073742336,$.a,$.a,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,E.m,function(){return[[{path:"",component:f}]]},[]),t["\u0275mpd"](256,L.l,"XSRF-TOKEN",[]),t["\u0275mpd"](256,L.m,"X-XSRF-TOKEN",[]),t["\u0275mpd"](256,z.SimpleModalServiceConfig,{container:null},[]),t["\u0275mpd"](256,j.DefaultSimpleModalOptionConfig,j.defaultSimpleModalOptions,[]),t["\u0275mpd"](256,p.e,{bgsColor:"#00ACC1",bgsOpacity:.5,bgsPosition:"center-center",bgsSize:60,bgsType:"rectangle-bounce-pulse-out",blur:5,fgsColor:"#bc75ea",fgsPosition:"center-center",fgsSize:100,fgsType:"cube-grid",gap:24,logoPosition:"center-center",logoSize:120,logoUrl:"",masterLoaderId:"master",overlayBorderRadius:"0",overlayColor:"rgba(40, 40, 40, 0.8)",pbColor:"#00ACC1",pbDirection:"ltr",pbThickness:3,hasProgressBar:!0,text:"loading ...",textColor:"#FFFFFF",textPosition:"center-center"},[])])})}}]);