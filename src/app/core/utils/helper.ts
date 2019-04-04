export class Helper {
  public static randomNumberFromInterval(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // public static chunkArray(myArray: Array<any>, chunk_size: number): Array<any> {
  //   const results = [];
  //   while (myArray.length) {
  //     results.push(myArray.splice(0, chunk_size));
  //   }
  //   return results;
  // }

  public static chunkArray(myArray: Array<any>, chunk_size: number): Array<any> {
    let i = 0;
    const arrayLength = myArray.length;
    let tempArray = [];

    for (i = 0; i < arrayLength; i += chunk_size) {
      const myChunk = myArray.slice(i, i + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }
}
