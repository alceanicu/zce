export class Helper {
  public static randomNumberFromInterval(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
