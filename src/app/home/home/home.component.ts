import {Component} from '@angular/core';
import {IQuestion} from '../../core/models';
import {IndexedDbQuizService, LocalStorageService, PhpQuestionService, QuestionService, SessionStorageService} from '../../core/services';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private questionArray: IQuestion[] = [];

  constructor(
    private firestorePhpQuestionService: PhpQuestionService,
    private indexedDbQuizService: IndexedDbQuizService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private questionService: QuestionService
  ) {
  }

  public exportTestAsPDF(questionNumber: number = 1) {
    this.questionArray = [];
    this.questionService.getQuestion(questionNumber).subscribe(question => {
      this.questionArray.push(question as IQuestion);
    }, error => {
      console.error(error);
    }, () => {
      this.generatePDF();
    });
  }

  private generatePDF() {
    const letters = ['A', 'B', 'C', 'D'];
    const content = [];
    const correctAnswer = [];

    for (let i = 0; i < this.questionArray.length; i++) {
      const question = this.questionArray[i];
      const questionBody = [];
      const answerBody = [];
      const correct = [];
      content.push({
        text: 'Question ' + (i + 1),
        style: 'h1'
      });

      question.questionRows.forEach((obj, key) => {
        const questionRow = {
          text: obj.text,
          fontSize: 8,
          fillColor: '#FFF',
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

      question.answerRows.forEach((obj, key) => {
        const answerRow = {
          text: obj.text,
          fillColor: '#FFF'
        };
        if (obj.correct === true) {
          correct.push(letters[key]);
        }
        if (obj.language === 1) {
          answerRow.fillColor = '#F6F8FA';
        }
        answerBody.push([{
          table: {
            body: [
              [letters[key]]
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

    const docDefinition = {
      content: content,
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
      }
    };

    const unix = Math.round(+new Date() / 1000);

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(docDefinition).download(`${unix}.pdf`);
  }
}
