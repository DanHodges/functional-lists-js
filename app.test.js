const { EmptyList, ListNode } = require("./app");

describe("empty list tests", function() {
  var emptyList;

  beforeEach(function() {
    emptyList = new EmptyList();
  });

  it("converts to string", () => {
    expect(emptyList.toString()).toEqual("()");
  });

  it("is empty", () => {
    expect(emptyList.isEmpty()).toBeTruthy();
  });

  it("has no length", () => {
    expect(emptyList.length()).toEqual(0);
  });

  it("can push items", () => {
    expect(emptyList.push("foo")).toEqual(new ListNode("foo"));
  });

  it("can remove items", () => {
    expect(emptyList.remove("foo")).toEqual(new EmptyList());
  });

  it("can append items", () => {
    expect(emptyList.append(new ListNode("foo"))).toEqual(new ListNode("foo"));
  });
});

describe("list node tests", function() {
  var foo;
  var fooBarBaz;

  beforeEach(function() {
    foo = new EmptyList().push("foo");
    fooBarBaz = new EmptyList()
      .push("foo")
      .push("bar")
      .push("baz");
  });

  it("is not empty", () => {
    expect(foo.isEmpty()).toBeFalsy();
  });

  it("has a head", () => {
    expect(foo.head()).toEqual(new ListNode("foo"));
  });

  it("can push items", () => {
    expect(fooBarBaz).toEqual(new ListNode("foo").push("bar").push("baz"));
  });

  it("converts to string", () => {
    expect(fooBarBaz.toString()).toEqual("(foo bar baz)");
  });

  it("has a tail", () => {
    expect(fooBarBaz.tail().toString()).toEqual(
      new ListNode("bar", new ListNode("baz")).toString(),
    );
  });

  it("has a length", () => {
    expect(foo.length()).toEqual(1);
    expect(fooBarBaz.length()).toEqual(3);
  });

  it("can append items", () => {
    expect(fooBarBaz.append(foo).toString()).toEqual("(foo bar baz foo)");
  });

  // it("can remove items", () => {
  //   expect(emptyList.remove("foo")).toEqual(new EmptyList());
  // });

});
