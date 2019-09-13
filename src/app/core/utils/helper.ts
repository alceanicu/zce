import { IOption } from '../interfaces';

export class Helper {
  public static randomNumberFromInterval(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public static arrayConfigToIOptionArray(configArray: Array<string>): IOption[] {
    const data: IOption[] = [];
    for (let key = 0; key < configArray.length; key++) {
      data.push({value: key, text: configArray[key]} as IOption);
    }

    return data;
  }

  /**
   * FIXME - unused
   */
  public static chunkArray(myArray: Array<any>, chunkSize: number): Array<any> {
    const arrayLength = myArray.length;
    const tempArray = [];

    for (let i = 0; i < arrayLength; i += chunkSize) {
      const myChunk = myArray.slice(i, i + chunkSize);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }
}
