(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{xDz6:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),i=function(){return function(){}}(),o=e("pMnS"),u=e("Ip0R"),r=e("5iza"),s=e("s9Uj"),a=e("3RX/"),c=e("2cNf"),d=e("FdbF"),m=e("iJXZ"),p=e("ZYjt"),f=e("pugT"),g=(e("lUfZ"),e("dJ3e"),e("M0ag")),h=function(){function n(){}return n.prototype.canDeactivate=function(n,l,e,t){return!n.canExit||n.canExit()},n.ngInjectableDef=t["\u0275\u0275defineInjectable"]({factory:function(){return new n},token:n,providedIn:"root"}),n}(),v=e("sKXY"),b=(e("a+Vh"),e("pKmL"),function(){function n(n,l,e,t,i,o,u,r,s,a,c){this.simpleModalService=n,this.moment=l,this.countdownService=e,this.syncCountdownTimeService=t,this.prismService=i,this.ngxUiLoaderService=o,this.questionService=u,this.toastrService=r,this.location=s,this.localStorageService=a,this.router=c,this.markForReviewArray=[],this.subscriptions=[]}return n.prototype.canExit=function(){var n=this;if(this.exam.finished)return!0;var l=this.simpleModalService.addModal(g.a,{title:"Confirm",message:"Do you wish to finish the current exam?"}).subscribe((function(l){return!!l&&(n.finishExam(),!0)}));setTimeout((function(){return l.unsubscribe()}),1e4)},n.prototype.ngOnInit=function(){var n=this,l=this;this.exam=new v.b,this.subscriptions.push(this.localStorageService.getAppConfig().subscribe((function(n){return l.exam.setMax(n.counter)}),(function(n){return console.log(n)})));var e=this.moment(this.exam.startAt),t=this.moment(e).add(5400,"seconds");this.subscriptions.push(this.countdownService.countdown().subscribe((function(n){3600===n&&l.toastrService.success("You have another hour to finish the exam","Time left"),1800===n&&l.toastrService.success("You have another 30 minutes to finish the exam","Time left"),600===n&&l.toastrService.success("You have another 10 minutes to finish the exam","Time left"),300===n&&l.toastrService.success("You have less than 5 minutes to finish the exam","Times left!");var e=l.syncCountdownTimeService.getValue();e.time=l.getTimeString(t),l.syncCountdownTimeService.setValue(e)}),(function(n){return console.log(n)}),(function(){return n.finishExam()}))),this.countdownService.start(5400),this.toastrService.success("You have 90 minutes to finish your exam. Good luck!","Exam simulation start!")},n.prototype.ngAfterViewChecked=function(){this.isNew&&!this.highlighted&&(this.prismService.highlightAll(),this.highlighted=!0)},n.prototype.ngOnDestroy=function(){this.subscriptions.forEach((function(n){return n.unsubscribe()})),this.subscription instanceof f.a&&this.subscription.unsubscribe()},n.prototype.getTimeString=function(n){var l=this.moment(),e=this.moment.duration(n.diff(l));return e.hours().toString().padStart(2,"0")+":"+e.minutes().toString().padStart(2,"0")+":"+e.seconds().toString().padStart(2,"0")},n.prototype.setBtnClasses=function(n){var l=!1;for(var e in this.exam.questions)this.exam.questions.hasOwnProperty(n)&&(l=!0);return this.index===n?{"btn-danger":!0}:this.index!==n&&-1!==this.markForReviewArray.indexOf(n)?{"btn-warning":!0}:this.index!==n&&l?{"btn-success":!0}:void 0},Object.defineProperty(n.prototype,"questionsArray",{get:function(){return this.exam.questionsArray},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"currentExam",{get:function(){return this.exam},enumerable:!0,configurable:!0}),n.prototype.getQuestion=function(n,l){this.reset();var e=this;this.index=l,void 0===this.exam.questions[l]?this.subscription=this.questionService.getOneQuestionById(n).subscribe((function(t){var i={id:n,question:t,markForReview:!1,correct:!1};e.exam.setQuestion(l,i),e.setCurrentQuestion(i)}),(function(n){return console.log(n)})):this.setCurrentQuestion(this.exam.questions[l])},n.prototype.validateCurrentExamQuestion=function(){void 0!==this.examQuestion&&(this.examQuestion.correct=this.examQuestion.question.validate(!1))},n.prototype.setCurrentQuestion=function(n){var l=this;this.examQuestion=n;var e=this;setTimeout((function(){l.isNew=!0,e.ngxUiLoaderService.stopAll()}),200)},n.prototype.reset=function(){this.subscription instanceof f.a&&this.subscription.unsubscribe(),this.validateCurrentExamQuestion(),this.ngxUiLoaderService.start(),this.isNew=!1,this.highlighted=!1},n.prototype.disabledPrevBtn=function(){return void 0===this.index||this.index<=0},n.prototype.disabledMarkForReviewBtn=function(){return void 0===this.index},n.prototype.disabledNextBtn=function(){return void 0===this.index||this.index>=69},n.prototype.getPrevQuestion=function(){var n=--this.index;this.getQuestion(this.exam.questionsArray[n],n)},n.prototype.getNextQuestion=function(){var n=++this.index;this.getQuestion(this.exam.questionsArray[n],n)},n.prototype.markForReview=function(){var n=this.markForReviewArray.indexOf(this.index);-1===n?this.markForReviewArray.push(this.index):this.markForReviewArray.splice(n,1)},n.prototype.goToHome=function(){var n=this.location.prepareExternalUrl(this.location.path());-1!==["/exam","/zce/exam"].indexOf(n)&&this.router.navigate(["/home"]).then()},n.prototype.finishExam=function(){this.validateCurrentExamQuestion(),this.exam.finish();var n=this;(this.exam.score>=50?this.toastrService.success("Congratulations you passed the exam!","Exam result!",{closeButton:!0}):this.toastrService.warning("You did not passed the exam!","Exam result!",{closeButton:!0})).onHidden.subscribe((function(){return n.goToHome()}),(function(n){return console.log(n)}),(function(){return console.log("You answered correctly to "+n.exam.score+" questions from 70")}))},n}()),x=e("xN82"),y=e("revU"),C=e("GA1s"),w=e("NmCd"),R=e("zO6L"),S=e("SZbH"),I=e("Ug4g"),k=e("ZYCi"),O=t["\u0275crt"]({encapsulation:0,styles:[[".modal[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.4);bottom:0;height:100%;left:0;overflow:hidden;padding:0 16px;position:fixed;right:0;top:0;text-align:center;z-index:10}.modal.fade-anim[_ngcontent-%COMP%]{transition:opacity .4s ease-in-out;will-change:opacity;opacity:0}.modal.fade-anim.in[_ngcontent-%COMP%]{opacity:1}.modal-open[_ngcontent-%COMP%]{overflow:hidden}.modal-content[_ngcontent-%COMP%]{background-color:#fff;border-radius:4px;margin:16px auto;max-width:580px;position:relative;transition:opacity .4s ease-in-out;width:100%;will-change:opacity;display:inline-block;text-align:left}.modal-content-size-m[_ngcontent-%COMP%]{max-width:992px}.modal-content-size-l[_ngcontent-%COMP%]{max-width:1200px}.modal-footer[_ngcontent-%COMP%], .modal-header[_ngcontent-%COMP%]{align-items:center;display:flex;height:56px;padding:0 16px}.modal-header[_ngcontent-%COMP%]{border-bottom:1px solid #cecece}.modal-body[_ngcontent-%COMP%]{padding:16px}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #cecece}"]],data:{}});function F(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"button",[["class","btn btn-sm btn-primary"],["style","width: 30px"],["type","button"]],[[8,"title",0]],[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getQuestion(n.context.$implicit,n.context.index)&&t),t}),null,null)),t["\u0275prd"](512,null,u["\u0275NgClassImpl"],u["\u0275NgClassR2Impl"],[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2]),t["\u0275did"](2,278528,null,0,u.NgClass,[u["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),t["\u0275eld"](3,0,null,null,1,"small",[],null,null,null,null,null)),(n()(),t["\u0275ted"](4,null,["",""]))],(function(n,l){n(l,2,0,"btn btn-sm btn-primary",l.component.setBtnClasses(l.context.index))}),(function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.context.$implicit,"")),n(l,4,0,l.context.index+1)}))}function N(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"button",[["class","btn btn-sm btn-primary"],["style","width: 30px"],["type","button"]],[[8,"title",0]],[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getQuestion(n.context.$implicit,n.context.index+35)&&t),t}),null,null)),t["\u0275prd"](512,null,u["\u0275NgClassImpl"],u["\u0275NgClassR2Impl"],[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2]),t["\u0275did"](2,278528,null,0,u.NgClass,[u["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),t["\u0275eld"](3,0,null,null,1,"small",[],null,null,null,null,null)),(n()(),t["\u0275ted"](4,null,["",""]))],(function(n,l){n(l,2,0,"btn btn-sm btn-primary",l.component.setBtnClasses(l.context.index+35))}),(function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.context.$implicit,"")),n(l,4,0,l.context.index+36)}))}function M(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,8,"div",[["class","col-lg-12 col-md-12"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"div",[["class","btn-toolbar"],["role","toolbar"],["style","margin: 5px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,2,"div",[["class","btn-group"],["role","group"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,F)),t["\u0275did"](4,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275eld"](5,0,null,null,3,"div",[["class","btn-toolbar"],["role","toolbar"],["style","margin: 5px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group"],["role","group"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,N)),t["\u0275did"](8,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){var e=l.component;n(l,4,0,e.questionsArray.slice(0,35)),n(l,8,0,e.questionsArray.slice(35,70))}),null)}function E(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-question",[],null,null,null,r.b,r.a)),t["\u0275did"](1,114688,null,0,s.a,[],{questionRow:[0,"questionRow"]},null)],(function(n,l){n(l,1,0,l.context.$implicit)}),null)}function T(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-answer",[],null,null,null,a.b,a.a)),t["\u0275did"](1,114688,null,0,c.a,[],{answerRow:[0,"answerRow"],disabled:[1,"disabled"],i:[2,"i"]},null)],(function(n,l){n(l,1,0,l.context.$implicit,l.component.examQuestion.question.finalAnswer,l.context.index)}),null)}function P(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["style","margin-top: 50px"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](2,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,T)),t["\u0275did"](4,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(n,l){var e=l.component;n(l,2,0,e.examQuestion.question.questionRows),n(l,4,0,e.examQuestion.question.answerRows)}),null)}function Q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"div",[["class","col-lg-12 col-md-12"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](2,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,2,0,l.component.examQuestion)}),null)}function q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"div",[["class","row"],["style","margin-top: 10px"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,Q)),t["\u0275did"](2,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,2,0,l.component.isNew)}),null)}function A(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Mark for review"]))],null,null)}function D(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Unmark for review"]))],null,null)}function V(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,17,"div",[["class","row"],["style","margin-top: 10px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,4,"div",[["class","col-lg-4 col-md-4"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,3,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,2,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,1,"button",[["class","btn btn-sm btn-primary btn-block"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getPrevQuestion()&&t),t}),null,null)),(n()(),t["\u0275ted"](-1,null,["PREVIEW "])),(n()(),t["\u0275eld"](6,0,null,null,6,"div",[["class","col-lg-4 col-md-4"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,5,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](8,0,null,null,4,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](9,0,null,null,3,"button",[["class","btn btn-sm btn-warning btn-block"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.markForReview()&&t),t}),null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,A)),t["\u0275did"](11,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),t["\u0275and"](0,[["elseBlock",2]],null,0,null,D)),(n()(),t["\u0275eld"](13,0,null,null,4,"div",[["class","col-lg-4 col-md-4"]],null,null,null,null,null)),(n()(),t["\u0275eld"](14,0,null,null,3,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](15,0,null,null,2,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](16,0,null,null,1,"button",[["class","btn btn-sm btn-primary btn-block"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getNextQuestion()&&t),t}),null,null)),(n()(),t["\u0275ted"](-1,null,["NEXT "]))],(function(n,l){var e=l.component;n(l,11,0,-1===e.markForReviewArray.indexOf(e.index),t["\u0275nov"](l,12))}),(function(n,l){var e=l.component;n(l,4,0,e.disabledPrevBtn()),n(l,9,0,e.disabledMarkForReviewBtn()),n(l,16,0,e.disabledNextBtn())}))}function _(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"div",[["class","row"],["style","margin-top: 10px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,5,"div",[["class","col-lg-12 col-md-12"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,4,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,3,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,2,"button",[["class","btn btn-sm btn-danger btn-block"],["type","button"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.goToHome()&&t),t}),null,null)),(n()(),t["\u0275eld"](5,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Finish Exam"]))],null,null)}function B(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,M)),t["\u0275did"](2,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,q)),t["\u0275did"](4,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,V)),t["\u0275did"](6,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](8,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](9,0,null,null,1,"ngx-ui-loader",[],null,null,null,d.b,d.a)),t["\u0275did"](10,770048,null,0,m.f,[p.b,t.ChangeDetectorRef,m.d],null,null)],(function(n,l){var e=l.component;n(l,2,0,!e.currentExam.finished),n(l,4,0,!e.currentExam.finished),n(l,6,0,!e.currentExam.finished&&void 0!==e.examQuestion),n(l,8,0,!e.currentExam.finished),n(l,10,0)}),null)}function L(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-exam",[],null,null,null,B,O)),t["\u0275did"](1,8634368,null,0,b,[x.SimpleModalService,"moment",y.a,C.a,w.a,m.d,R.a,S.j,u.Location,I.a,k.o],null,null)],(function(n,l){n(l,1,0)}),null)}var j=t["\u0275ccf"]("app-exam",b,L,{},{},[]),z=e("JeY4"),Y=e("vjkF"),U=e("bPR9"),X=e("/Sf3"),Z=e("gIcY"),K=e("t/Na"),$={title:"ZCE - Exam"},H={title:"ZCE - Page not found!"},J=function(){return function(){}}(),G=e("+wA8"),W=e("PCNd"),nn=e("91uq");e.d(l,"ExamModuleNgFactory",(function(){return ln}));var ln=t["\u0275cmf"](i,[],(function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,j,z.a,Y.a,U.a]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,u.NgLocalization,u.NgLocaleLocalization,[t.LOCALE_ID,[2,u["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](5120,x.SimpleModalService,X.SimpleModalServiceFactory,[t.ComponentFactoryResolver,t.ApplicationRef,t.Injector,x.SimpleModalServiceConfig]),t["\u0275mpd"](135680,b,b,[x.SimpleModalService,"moment",y.a,C.a,w.a,m.d,R.a,S.j,u.Location,I.a,k.o]),t["\u0275mpd"](4608,Z.h,Z.h,[]),t["\u0275mpd"](4608,K.h,K.n,[u.DOCUMENT,t.PLATFORM_ID,K.l]),t["\u0275mpd"](4608,K.o,K.o,[K.h,K.m]),t["\u0275mpd"](5120,K.a,(function(n){return[n]}),[K.o]),t["\u0275mpd"](4608,K.k,K.k,[]),t["\u0275mpd"](6144,K.i,null,[K.k]),t["\u0275mpd"](4608,K.g,K.g,[K.i]),t["\u0275mpd"](6144,K.b,null,[K.g]),t["\u0275mpd"](4608,K.f,K.j,[K.b,t.Injector]),t["\u0275mpd"](4608,K.c,K.c,[K.f]),t["\u0275mpd"](1073742336,u.CommonModule,u.CommonModule,[]),t["\u0275mpd"](1073742336,k.q,k.q,[[2,k.v],[2,k.o]]),t["\u0275mpd"](1073742336,J,J,[]),t["\u0275mpd"](1073742336,Z.g,Z.g,[]),t["\u0275mpd"](1073742336,Z.b,Z.b,[]),t["\u0275mpd"](1073742336,K.e,K.e,[]),t["\u0275mpd"](1073742336,K.d,K.d,[]),t["\u0275mpd"](1073742336,m.b,m.b,[]),t["\u0275mpd"](1073742336,G.SimpleModalModule,G.SimpleModalModule,[]),t["\u0275mpd"](1073742336,W.a,W.a,[]),t["\u0275mpd"](1073742336,i,i,[]),t["\u0275mpd"](1024,k.m,(function(){return[[{path:"",component:b,canDeactivate:[h],data:$},{path:"**",redirectTo:"/page-not-found",data:H}]]}),[]),t["\u0275mpd"](256,x.SimpleModalServiceConfig,{container:null},[]),t["\u0275mpd"](256,K.l,"XSRF-TOKEN",[]),t["\u0275mpd"](256,K.m,"X-XSRF-TOKEN",[]),t["\u0275mpd"](256,nn.DefaultSimpleModalOptionConfig,nn.defaultSimpleModalOptions,[]),t["\u0275mpd"](256,m.e,{bgsColor:"#00ACC1",bgsOpacity:.5,bgsPosition:"center-center",bgsSize:60,bgsType:"rectangle-bounce-pulse-out",blur:5,fgsColor:"#bc75ea",fgsPosition:"center-center",fgsSize:100,fgsType:"cube-grid",gap:24,logoPosition:"center-center",logoSize:120,logoUrl:"",masterLoaderId:"master",overlayBorderRadius:"0",overlayColor:"rgba(40, 40, 40, 0.8)",pbColor:"#00ACC1",pbDirection:"ltr",pbThickness:3,hasProgressBar:!0,text:"loading ...",textColor:"#FFFFFF",textPosition:"center-center"},[])])}))}}]);