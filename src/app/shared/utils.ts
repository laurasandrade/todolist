export class Utils {
  static prepareDate(date: any) {
    return date
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
  }
  static prepareDateTimeReverse(date: any) {
    const myDateTime = date;
    return [
      myDateTime.getFullYear(),
      ("0" + (myDateTime.getMonth() + 1)).slice(-2),
      myDateTime.getDate(),
      myDateTime.getHours(),
      myDateTime.getMinutes(),
      myDateTime.getSeconds()
    ].join("");
  }
}
