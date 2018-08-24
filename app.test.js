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
    expect(fooBarBaz.head()).toEqual(new ListNode("foo"));
  });

  it("converts to string", () => {
    expect(fooBarBaz.toString()).toEqual("(baz bar foo)");
  });

  it("can push items", () => {
    expect(fooBarBaz.toString()).toEqual("(baz bar foo)");
  });

  it("has a tail", () => {
    expect(fooBarBaz.tail().toString()).toEqual(
      new EmptyList()
        .push("bar")
        .push("baz")
        .toString(),
    );
    expect(
      new EmptyList()
        .push("foo")
        .tail()
        .toString(),
    ).toEqual("()");
  });

  it("has a length", () => {
    expect(foo.length()).toEqual(1);
    expect(fooBarBaz.length()).toEqual(3);
  });

  it("removes items", () => {
    expect(foo.remove("foo").toString()).toEqual("()");
    expect(fooBarBaz.remove("foo").toString()).toEqual("(baz bar)");
    expect(fooBarBaz.remove("bar").toString()).toEqual("(baz foo)");
    expect(
      fooBarBaz
        .push("foo")
        .remove("foo")
        .toString(),
    ).toEqual("(baz bar)");
  });

  it("can append items", () => {
    expect(fooBarBaz.append(foo.push("qux")).toString()).toEqual(
      "(qux foo baz bar foo)",
    );
  });
});

describe("codewars spec", () => {
  let mt, l1, l2, l3, l4;

  beforeEach(() => {
    mt = new EmptyList();
    l1 = mt
      .push("c")
      .push("b")
      .push("a");
    l2 = l1.append(l1);
    l3 = l1.remove("b");
    l4 = l2.remove("b");
  });

  it("Shared structure", () => {
    expect(l2.toString()).toEqual(
      new EmptyList()
        .push("c")
        .push("b")
        .push("a")
        .append(
          new EmptyList()
            .push("c")
            .push("b")
            .push("a"),
        )
        .toString(),
    );
    expect(l2.toString()).toEqual("(a b c a b c)");
    expect(
      l2
        .tail()
        .tail()
        .tail()
        .toString(),
    ).toEqual(l1.toString());
    expect(
      l2
        .tail()
        .tail()
        .tail(),
    ).toEqual(l1);
    expect(
      l2
        .tail()
        .tail()
        .tail(),
    ).toBe(l1);
    // expect(l2 === l1).toBeFalsy();
    // expect(l3.tail()).toEqual(l1.tail().tail());
  });
});
