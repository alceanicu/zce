import { Inject, Injectable, OnDestroy } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAnswerRow, IQuestionRow } from '@app/core/interfaces';
import { Logger, QuestionService } from '@app/core/services';
import { Question } from '@app/core/models';
import { AnswerOptions } from '@app/core/enum/config';

const log = new Logger('PdfService');

@Injectable({
  providedIn: 'root'
})
export class PdfService implements OnDestroy {
  private questionArray: Question[] = [];
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private questionService: QuestionService,
    @Inject('moment') private moment: any
  ) {
  }

  public exportTestAsPDF(questionNumber: number = 1): void {
    this.questionArray = [];
    this.questionService
      .getQuestion(questionNumber)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        question => this.questionArray.push(question),
        error => log.error(error),
        () => this.generatePDF()
      );
  }

  ngOnDestroy(): void {
    console.log('gata');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private generatePDF(): void {
    const content: Array<any> = [];
    const correctAnswer: Array<any> = [];

    for (let i = 0; i < this.questionArray.length; i++) {
      const question = this.questionArray[i];
      const questionBody: Array<any> = [];
      const answerBody: Array<any> = [];
      const correct: Array<string> = [];

      content.push({
        text: 'Question ' + (i + 1),
        style: 'h1'
      });

      question.questionRows.forEach((obj: IQuestionRow) => {
        const questionRow = {
          text: obj.text,
          fontSize: 8,
          fillColor: '#FFF',
          preserveLeadingSpaces: true
        };
        if (obj.language === 2) {
          questionRow.fontSize = 12;
        }
        if (obj.language === 1) {
          questionRow.fillColor = '#F6F8FA';
        }
        questionBody.push([questionRow]);
      });

      content.push({
        style: 'invoiceTable',
        table: {
          widths: ['*'],
          body: questionBody
        },
        layout: 'headerLineOnly'
      });

      question.answerRows.forEach((obj: IAnswerRow, key: number) => {
        const answerRow = {
          text: obj.text,
          fillColor: '#F6F8FA',
          preserveLeadingSpaces: true
        };
        if (obj.value > 0) {
          correct.push(Object.keys(AnswerOptions)[key]);
        }
        answerBody.push([{
          table: {
            body: [
              [Object.keys(AnswerOptions)[key]]
            ]
          }
        }]);
        answerBody.push([answerRow]);
        answerBody.push([{text: '\n'}]);
      });
      correctAnswer[i] = correct;

      content.push({
        style: 'invoiceTable',
        pageBreak: 'after',
        table: {
          widths: ['*'],
          body: answerBody
        },
        layout: 'headerLineOnly'
      });
    }

    content.push({
      text: 'Answers',
      style: 'h1'
    });

    correctAnswer.forEach((ans, key) => {
      content.push({
        text: `Answer for question  ${key + 1}`,
        style: 'subheader'
      });
      content.push({
        text: ans.join(),
      });
    });

    content.push({text: '\n\r'});
    content.push({qr: 'https://alceanicu.github.io/zce'});

    const name = this.moment().format('YYYY_MM_DD_HH:mm:ss');

    const docDefinition = {
      content: content,
      watermark: {
        text: 'ZCE - Exam Simulator',
        color: 'blue',
        opacity: 0.1,
        bold: true,
        italics: false
      },
      info: {
        title: 'ZCE - Exam Simulator',
        author: 'Nicu ALCEA',
        subject: 'ZCE - Exam Simulator for Zend PHP Engineer Certification',
        keywords: 'PHP, question, test, certification, zend',
        creationDate: name
      },
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
        fontSize: 8
      },
      footer: (cPage: number, pageCount: number) => {
        const page = cPage.toString();
        return {
          margin: 5,
          columns: [
            {
              fontSize: 9,
              text: [
                {
                  text: '_______________________________________________________________________________________________________________\n',
                  margin: [0, 40]
                },
                {text: `${page} / ${pageCount}`}
              ],
              alignment: 'center'
            }
          ]
        };
      }
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(docDefinition).download(`${name}.pdf`);
  }
}