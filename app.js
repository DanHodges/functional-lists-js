function List() {}

function EmptyList() {}
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.toString = function() {
  return "()";
};
EmptyList.prototype.isEmpty = function() {
  return true;
};
EmptyList.prototype.length = function() {
  return 0;
};
EmptyList.prototype.push = function(x) {
  return new ListNode(x);
};
EmptyList.prototype.remove = function(x) {
  return new EmptyList();
};
EmptyList.prototype.append = function(xs) {
  return xs;
};

function ListNode(value, next = null) {
  this.value = value;
  this.next = next;
}
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;
ListNode.prototype.isEmpty = function() {
  return false;
};

ListNode.prototype.toString = function() {
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
};

ListNode.prototype.head = function() {
  const head = node => {
    if (!node.next) {
      return node;
    }

    return head(node.next);
  };
  return head(this);
};

ListNode.prototype.tail = function() {
  const tail = node => {
    if (!node.next) {
      return node;
    }
    if (!node.next.next) {
      return new ListNode(node.value);
    }
    return new ListNode(node.value, tail(node.next));
  };

  return tail(this);
};

ListNode.prototype.length = function() {
  const length = (node, count) => {
    return !node.next ? count : length(node.next, count + 1);
  };

  return length(this, 1);
};

ListNode.prototype.push = function(x) {
  return new ListNode(x, this);
};

ListNode.prototype.remove = function(value) {
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
};

ListNode.prototype.append = function(xs) {
  const append = node => {
    if (!node.next) {
      return this.push(node.value);
    }

    return new ListNode(node.value, append(node.next));
  };

  return append(xs);
};

module.exports = {
  EmptyList,
  ListNode,
};
