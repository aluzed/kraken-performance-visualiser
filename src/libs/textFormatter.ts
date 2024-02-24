class TextFormatter {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  toString() {
    return this.text;
  }

  format(
    obj: Record<string, string | number>,
    options = { openTag: "%", closeTag: "%" }
  ) {
    let result = this.text;
    for (let key of Object.keys(obj)) {
      result = result.replace(
        new RegExp(`${options.openTag}${key}${options.closeTag}`, "g"),
        obj[key].toString()
      );
    }
    return result;
  }
}

export default TextFormatter;
