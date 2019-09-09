(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{xDz6:function(n,l,e){"use strict";e.r(l);var t=e("CcnG"),o=function(){return function(){}}(),i=e("pMnS"),u=e("Ip0R"),r=e("5iza"),a=e("s9Uj"),s=e("3RX/"),c=e("2cNf"),d=e("FdbF"),m=e("iJXZ"),p=e("ZYjt"),f=e("mrSG"),g=(e("dJ3e"),e("lUfZ"),e("M0ag")),h=function(){function n(){}return n.prototype.canDeactivate=function(n,l,e,t){return!n.canExit||n.canExit()},n.ngInjectableDef=t["\u0275\u0275defineInjectable"]({factory:function(){return new n},token:n,providedIn:"root"}),n}(),v=e("sKXY"),b=(e("a+Vh"),e("pKmL"),function(){function n(n,l,e,t,o,i,u,r,a,s,c){this.simpleModalService=n,this.moment=l,this.countdownService=e,this.syncCountdownTimeService=t,this.prismService=o,this.ngxUiLoaderService=i,this.questionService=u,this.toastrService=r,this.location=a,this.localStorageService=s,this.router=c,this.markForReviewArray=[]}return n.prototype.canExit=function(){var n=this;if(this.exam.finished)return!0;var l=this.simpleModalService.addModal(g.a,{title:"Confirm",message:"Do you wish to finish the current exam?"}).subscribe(function(l){return!!l&&(n.finishExam(),!0)});setTimeout(function(){l.unsubscribe()},1e4)},n.prototype.ngOnInit=function(){var n=this,l=this;this.exam=new v.b,this.localStorageService.getAppConfig().subscribe(function(n){l.exam.setMax(n.counter)});var e=this.moment(this.exam.startAt),t=this.moment(e).add(5400,"seconds");this.subscription=this.countdownService.countdown().subscribe(function(e){3600===e&&n.toastrService.success("You have another hour to finish the exam","Time left"),1800===e&&n.toastrService.success("You have another 30 minutes to finish the exam","Time left"),600===e&&n.toastrService.success("You have another 10 minutes to finish the exam","Time left"),300===e&&n.toastrService.success("You have less than 5 minutes to finish the exam","Times left!");var o=l.syncCountdownTimeService.getValue();o.time=n.getTimeString(t),l.syncCountdownTimeService.setValue(o)},function(n){console.log(n)},function(){n.finishExam()}),this.countdownService.start(5400),this.toastrService.success("You have 90 minutes to finish your exam. Good luck!","Exam simulation start!"),console.log(this.exam)},n.prototype.ngAfterViewChecked=function(){this.prismService.highlightAll()},n.prototype.getTimeString=function(n){var l=this.moment(),e=this.moment.duration(n.diff(l));return e.hours().toString().padStart(2,"0")+":"+e.minutes().toString().padStart(2,"0")+":"+e.seconds().toString().padStart(2,"0")},n.prototype.setBtnClasses=function(n){var l=!1;for(var e in this.exam.questions)this.exam.questions.hasOwnProperty(n)&&(l=!0);return this.index===n?{"btn-danger":!0}:this.index!==n&&-1!==this.markForReviewArray.indexOf(n)?{"btn-warning":!0}:this.index!==n&&l?{"btn-success":!0}:void 0},Object.defineProperty(n.prototype,"questionsArray",{get:function(){return this.exam.questionsArray},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"currentExam",{get:function(){return this.exam},enumerable:!0,configurable:!0}),n.prototype.delay=function(n){return f.__awaiter(this,void 0,void 0,function(){var l=this;return f.__generator(this,function(e){switch(e.label){case 0:return[4,new Promise(function(l){return setTimeout(function(){return l()},n)}).then(function(){return l.ngxUiLoaderService.stopAll()})];case 1:return e.sent(),[2]}})})},n.prototype.getQuestion=function(n,l){if(this.ngxUiLoaderService.start(),this.updateExamScore(),this.index=l,void 0===this.exam.questions[l]){var e=this;this.questionService.getOneQuestionById(n).subscribe(function(t){var o={id:n,question:t,markForReview:!1,correct:!1};e.exam.questions[l]=o,e.examQuestion=o})}else this.examQuestion=this.exam.questions[l];this.delay(1)},n.prototype.updateExamScore=function(){void 0!==this.examQuestion&&this.validateEachAnswerRows()},n.prototype.validateEachAnswerRows=function(){var n=!0;this.examQuestion.question.answerRows.forEach(function(l,e){n=n&&l.correct===l.userAnswer}),n&&(this.examQuestion.correct=!0)},n.prototype.disabledPrevBtn=function(){return void 0===this.index||this.index<=0},n.prototype.disabledMarkForReviewBtn=function(){return void 0===this.index},n.prototype.disabledNextBtn=function(){return void 0===this.index||this.index>=69},n.prototype.getPrevQuestion=function(){var n=--this.index;this.getQuestion(this.exam.questionsArray[n],n)},n.prototype.getNextQuestion=function(){var n=++this.index;this.getQuestion(this.exam.questionsArray[n],n)},n.prototype.markForReview=function(){var n=this.markForReviewArray.indexOf(this.index);-1===n?this.markForReviewArray.push(this.index):this.markForReviewArray.splice(n,1)},n.prototype.goToHome=function(){var n=this.location.prepareExternalUrl(this.location.path());-1!==["/exam","/zce/exam"].indexOf(n)&&this.router.navigate(["/home"]).then()},n.prototype.finishExam=function(){var n=this;this.exam.finish(),this.subscription.unsubscribe();var l={closeButton:!0};this.exam.score>=50?this.toastrService.success("Congratulations you passed the exam!","Exam result!",l).onHidden.subscribe(function(){n.goToHome()},function(n){console.log(n)},function(){console.log("You answered correctly to "+n.exam.score+" questions from 70")}):this.toastrService.warning("You did not passed the exam!","Exam result!",l).onHidden.subscribe(function(){n.goToHome()},function(n){console.log(n)},function(){console.log("You answered correctly to "+n.exam.score+" questions from 70")})},n}()),x=e("xN82"),y=e("revU"),w=e("GA1s"),C=e("NmCd"),R=e("zO6L"),S=e("SZbH"),k=e("Ug4g"),F=e("ZYCi"),I=t["\u0275crt"]({encapsulation:0,styles:[[".modal[_ngcontent-%COMP%]{background-color:rgba(0,0,0,.4);bottom:0;height:100%;left:0;overflow:hidden;padding:0 16px;position:fixed;right:0;top:0;text-align:center;z-index:10}.modal.fade-anim[_ngcontent-%COMP%]{transition:opacity .4s ease-in-out;will-change:opacity;opacity:0}.modal.fade-anim.in[_ngcontent-%COMP%]{opacity:1}.modal-open[_ngcontent-%COMP%]{overflow:hidden}.modal-content[_ngcontent-%COMP%]{background-color:#fff;border-radius:4px;margin:16px auto;max-width:580px;position:relative;transition:opacity .4s ease-in-out;width:100%;will-change:opacity;display:inline-block;text-align:left}.modal-content-size-m[_ngcontent-%COMP%]{max-width:992px}.modal-content-size-l[_ngcontent-%COMP%]{max-width:1200px}.modal-footer[_ngcontent-%COMP%], .modal-header[_ngcontent-%COMP%]{align-items:center;display:flex;height:56px;padding:0 16px}.modal-header[_ngcontent-%COMP%]{border-bottom:1px solid #cecece}.modal-body[_ngcontent-%COMP%]{padding:16px}.modal-footer[_ngcontent-%COMP%]{border-top:1px solid #cecece}"]],data:{}});function O(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"button",[["class","btn btn-sm btn-primary"],["style","width: 30px"],["type","button"]],[[8,"title",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getQuestion(n.context.$implicit,n.context.index)&&t),t},null,null)),t["\u0275prd"](512,null,u["\u0275NgClassImpl"],u["\u0275NgClassR2Impl"],[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2]),t["\u0275did"](2,278528,null,0,u.NgClass,[u["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),t["\u0275eld"](3,0,null,null,1,"small",[],null,null,null,null,null)),(n()(),t["\u0275ted"](4,null,["",""]))],function(n,l){n(l,2,0,"btn btn-sm btn-primary",l.component.setBtnClasses(l.context.index))},function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.context.$implicit,"")),n(l,4,0,l.context.index+1)})}function M(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"button",[["class","btn btn-sm btn-primary"],["style","width: 30px"],["type","button"]],[[8,"title",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getQuestion(n.context.$implicit,n.context.index+35)&&t),t},null,null)),t["\u0275prd"](512,null,u["\u0275NgClassImpl"],u["\u0275NgClassR2Impl"],[t.IterableDiffers,t.KeyValueDiffers,t.ElementRef,t.Renderer2]),t["\u0275did"](2,278528,null,0,u.NgClass,[u["\u0275NgClassImpl"]],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),(n()(),t["\u0275eld"](3,0,null,null,1,"small",[],null,null,null,null,null)),(n()(),t["\u0275ted"](4,null,["",""]))],function(n,l){n(l,2,0,"btn btn-sm btn-primary",l.component.setBtnClasses(l.context.index+35))},function(n,l){n(l,0,0,t["\u0275inlineInterpolate"](1,"",l.context.$implicit,"")),n(l,4,0,l.context.index+36)})}function N(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,8,"div",[["class","col-lg-12 col-md-12"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,3,"div",[["class","btn-toolbar"],["role","toolbar"],["style","margin: 5px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,2,"div",[["class","btn-group"],["role","group"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,O)),t["\u0275did"](4,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275eld"](5,0,null,null,3,"div",[["class","btn-toolbar"],["role","toolbar"],["style","margin: 5px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,2,"div",[["class","btn-group"],["role","group"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,M)),t["\u0275did"](8,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(n,l){var e=l.component;n(l,4,0,e.questionsArray.slice(0,35)),n(l,8,0,e.questionsArray.slice(35,70))},null)}function T(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-question",[],null,null,null,r.b,r.a)),t["\u0275did"](1,114688,null,0,a.a,[],{questionRow:[0,"questionRow"]},null)],function(n,l){n(l,1,0,l.context.$implicit)},null)}function E(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-answer",[],null,null,null,s.b,s.a)),t["\u0275did"](1,114688,null,0,c.a,[],{answerRow:[0,"answerRow"],disabled:[1,"disabled"],i:[2,"i"]},null)],function(n,l){n(l,1,0,l.context.$implicit,l.component.examQuestion.question.finalAnswer,l.context.index)},null)}function P(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[["class","php-container"],["style","margin-top: 50px"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,T)),t["\u0275did"](2,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,E)),t["\u0275did"](4,278528,null,0,u.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],function(n,l){var e=l.component;n(l,2,0,e.examQuestion.question.questionRows),n(l,4,0,e.examQuestion.question.answerRows)},null)}function A(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,2,"div",[["class","col-lg-12 col-md-12"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,P)),t["\u0275did"](3,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,3,0,l.component.examQuestion)},null)}function q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Mark for review"]))],null,null)}function _(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Unmark for review"]))],null,null)}function D(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,17,"div",[["class","row"],["style","margin-top: 10px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,4,"div",[["class","col-lg-4 col-md-4"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,3,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,2,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,1,"button",[["class","btn btn-sm btn-primary btn-block"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getPrevQuestion()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["PREVIEW "])),(n()(),t["\u0275eld"](6,0,null,null,6,"div",[["class","col-lg-4 col-md-4"]],null,null,null,null,null)),(n()(),t["\u0275eld"](7,0,null,null,5,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](8,0,null,null,4,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](9,0,null,null,3,"button",[["class","btn btn-sm btn-warning btn-block"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.markForReview()&&t),t},null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,q)),t["\u0275did"](11,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),t["\u0275and"](0,[["elseBlock",2]],null,0,null,_)),(n()(),t["\u0275eld"](13,0,null,null,4,"div",[["class","col-lg-4 col-md-4"]],null,null,null,null,null)),(n()(),t["\u0275eld"](14,0,null,null,3,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](15,0,null,null,2,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](16,0,null,null,1,"button",[["class","btn btn-sm btn-primary btn-block"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.getNextQuestion()&&t),t},null,null)),(n()(),t["\u0275ted"](-1,null,["NEXT "]))],function(n,l){var e=l.component;n(l,11,0,-1===e.markForReviewArray.indexOf(e.index),t["\u0275nov"](l,12))},function(n,l){var e=l.component;n(l,4,0,e.disabledPrevBtn()),n(l,9,0,e.disabledMarkForReviewBtn()),n(l,16,0,e.disabledNextBtn())})}function Q(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,6,"div",[["class","row"],["style","margin-top: 10px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,5,"div",[["class","col-lg-12 col-md-12"]],null,null,null,null,null)),(n()(),t["\u0275eld"](2,0,null,null,4,"div",[["class","card"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,3,"div",[["class","card-footer"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,2,"button",[["class","btn btn-sm btn-danger btn-block"],["type","button"]],null,[[null,"click"]],function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.goToHome()&&t),t},null,null)),(n()(),t["\u0275eld"](5,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,["Finish Exam"]))],null,null)}function V(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,0,"div",[["class","row"],["style","margin-top: 50px"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,2,"div",[["class","row"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,N)),t["\u0275did"](3,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,A)),t["\u0275did"](5,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,D)),t["\u0275did"](7,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,Q)),t["\u0275did"](9,16384,null,0,u.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](10,0,null,null,1,"ngx-ui-loader",[],null,null,null,d.b,d.a)),t["\u0275did"](11,770048,null,0,m.f,[p.b,t.ChangeDetectorRef,m.d],null,null)],function(n,l){var e=l.component;n(l,3,0,!e.currentExam.finished),n(l,5,0,!e.currentExam.finished),n(l,7,0,!e.currentExam.finished),n(l,9,0,!e.currentExam.finished),n(l,11,0)},null)}function B(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-exam",[],null,null,null,V,I)),t["\u0275did"](1,8503296,null,0,b,[x.SimpleModalService,"moment",y.a,w.a,C.a,m.d,R.a,S.j,u.Location,k.a,F.o],null,null)],function(n,l){n(l,1,0)},null)}var L=t["\u0275ccf"]("app-exam",b,B,{},{},[]),Y=e("JeY4"),j=e("vjkF"),z=e("bPR9"),U=e("/Sf3"),H=e("gIcY"),X=e("t/Na"),K=function(){return function(){}}(),$=e("odw0"),J=e("+wA8"),Z=e("PCNd"),G=e("91uq");e.d(l,"ExamModuleNgFactory",function(){return W});var W=t["\u0275cmf"](o,[],function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,L,Y.a,j.a,z.a]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,u.NgLocalization,u.NgLocaleLocalization,[t.LOCALE_ID,[2,u["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](5120,x.SimpleModalService,U.SimpleModalServiceFactory,[t.ComponentFactoryResolver,t.ApplicationRef,t.Injector,x.SimpleModalServiceConfig]),t["\u0275mpd"](4608,b,b,[x.SimpleModalService,"moment",y.a,w.a,C.a,m.d,R.a,S.j,u.Location,k.a,F.o]),t["\u0275mpd"](4608,H.h,H.h,[]),t["\u0275mpd"](4608,X.h,X.n,[u.DOCUMENT,t.PLATFORM_ID,X.l]),t["\u0275mpd"](4608,X.o,X.o,[X.h,X.m]),t["\u0275mpd"](5120,X.a,function(n){return[n]},[X.o]),t["\u0275mpd"](4608,X.k,X.k,[]),t["\u0275mpd"](6144,X.i,null,[X.k]),t["\u0275mpd"](4608,X.g,X.g,[X.i]),t["\u0275mpd"](6144,X.b,null,[X.g]),t["\u0275mpd"](4608,X.f,X.j,[X.b,t.Injector]),t["\u0275mpd"](4608,X.c,X.c,[X.f]),t["\u0275mpd"](1073742336,u.CommonModule,u.CommonModule,[]),t["\u0275mpd"](1073742336,F.q,F.q,[[2,F.v],[2,F.o]]),t["\u0275mpd"](1073742336,K,K,[]),t["\u0275mpd"](1073742336,H.g,H.g,[]),t["\u0275mpd"](1073742336,H.b,H.b,[]),t["\u0275mpd"](1073742336,X.e,X.e,[]),t["\u0275mpd"](1073742336,X.d,X.d,[]),t["\u0275mpd"](1073742336,m.b,m.b,[]),t["\u0275mpd"](512,$.CoalescingComponentFactoryResolver,$.CoalescingComponentFactoryResolver,[t.ComponentFactoryResolver]),t["\u0275mpd"](1073742336,J.SimpleModalModule,J.SimpleModalModule,[$.CoalescingComponentFactoryResolver,t.ComponentFactoryResolver]),t["\u0275mpd"](1073742336,Z.a,Z.a,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,F.m,function(){return[[{path:"",component:b,canDeactivate:[h]},{path:"**",redirectTo:"/page-not-found"}]]},[]),t["\u0275mpd"](256,x.SimpleModalServiceConfig,{container:null},[]),t["\u0275mpd"](256,X.l,"XSRF-TOKEN",[]),t["\u0275mpd"](256,X.m,"X-XSRF-TOKEN",[]),t["\u0275mpd"](256,G.DefaultSimpleModalOptionConfig,G.defaultSimpleModalOptions,[]),t["\u0275mpd"](256,m.e,{bgsColor:"#00ACC1",bgsOpacity:.5,bgsPosition:"center-center",bgsSize:60,bgsType:"rectangle-bounce-pulse-out",blur:5,fgsColor:"#bc75ea",fgsPosition:"center-center",fgsSize:100,fgsType:"cube-grid",gap:24,logoPosition:"center-center",logoSize:120,logoUrl:"",masterLoaderId:"master",overlayBorderRadius:"0",overlayColor:"rgba(40, 40, 40, 0.8)",pbColor:"#00ACC1",pbDirection:"ltr",pbThickness:3,hasProgressBar:!0,text:"loading ...",textColor:"#FFFFFF",textPosition:"center-center"},[])])})}}]);