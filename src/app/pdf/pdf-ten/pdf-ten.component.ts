import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {
  LocalStorageService,
  PhpQuestionService,
  SessionStorageService,
  IndexedDbQuizService
} from '../../core/services';
import {IConfig, IQuestion} from '../../core/models';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf-ten',
  templateUrl: './pdf-ten.component.html',
  styleUrls: ['./pdf-ten.component.css']
})
export class PdfTenComponent implements OnInit {
  private question: IQuestion;
  private questionArray: IQuestion[];
  protected correctAnswer = [];
  protected no: number = 1;

  constructor(
    private firestorePhpQuestionService: PhpQuestionService,
    private indexedDbQuizService: IndexedDbQuizService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {
  }

  ngOnInit() {
  }

  generateRandomIdWithoutRepeatInLastN(config: IConfig, internalCounter: number = 0): number {
    const randomId = this.randomNumberFromInterval(Number(config.counter));
    let phpLastNIds = this.sessionStorageService.getItem('phpLastNIds') || [];
    if (internalCounter === 100) {
      console.log('STOP AFTER 100 TRY ...');
      return randomId;
    }
    if (phpLastNIds.indexOf(String(randomId)) === -1) {
      phpLastNIds.unshift(String(randomId));
      phpLastNIds = phpLastNIds.filter((value, key) => key < 10);
      this.sessionStorageService.setItem('phpLastNIds', phpLastNIds);
      return randomId;
    } else {
      internalCounter++;
      return this.generateRandomIdWithoutRepeatInLastN(config, internalCounter);
    }
  }

  getAnRandomQuestion() {
    const $this = this;
    this.localStorageService.getAppConfig().subscribe((config) => {
      const randomId = this.generateRandomIdWithoutRepeatInLastN(config);
      console.log(`Generate an random id for question ... [randomId =${randomId}]`);

      this.indexedDbQuizService
        .getQuestionById(randomId)
        .then(async (question) => {
          if (!question) {
            console.log(`Question with id=${randomId} does not EXIST in IndexedDB`);
            $this.getQuestionFromFirebase(randomId);
          } else {
            console.log(`Question with id=${randomId} EXIST in IndexedDB - WE GET IT FROM IndexedDB`);
            $this.setQuestion(question);
          }
        })
        .catch(e => {
          console.log((e.stack || e));
          $this.getQuestionFromFirebase(randomId);
        });
    });
  }

  saveToIndexedDb(question: IQuestion) {
    this.indexedDbQuizService
      .addQuestion(question)
      .then(async (key) => {
        console.log(`Question is now saved in IndexedDB [id=${key}]`);
      })
      .catch(e => {
        console.log(`Question can not be saved in IndexedDB`);
        console.log((e.stack || e));
      });
  }

  setQuestion(question: IQuestion) {
    question.answerRows.sort(() => Math.random() - 0.5);
    this.question = question;
    this.questionArray.push(question);
  }

  getQuestionFromFirebase(randomId) {
    console.log('We try to get question from FIREBASE');
    const $this = this;
    this.firestorePhpQuestionService.getQuestion(String(randomId)).subscribe(
      DocumentSnapshot => {
        const question = DocumentSnapshot.data() as IQuestion;
        if (question) {
          $this.saveToIndexedDb(question);
          $this.setQuestion(question);
        } else {
          throw new Error('Something bad happened');
        }
      },
      (error) => {
        console.log('Can not get question from FIREBASE');
        console.error(error);
      },
      () => {
        console.log('Random Question complete');
      }
    );
  }

  randomNumberFromInterval(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  gPDF(no: number = 1) {
    this.questionArray = [];
    this.question = null;
    this.no = no;
    for (let i = 1; i <= no; i++) {
      this.getAnRandomQuestion();
    }

    // FIXME
    const $this = this;
    setTimeout(function() {
      $this.generatePDF();
    }, 3000);
  }

  generatePDF() {
    const letters = ['A', 'B', 'C', 'D'];
    let content = [];

    for(var i=0; i < this.questionArray.length; i++) {
      let questionBody = [];
      let answerBody = [];

      const question = this.questionArray[i];
      console.log(question);
      content.push({
        text: 'Question ' + (i + 1),
        style: 'h1'
      });

      question.questionRows.forEach((obj, key) => {
        const row = {
          text: obj.text,
          fontSize: 8,
          fillColor: '#FFF',
        };
        if (obj.language === 2) {
          row.fontSize = 12;
        }
        if (obj.language === 1) {
          row.fillColor = '#F6F8FA';
        }
        questionBody.push([row]);

        let qROW = {
          style: 'invoiceTable',
          table: {
            widths: ['*'],
            body: questionBody
          },
          layout: 'headerLineOnly'
        };

        content.push(qROW);
      });

      question.answerRows.forEach((obj, key) => {
        const row = {
          text: obj.text,
          fillColor: '#FFF'
        };
        if (obj.correct === true) {
          this.correctAnswer.push(letters[key]);
        }
        if (obj.language === 1) {
          row.fillColor = '#F6F8FA';
        }
        answerBody.push([{
          table: {
            body: [
              [letters[key]]
            ]
          }
        }]);
        answerBody.push([row]);
        answerBody.push([{text: '\n'}]);

        let aROW = {
          style: 'invoiceTable',
          pageBreak: 'after',
          table: {
            widths: ['*'],
            body: answerBody
          },
          layout: 'headerLineOnly'
        };
        content.push(aROW);
      });

    }

    // this.questionArray.forEach((question, key) => {
    //   console.log(question);
    //   console.log('question' + key);
    //   let questionBody = [];
    //   let answerBody = [];
    //   let o = {
    //     text: 'Question ' + key + 1,
    //     style: 'h1'
    //   };
    //
    //   content.push(o);
    //
    //   question.questionRows.forEach((obj, key) => {
    //     const row = {
    //       text: obj.text,
    //       fontSize: 8,
    //       fillColor: '#FFF',
    //     };
    //     if (obj.language === 2) {
    //       row.fontSize = 12;
    //     }
    //     if (obj.language === 1) {
    //       row.fillColor = '#F6F8FA';
    //     }
    //     questionBody.push([row]);
    //
    //     let r = {
    //       style: 'invoiceTable',
    //       table: {
    //         widths: ['*'],
    //         body: questionBody
    //       },
    //       layout: 'headerLineOnly'
    //     };
    //
    //     content.push(r);
    //   });
    //
    // });

    // this.question.questionRows.forEach((obj, key) => {
    //   const row = {
    //     text: obj.text,
    //     fontSize: 8,
    //     fillColor: '#FFF',
    //   };
    //   if (obj.language === 2) {
    //     row.fontSize = 12;
    //   }
    //   if (obj.language === 1) {
    //     row.fillColor = '#F6F8FA';
    //   }
    //   questionBody.push([row]);
    // });
    //
    // this.question.answerRows.forEach((obj, key) => {
    //   const row = {
    //     text: obj.text,
    //     fillColor: '#FFF'
    //   };
    //   if (obj.correct === true) {
    //     this.correctAnswer.push(letters[key]);
    //   }
    //   if (obj.language === 1) {
    //     row.fillColor = '#F6F8FA';
    //   }
    //   answerBody.push([{
    //     table: {
    //       body: [
    //         [letters[key]]
    //       ]
    //     }
    //   }]);
    //   answerBody.push([row]);
    //   answerBody.push([{text: '\n'}]);
    // });


    console.log(`xxxxxxxxxxxxxx content`);
    console.log(content);

    const docDefinition = {
      content: content,
        // [
        //   {
        //     text: 'Question 1',
        //     style: 'h1',
        //   },
        //   {
        //     style: 'invoiceTable',
        //     table: {
        //       widths: ['*'],
        //       body: questionBody
        //     },
        //     layout: 'headerLineOnly'
        //   },
        //   {
        //     style: 'invoiceTable',
        //     pageBreak: 'after',
        //     table: {
        //       widths: ['*'],
        //       body: answerBody
        //     },
        //     layout: 'headerLineOnly'
        //   },
        //   {
        //     text: 'CORRECT ANSWERS:',
        //     style: 'subheader'
        //   },
        //   {
        //     text: this.correctAnswer.join()
        //   }
        // ],
      styles: {
        invoiceTable: {
          margin: [0, 5, 0, 15]
        },
        h1: {
          bold: true,
          fontSize: 16,
          color: 'black',
          alignment: 'center'
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
      },
      defaultStyle: {
        fontSize: 8,
      }
    };
    let unix = Math.round(+new Date() / 1000) + '.pdf';
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(docDefinition).download(unix);
  }

}

