import TextFormatter from "../../src/libs/textFormatter";

describe("TextFormatter", () => {
  it("Should format a text with default tags", () => {
    const result = new TextFormatter("My name is %name%").format({
      name: "Joe",
    });
    expect(result).toEqual("My name is Joe");
  });

  it("Should format a text with custom tags", () => {
    const result = new TextFormatter("Your name is {{name}}").format(
      { name: "Henry" },
      { openTag: "{{", closeTag: "}}" }
    );
    expect(result).toEqual("Your name is Henry");
  });
});
