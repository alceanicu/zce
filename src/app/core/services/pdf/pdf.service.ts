import { Injectable } from '@angular/core';

// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake.js';
// @ts-ignore
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import * as moment from 'moment';

import { environment } from '@env/environment';
import { IAnswerRow, IQuestionRow } from '@app/core/interfaces';
import { Question } from '@app/core/models';
import { PhpAnswerLabel, PhpHighlightingLanguage } from '@app/core/enum/config';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private by: any = {};
  constructor() {
    this.by = {
      link: environment.configPHP.generatedBy[0].link,
      name: environment.configPHP.generatedBy[0].name
    };
  }

  public generatePDF(questionArray: Question[], pdfName: string = ''): void {
    const content: Array<any> = [];
    const correctAnswer: Array<any> = [];

    for (let i = 0; i < questionArray.length; i++) {
      const question = questionArray[i];
      const questionBody: Array<any> = [];
      const answerBody: Array<any> = [];
      const correct: Array<string> = [];

      content.push({
        text: 'Question ' + (i + 1),
        style: 'h1',
        id: `Q${i + 1}`
      });

      question.questionRows.forEach((obj: IQuestionRow) => {
        const questionRow = {
          text: obj.text,
          fontSize: 8,
          fillColor: '#FFF',
          preserveLeadingSpaces: true
        };
        if (obj.language === PhpHighlightingLanguage.NONE) {
          questionRow.fontSize = 12;
        }
        if (obj.language !== PhpHighlightingLanguage.NONE) {
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
        if (obj.isCorrect) {
          correct.push(PhpAnswerLabel[key]);
        }
        answerBody.push([{
          table: {
            body: [
              [PhpAnswerLabel[key]]
            ]
          }
        }]);
        answerBody.push([answerRow]);
        answerBody.push([{ text: '\n' }]);
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
        text: [
          'Answer for ',
          {
            text: `Question  ${key + 1}`,
            linkToDestination: `Q${key + 1}`,
            color: 'blue',
            italics: true,
            bold: true
          }
        ],
        style: 'subheader'
      });
      content.push({
        text: ans.join(),
      });
    });

    content.push({ text: '\n\r' });
    content.push({ qr: this.by.link });

    if (pdfName === '') {
      pdfName = moment().format('YYYY_MM_DD_HH:mm:ss');
    }

    const docDefinition = {
      info: {
        title: 'ZCE - Exam Simulator PDF test',
        author: 'Nicu ALCEA',
        subject: 'ZCE - Exam Simulator for Zend PHP Engineer Certification',
        keywords: 'PHP, question, test, certification, zend, PDF'
      },
      content,
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
        generatedBy: {
          margin: [5, 5, 5, 5],
          fontSize: 10,
        }
      },
      defaultStyle: {
        fontSize: 8
      },
      header: (currentPage: number, pageCount: number, pageSize: number) => {
        return [
          {
            text: [
              `Generated with: `,
              {
                text: `ZCE ${this.by.name} `,
                link: `${this.by.link}`,
                color: 'blue',
                bold: true
              }
            ],
            alignment: (currentPage % 2) ? 'left' : 'right',
            style: 'generatedBy'
          },
        ];
      },
      footer: (currentPage: number, pageCount: number) => {
        const page = currentPage.toString();
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
                { text: `${page} / ${pageCount}` }
              ],
              alignment: 'center'
            }
          ]
        };
      }
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(docDefinition).download(`${pdfName}.pdf`);
  }
}
