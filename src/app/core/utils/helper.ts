export class Helper {
  public static randomNumberFromInterval(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
