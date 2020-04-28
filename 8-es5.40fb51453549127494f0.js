function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{o7QI:function(e,t,n){"use strict";n.r(t),n.d(t,"PrepareModule",(function(){return N}));var i=n("ofXK"),r=n("tyNb"),o=n("XNiG"),a=n("2Vo4"),s=n("1G5W"),c=n("IzEk"),u=n("dJ3e"),l=n("oUed"),d=n("fXoL"),h=n("gren"),p=n("dNgK"),f=n("TigC"),v=n("Wp6s"),g=n("XiUz"),m=n("5N9J"),b=n("W0Cy"),C=n("bTqV");function x(e,t){if(1&e&&(d["\u0275\u0275elementStart"](0,"div"),d["\u0275\u0275element"](1,"app-question-checkbox",5),d["\u0275\u0275elementEnd"]()),2&e){var n=d["\u0275\u0275nextContext"](2);d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("question",n.question)("wasValidated$",n.wasValidated$)}}function y(e,t){if(1&e&&(d["\u0275\u0275elementStart"](0,"div"),d["\u0275\u0275element"](1,"app-question-radio",5),d["\u0275\u0275elementEnd"]()),2&e){var n=d["\u0275\u0275nextContext"](2);d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("question",n.question)("wasValidated$",n.wasValidated$)}}function w(e,t){if(1&e){var n=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"button",6),d["\u0275\u0275listener"]("click",(function(){return d["\u0275\u0275restoreView"](n),d["\u0275\u0275nextContext"](2).onValidate()})),d["\u0275\u0275text"](1," Validate "),d["\u0275\u0275elementEnd"]()}}function k(e,t){if(1&e){var n=d["\u0275\u0275getCurrentView"]();d["\u0275\u0275elementStart"](0,"button",7),d["\u0275\u0275listener"]("click",(function(){return d["\u0275\u0275restoreView"](n),d["\u0275\u0275nextContext"](2).getRandomQuestion()})),d["\u0275\u0275text"](1),d["\u0275\u0275elementEnd"]()}if(2&e){var i=d["\u0275\u0275nextContext"](2);d["\u0275\u0275property"]("color","primary"),d["\u0275\u0275advance"](1),d["\u0275\u0275textInterpolate1"](" >>> ",i.buttonText," ")}}function S(e,t){if(1&e&&(d["\u0275\u0275elementStart"](0,"div"),d["\u0275\u0275element"](1,"app-question-display",1),d["\u0275\u0275template"](2,x,2,2,"div",0),d["\u0275\u0275template"](3,y,2,2,"div",0),d["\u0275\u0275elementStart"](4,"mat-card"),d["\u0275\u0275elementStart"](5,"mat-card-content",2),d["\u0275\u0275template"](6,w,2,0,"button",3),d["\u0275\u0275template"](7,k,2,2,"button",4),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"](),d["\u0275\u0275elementEnd"]()),2&e){var n=d["\u0275\u0275nextContext"]();d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("question",n.question),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",n.question.type===n.PhpQuestionType.CHECKBOX),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",n.question.type===n.PhpQuestionType.RADIO),d["\u0275\u0275advance"](3),d["\u0275\u0275property"]("ngIf",!n.question._isValidated),d["\u0275\u0275advance"](1),d["\u0275\u0275property"]("ngIf",n.question._isValidated)}}var I,T,Q,V=new u.c("PrepareComponent"),q=[{path:"",component:(I=function(){function e(t,n,i,r,s){_classCallCheck(this,e),this.ngxUiLoaderService=t,this.prismService=n,this.questionService=i,this.syncScoreService=r,this.snackBar=s,this.isQuestionLoaded=!1,this.isQuestionAnswerCorrect=!1,this.isPageHighlighted=!1,this.btnText="",this.interval=null,this.unsubscribe$=new o.a,this.PhpHighlightingLanguage=l.b,this.PhpQuestionType=l.c,this.wasValidated$=new a.a(!1),this.wasValidated$.next(!1)}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.syncScoreService.currentValue.pipe(Object(s.a)(this.unsubscribe$)).subscribe((function(t){return e.score=t}),(function(e){return V.error(e)})),this.getRandomQuestion()}},{key:"ngAfterViewChecked",value:function(){this.isQuestionLoaded&&!this.isPageHighlighted&&(V.info("HIGHLIGHT All Page elements"),this.prismService.highlightAll(),this.isPageHighlighted=!0)}},{key:"ngOnDestroy",value:function(){V.info("on ngOnDestroy"),this.unsubscribe$.next(),this.unsubscribe$.complete()}},{key:"getRandomQuestion",value:function(){var e=this;this.reset(),this.questionService.getQuestion(1).pipe(Object(c.a)(1)).subscribe((function(t){e.question=t,e.isQuestionLoaded=!0}),(function(e){return V.error(e)}),(function(){setTimeout((function(){return e.ngxUiLoaderService.stopAll()}),350)}))}},{key:"onValidate",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;this.isQuestionAnswerCorrect=this.question.validate(!0),this.syncScoreService.setValue(this.updateScore(this.isQuestionAnswerCorrect));var n=this.isQuestionAnswerCorrect?"CORRECT":"WRONG";this.btnText="NEXT QUESTION [".concat(t,"]"),this.wasValidated$.next(!0),this.openSnackBar("Your answer is: ".concat(n),this.isQuestionAnswerCorrect?"success-snackbar":"error-snackbar"),this.interval=setInterval((function(){t--,e.btnText="NEXT QUESTION [".concat(t,"]"),0===t&&e.getRandomQuestion()}),1e3)}},{key:"reset",value:function(){this.interval&&(clearInterval(this.interval),this.interval=null),this.ngxUiLoaderService.start(),this.isQuestionLoaded=!1,this.isQuestionAnswerCorrect=!1,this.isPageHighlighted=!1,this.btnText="Get next question now "}},{key:"updateScore",value:function(e){return this.score=this.syncScoreService.getValue(),++this.score.total,e&&++this.score.correct,this.score.percentage=Math.floor(100*this.score.correct/this.score.total),this.score}},{key:"openSnackBar",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"close";this.snackBar.open(e,n,{duration:5e3,panelClass:[t]})}},{key:"buttonText",get:function(){return this.btnText}}]),e}(),I.\u0275fac=function(e){return new(e||I)(d["\u0275\u0275directiveInject"](h.b),d["\u0275\u0275directiveInject"](u.d),d["\u0275\u0275directiveInject"](u.e),d["\u0275\u0275directiveInject"](u.i),d["\u0275\u0275directiveInject"](p.a))},I.\u0275cmp=d["\u0275\u0275defineComponent"]({type:I,selectors:[["app-prepare"]],decls:2,vars:1,consts:[[4,"ngIf"],[3,"question"],["fxLayout","column"],["fxFlex","100","mat-flat-button","","color","accent",3,"click",4,"ngIf"],["fxFlex","100","mat-flat-button","",3,"color","click",4,"ngIf"],[3,"question","wasValidated$"],["fxFlex","100","mat-flat-button","","color","accent",3,"click"],["fxFlex","100","mat-flat-button","",3,"color","click"]],template:function(e,t){1&e&&(d["\u0275\u0275template"](0,S,8,5,"div",0),d["\u0275\u0275element"](1,"ngx-ui-loader")),2&e&&d["\u0275\u0275property"]("ngIf",t.isQuestionLoaded)},directives:[i.NgIf,h.c,f.a,v.a,v.b,g.e,m.a,b.a,C.b,g.b],encapsulation:2}),I),data:{title:"ZCE - prepare"}},{path:"**",redirectTo:"/home",data:{title:"ZCE"}}],E=((T=function e(){_classCallCheck(this,e)}).\u0275mod=d["\u0275\u0275defineNgModule"]({type:T}),T.\u0275inj=d["\u0275\u0275defineInjector"]({factory:function(e){return new(e||T)},imports:[[r.j.forChild(q)],r.j]}),T),P=n("PCNd"),N=((Q=function e(){_classCallCheck(this,e)}).\u0275mod=d["\u0275\u0275defineNgModule"]({type:Q}),Q.\u0275inj=d["\u0275\u0275defineInjector"]({factory:function(e){return new(e||Q)},imports:[[i.CommonModule,P.a,E]]}),Q)},oUed:function(e,t,n){"use strict";n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o}));var i=function(e){return e.CHECKBOX="checkbox",e.RADIO="radio",e.TEXT="text",e}({}),r=function(e){return e[e.A=0]="A",e[e.B=1]="B",e[e.C=2]="C",e[e.D=3]="D",e}({}),o=function(e){return e.NONE="none",e.PHP="php",e.SQL="sql",e.XML="xml",e.JSON="json",e.HTML="html",e}({})}}]);