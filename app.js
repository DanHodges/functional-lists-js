class EmptyList {
  toString() {
    return "()";
  }
  isEmpty() {
    return true;
  }
  length() {
    return 0;
  }
  push(x) {
    return new ListNode(x, this);
  }
  remove() {
    return this;
  }
  append(xs) {
    return xs;
  }
}

class ListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
  isEmpty() {
    return false;
  }

  toString() {
    const toString = (node, string) => {
      if (node.next.isEmpty()) {
        return `${string}${node.value})`;
      }

      return toString(
        node.next,
        `${string}${node.value} `,
      );
    };

    return toString(this, "(");
  }

  head() {
    return this.value;
  }

  tail() {
    return this.next;
  }

  push(x) {
    return new ListNode(x, this);
  }

  length() {
    const length = (node, count) => {
      return !node.next ? count : length(node.next, count + 1);
    };

    return length(this, 0);
  }

  remove(x) {
    const tail = this.tail().remove(x);

    if (this.head() === x) {
      return tail;
    }
    if (this.tail() === tail) {
      return this;
    }

    return new ListNode(this.head(), tail);
  }

  append(xs) {
    return new ListNode(this.value, this.next.append(xs));
  }
}

module.exports = {
  EmptyList,
  ListNode,
};
