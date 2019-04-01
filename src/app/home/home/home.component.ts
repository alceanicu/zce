import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


  generatePDF(no: number) {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = {
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              text: [
                'SELLER: AAAAA\n',
                'VAT CODE: 159\n',
                'CITY: 159\n',
              ],
              style: 'xxx'
            },
            {
              text: [
                'SELLER: AAAAA\n',
                'VAT CODE: 159\n',
                'CITY: 159\n',
              ],
              style: 'xxx'
            }
          ]
        },
        {
          style: 'invoiceTable',
          table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            headerRows: 1,
            body: [
              [
                {
                  text: 'Item Description',
                  style: 'tableHeader'
                },
                {
                  text: 'Qty',
                  style: 'tableHeader'
                },
                {
                  text: 'Unit',
                  style: 'tableHeader'
                },
                {
                  text: 'TOTAL',
                  style: 'tableHeader'
                },
                {
                  text: 'VAT',
                  style: 'tableHeader'
                },
                {
                  text: 'Amount',
                  style: 'tableHeader'
                }
              ],
              ['Prod AAA', 10, 10, 100, 20, 120],
              ['Prod AAA', 10, 10, 100, 20, 120],
              ['Prod AAA', 10, 10, 100, 20, 120],
            ]
          },
          layout: 'headerLineOnly'
        },
      ],
      styles: {
        invoiceTable: {
          margin: [0, 55, 0, 15]
        },
        xxx: {
          fontSize: 12,
          color: 'black',
        },
        filledHeader: {
          bold: true,
          fontSize: 9,
          color: 'black',
          fillColor: 'gray',
          alignment: 'center'
        },
        header: {
          fontSize: 10,
          bold: true,
          alignment: 'justify'
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black',
          fillColor: '#f6f8fa',
        }
      },
      defaultStyle: {
        fontSize: 8,
      }
    };
    pdfMake.createPdf(docDefinition).download('test.pdf');
  }

}
