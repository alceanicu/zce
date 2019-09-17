import { IOption } from '../interfaces';


export class Helper {
  public static randomNumberFromInterval(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * used in backend
   */
  public static arrayConfigToIOptionArray(configArray: Array<string>): IOption[] {
    const data: IOption[] = [];
    for (let key = 0; key < configArray.length; key++) {
      data.push({value: key, text: configArray[key]} as IOption);
    }

    return data;
  }
}
