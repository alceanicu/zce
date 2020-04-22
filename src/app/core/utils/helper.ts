export class Helper {
  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min if min isn't an integer)
   * and no greater than max (or the next integer lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  public static randomNumberFromInterval(max: number, min: number = 1): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static generateArrayWithRandomUniqueElement(
    arraySize: number,
    max: number,
    min: number = 1,
    excludeArray: Array<number> = [],
    sorted: boolean = false
  ): Array<number> {
    const setObj = new Set();

    while (setObj.size < arraySize) {
      const random = Helper.randomNumberFromInterval(max, min);
      if (excludeArray.indexOf(random) === -1) {
        setObj.add(random);
      }
    }

    return (sorted ? [...setObj].sort() : [...setObj]) as Array<number>;
  }
}
