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
    return new ListNode(x);
  }
  remove(x) {
    return new EmptyList();
  }
  append(xs) {
    return xs;
  }
}

class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
  isEmpty() {
    return false;
  }

  toString() {
    const toString = (node, string) => {
      if (!node || !node.value) {
        return `${string})`;
      }

      return toString(
        node.next,
        `${string}${node.value}${node.next && node.next.value ? " " : ""}`,
      );
    };

    return toString(this, "(");
  }

  head() {
    const head = node => {
      if (!node.next) {
        return node;
      }

      return head(node.next);
    };
    return head(this);
  }

  tail() {
    const tail = node => {
      if (!node.next) {
        return new EmptyList();
      }
      if (!node.next.next) {
        return new ListNode(node.value);
      }
      return new ListNode(node.value, tail(node.next));
    };

    return tail(this);
  }

  length() {
    const length = (node, count) => {
      return !node.next ? count : length(node.next, count + 1);
    };

    return length(this, 1);
  }

  push(x) {
    return new ListNode(x, this);
  }

  remove(value) {
    const remove = node => {
      if (node.value === value) {
        if (node.next && node.next.value) {
          return remove(new ListNode(node.next.value, node.next.next));
        }
        return new EmptyList();
      }
      return new ListNode(
        node.value,
        node && node.next ? remove(node.next) : null,
      );
    };

    return remove(this);
  }

  append(xs) {
    const append = node => {
      if (!node.next) {
        return this.push(node.value);
      }

      return new ListNode(node.value, append(node.next));
    };

    return append(xs);
  }
}

module.exports = {
  EmptyList,
  ListNode,
};
