(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{Xoj1:function(e,t,n){"use strict";n.r(t),n.d(t,"ExamModule",(function(){return U}));var i=n("ofXK"),a=n("tyNb"),o=n("ey9i"),r=n("2Vo4"),s=n("quSY"),c=n("IzEk"),d=n("wd/R"),l=n("AytR"),m=n("0IaG"),u=n("fXoL"),x=n("bTqV");let h=(()=>{class e{constructor(e,t){this.data=e,this.dialogRef=t,this.message="Are you sure?",this.confirmButtonText="Yes",this.cancelButtonText="Cancel",e&&(this.message=e.message||this.message,e.buttonText&&(this.confirmButtonText=e.buttonText.ok||this.confirmButtonText,this.cancelButtonText=e.buttonText.cancel||this.cancelButtonText))}onConfirmClick(){this.dialogRef.close(!0)}}return e.\u0275fac=function(t){return new(t||e)(u["\u0275\u0275directiveInject"](m.a),u["\u0275\u0275directiveInject"](m.g))},e.\u0275cmp=u["\u0275\u0275defineComponent"]({type:e,selectors:[["app-confirm"]],decls:8,vars:3,consts:[["align","center"],["mat-raised-button","","color","primary","tabindex","1",3,"click"],["mat-raised-button","","mat-dialog-close","","tabindex","-1"]],template:function(e,t){1&e&&(u["\u0275\u0275elementStart"](0,"mat-dialog-content"),u["\u0275\u0275elementStart"](1,"p"),u["\u0275\u0275text"](2),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementStart"](3,"mat-dialog-actions",0),u["\u0275\u0275elementStart"](4,"button",1),u["\u0275\u0275listener"]("click",(function(){return t.onConfirmClick()})),u["\u0275\u0275text"](5),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementStart"](6,"button",2),u["\u0275\u0275text"](7),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementEnd"]()),2&e&&(u["\u0275\u0275advance"](2),u["\u0275\u0275textInterpolate"](t.message),u["\u0275\u0275advance"](3),u["\u0275\u0275textInterpolate"](t.confirmButtonText),u["\u0275\u0275advance"](2),u["\u0275\u0275textInterpolate"](t.cancelButtonText))},directives:[m.e,m.c,x.b,m.d],encapsulation:2,changeDetection:0}),e})();var p=n("dJ3e"),f=n("oUed"),g=n("dNgK"),v=n("gren"),b=n("wZkO"),w=n("jaxi"),S=n("TigC"),y=n("5N9J"),k=n("W0Cy"),C=n("Wp6s"),E=n("XiUz"),I=n("NFeN"),T=n("znSr");function q(e,t){if(1&e){const e=u["\u0275\u0275getCurrentView"]();u["\u0275\u0275elementStart"](0,"mat-button-toggle",5),u["\u0275\u0275listener"]("change",(function(t){return u["\u0275\u0275restoreView"](e),u["\u0275\u0275nextContext"](3).clickMark(t)})),u["\u0275\u0275text"](1),u["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;u["\u0275\u0275propertyInterpolate"]("aria-label",e+1),u["\u0275\u0275property"]("value",e),u["\u0275\u0275advance"](1),u["\u0275\u0275textInterpolate1"]("",e+1," ")}}function F(e,t){if(1&e&&(u["\u0275\u0275elementStart"](0,"mat-button-toggle-group"),u["\u0275\u0275elementStart"](1,"mat-button-toggle",3),u["\u0275\u0275text"](2," Marked for review: "),u["\u0275\u0275elementEnd"](),u["\u0275\u0275template"](3,q,2,3,"mat-button-toggle",4),u["\u0275\u0275elementEnd"]()),2&e){const e=u["\u0275\u0275nextContext"](2);u["\u0275\u0275advance"](3),u["\u0275\u0275property"]("ngForOf",e.exam.markForReviewArray)}}function B(e,t){if(1&e&&(u["\u0275\u0275elementStart"](0,"div"),u["\u0275\u0275element"](1,"app-question-checkbox",8),u["\u0275\u0275elementEnd"]()),2&e){const e=u["\u0275\u0275nextContext"](4);u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("wasValidated$",e.wasValidated$)("question",e.exam.questions[e.exam.index].question)}}function V(e,t){if(1&e&&(u["\u0275\u0275elementStart"](0,"div"),u["\u0275\u0275element"](1,"app-question-radio",8),u["\u0275\u0275elementEnd"]()),2&e){const e=u["\u0275\u0275nextContext"](4);u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("wasValidated$",e.wasValidated$)("question",e.exam.questions[e.exam.index].question)}}function j(e,t){if(1&e&&(u["\u0275\u0275elementStart"](0,"div"),u["\u0275\u0275element"](1,"app-question-display",7),u["\u0275\u0275template"](2,B,2,2,"div",0),u["\u0275\u0275template"](3,V,2,2,"div",0),u["\u0275\u0275elementEnd"]()),2&e){const e=u["\u0275\u0275nextContext"](3);u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("question",e.exam.questions[e.exam.index].question),u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("ngIf",e.exam.questions[e.exam.index].question.type===e.PhpQuestionType.CHECKBOX),u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("ngIf",e.exam.questions[e.exam.index].question.type===e.PhpQuestionType.RADIO)}}function P(e,t){if(1&e&&(u["\u0275\u0275elementStart"](0,"mat-tab",6),u["\u0275\u0275element"](1,"br"),u["\u0275\u0275template"](2,j,4,3,"div",0),u["\u0275\u0275elementEnd"]()),2&e){const e=t.index,n=u["\u0275\u0275nextContext"](2);u["\u0275\u0275property"]("label",e+1),u["\u0275\u0275advance"](2),u["\u0275\u0275property"]("ngIf",void 0!==n.exam.questions[n.exam.index])}}function R(e,t){1&e&&(u["\u0275\u0275elementStart"](0,"span"),u["\u0275\u0275text"](1,"Mark for review"),u["\u0275\u0275elementEnd"]())}function L(e,t){1&e&&(u["\u0275\u0275elementStart"](0,"span"),u["\u0275\u0275text"](1,"Unmark for review"),u["\u0275\u0275elementEnd"]())}function N(e,t){if(1&e){const e=u["\u0275\u0275getCurrentView"]();u["\u0275\u0275elementStart"](0,"mat-card"),u["\u0275\u0275elementStart"](1,"mat-card-content",9),u["\u0275\u0275elementStart"](2,"button",10),u["\u0275\u0275listener"]("click",(function(){return u["\u0275\u0275restoreView"](e),u["\u0275\u0275nextContext"](2).getPrevQuestion()})),u["\u0275\u0275elementStart"](3,"mat-icon",11),u["\u0275\u0275text"](4,"navigate_before"),u["\u0275\u0275elementEnd"](),u["\u0275\u0275text"](5," PREVIEW "),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementStart"](6,"button",12),u["\u0275\u0275listener"]("click",(function(){return u["\u0275\u0275restoreView"](e),u["\u0275\u0275nextContext"](2).markForReview()})),u["\u0275\u0275template"](7,R,2,0,"span",13),u["\u0275\u0275template"](8,L,2,0,"ng-template",null,14,u["\u0275\u0275templateRefExtractor"]),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementStart"](10,"button",10),u["\u0275\u0275listener"]("click",(function(){return u["\u0275\u0275restoreView"](e),u["\u0275\u0275nextContext"](2).getNextQuestion()})),u["\u0275\u0275text"](11," NEXT "),u["\u0275\u0275elementStart"](12,"mat-icon",11),u["\u0275\u0275text"](13,"navigate_next"),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementEnd"]()}if(2&e){const e=u["\u0275\u0275reference"](9),t=u["\u0275\u0275nextContext"](2);u["\u0275\u0275advance"](2),u["\u0275\u0275property"]("disabled",t.isDisabledPrevBtn),u["\u0275\u0275advance"](4),u["\u0275\u0275property"]("disabled",t.isDisabledMarkForReviewBtn),u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("ngIf",-1===t.exam.markForReviewArray.indexOf(t.currentIndex))("ngIfElse",e),u["\u0275\u0275advance"](3),u["\u0275\u0275property"]("disabled",t.isDisabledNextBtn)}}function Q(e,t){if(1&e){const e=u["\u0275\u0275getCurrentView"]();u["\u0275\u0275elementStart"](0,"div"),u["\u0275\u0275template"](1,F,4,1,"mat-button-toggle-group",0),u["\u0275\u0275elementStart"](2,"mat-tab-group",1),u["\u0275\u0275listener"]("selectedTabChange",(function(t){return u["\u0275\u0275restoreView"](e),u["\u0275\u0275nextContext"]().tabClick(t)})),u["\u0275\u0275template"](3,P,3,2,"mat-tab",2),u["\u0275\u0275elementEnd"](),u["\u0275\u0275template"](4,N,14,5,"mat-card",0),u["\u0275\u0275elementEnd"]()}if(2&e){const e=u["\u0275\u0275nextContext"]();u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("ngIf",e.hasMarkForReview),u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("selectedIndex",e.currentIndex),u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("ngForOf",e.exam.questionsArray),u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("ngIf",void 0!==e.exam.questions[e.exam.index])}}function O(e,t){if(1&e){const e=u["\u0275\u0275getCurrentView"]();u["\u0275\u0275elementStart"](0,"mat-card"),u["\u0275\u0275elementStart"](1,"mat-card-content",15),u["\u0275\u0275elementStart"](2,"button",16),u["\u0275\u0275listener"]("click",(function(){return u["\u0275\u0275restoreView"](e),u["\u0275\u0275nextContext"]().goToHome()})),u["\u0275\u0275elementStart"](3,"span"),u["\u0275\u0275text"](4,"Finish Exam"),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementEnd"](),u["\u0275\u0275elementEnd"]()}}const A=new p.c("ExamComponent"),M=[{path:"",component:(()=>{class e{constructor(e,t,n,i,a,o,s,c,d,l){this.location=e,this.router=t,this.dialog=n,this.snackBar=i,this.questionService=a,this.countdownService=o,this.syncCountdownTimeService=s,this.prismService=c,this.ngxUiLoaderService=d,this.cdr=l,this.isPageHighlighted=!1,this.PhpQuestionType=f.c,this.wasValidated$=new r.a(!1),this.wasValidated$.next(!1)}ngOnInit(){this.exam=new o.a;const e=d(this.exam.startAt),t=d(e).add(l.a.configPHP.examTime,"seconds");this.countdownSubscription=this.countdownService.countdown().subscribe(e=>{3600===e&&this.openSnackBar("You have another hour to finish the exam","info-snackbar"),1800===e&&this.openSnackBar("You have another 30 minutes to finish the exam","info-snackbar"),600===e&&this.openSnackBar("You have another 10 minutes to finish the exam","info-snackbar"),300===e&&this.openSnackBar("You have less than 5 minutes to finish the exam","info-snackbar");const n=this.syncCountdownTimeService.getValue();n.time=this.getTimeString(t),this.syncCountdownTimeService.setValue(n)},e=>A.error(e),()=>this.finishExam()),this.countdownService.start(l.a.configPHP.examTime),this.openSnackBar("You have 90 minutes to finish your exam. Good luck!","info-snackbar"),this.getQuestion(0),this.wasValidated$.subscribe(e=>{e&&this.cdr.detectChanges()})}ngAfterViewChecked(){this.exam.isCurrentQuestionLoaded&&!this.isPageHighlighted&&(setTimeout(()=>this.prismService.highlightAll(),10),this.isPageHighlighted=!0),this.cdr.detectChanges()}ngOnDestroy(){this.countdownSubscriptionUnsubscribe()}canExit(){if(this.exam.isFinished)return!0;this.dialog.open(h,{data:{message:"Do you wish to finish the current exam?",buttonText:{ok:"YES",cancel:"NO"}}}).afterClosed().subscribe(e=>!!e&&(this.finishExam(),!0))}get currentIndex(){return this.exam.index}get isDisabledPrevBtn(){return void 0===this.exam.index||this.exam.index<=0}get isDisabledNextBtn(){return void 0===this.exam.index||this.exam.index>=l.a.configPHP.examSize-1}get isDisabledMarkForReviewBtn(){return void 0===this.exam.index}get hasMarkForReview(){return this.exam.markForReviewArray.length>0}clickMark(e){this.getQuestion(e.value)}tabClick(e){this.getQuestion(e.index)}getPrevQuestion(){--this.exam.index}getNextQuestion(){++this.exam.index}markForReview(){this.exam.markForReview()}goToHome(){const e=this.location.prepareExternalUrl(this.location.path()).replace("#","");-1!==["/exam"].indexOf(e)&&this.router.navigate(["/home"]).then(e=>{e&&A.info("Go to home page")})}finishExam(){this.countdownSubscriptionUnsubscribe(),this.exam.finish(),this.router.navigate(["/home"],{state:{score:this.exam.score}}).then(e=>{e&&A.info("Go to home page")})}getQuestion(e){this.ngxUiLoaderService.start(),this.exam.isCurrentQuestionLoaded=!1,this.isPageHighlighted=!1,this.exam.index=e;const t=this.exam.questionsArray[e];void 0===this.exam.questions[e]?this.questionService.getOneQuestionById(t).pipe(Object(c.a)(1)).subscribe(n=>{this.exam.setQuestion(e,{id:t,question:n}),this.stopLoaded()},e=>A.error(e)):this.stopLoaded()}getTimeString(e){const t=d(),n=d.duration(e.diff(t));return n.hours().toString().padStart(2,"0")+":"+n.minutes().toString().padStart(2,"0")+":"+n.seconds().toString().padStart(2,"0")}stopLoaded(){this.exam.isCurrentQuestionLoaded=!0,setTimeout(()=>{this.ngxUiLoaderService.stopAll()},350)}countdownSubscriptionUnsubscribe(){this.syncCountdownTimeService.clear(),this.countdownSubscription instanceof s.a&&this.countdownSubscription.unsubscribe()}openSnackBar(e,t,n="close"){this.snackBar.open(e,n,{duration:5e3,panelClass:[t]})}}return e.\u0275fac=function(t){return new(t||e)(u["\u0275\u0275directiveInject"](i.Location),u["\u0275\u0275directiveInject"](a.f),u["\u0275\u0275directiveInject"](m.b),u["\u0275\u0275directiveInject"](g.a),u["\u0275\u0275directiveInject"](p.e),u["\u0275\u0275directiveInject"](p.a),u["\u0275\u0275directiveInject"](p.g),u["\u0275\u0275directiveInject"](p.d),u["\u0275\u0275directiveInject"](v.b),u["\u0275\u0275directiveInject"](u.ChangeDetectorRef))},e.\u0275cmp=u["\u0275\u0275defineComponent"]({type:e,selectors:[["app-exam"]],decls:3,vars:2,consts:[[4,"ngIf"],["color","accent","backgroundColor","accent",3,"selectedIndex","selectedTabChange"],[3,"label",4,"ngFor","ngForOf"],["disabled","","aria-label","Mark for review"],[3,"value","aria-label","change",4,"ngFor","ngForOf"],[3,"value","aria-label","change"],[3,"label"],[3,"question"],[3,"wasValidated$","question"],["fxLayout","row","fxLayout.xs","column","fxLayoutAlign","space-between stretch","fxLayoutGap","5px"],["mat-flat-button","","color","primary","type","button","fxFlex","32","fxFlex.xs","100",3,"disabled","click"],["fxHide.xs","true"],["mat-flat-button","","color","accent","type","button","fxFlex","32","fxFlex.xs","100",3,"disabled","click"],[4,"ngIf","ngIfElse"],["elseBlock",""],["fxLayout","column"],["mat-flat-button","","color","warn","type","button","fxFlex","100",3,"click"]],template:function(e,t){1&e&&(u["\u0275\u0275template"](0,Q,5,4,"div",0),u["\u0275\u0275template"](1,O,5,0,"mat-card",0),u["\u0275\u0275element"](2,"ngx-ui-loader")),2&e&&(u["\u0275\u0275property"]("ngIf",!t.exam.isFinished),u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("ngIf",!t.exam.isFinished))},directives:[i.NgIf,v.c,b.b,i.NgForOf,w.b,w.a,b.a,S.a,y.a,k.a,C.a,C.b,E.e,E.d,E.f,x.b,E.b,I.a,T.b],encapsulation:2}),e})(),canDeactivate:[o.b],data:{title:"ZCE - Exam"}},{path:"**",redirectTo:"/home",data:{title:"ZCE"}}];let D=(()=>{class e{}return e.\u0275mod=u["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=u["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[a.j.forChild(M)],a.j]}),e})();var H=n("PCNd");let U=(()=>{class e{}return e.\u0275mod=u["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=u["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[i.CommonModule,H.a,D]]}),e})()}}]);