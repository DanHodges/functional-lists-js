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
  return new ListNode(x, this);
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
    if (!node) {
      return `${string})`;
    }

    return toString(node.next, `${string}${node.value}${node.next ? " " : ""}`);
  };

  return toString(this, "(");
};

ListNode.prototype.head = function() {
  return this;
};
ListNode.prototype.tail = function() {
  return this.next;
};
ListNode.prototype.length = function() {
  const length = (node, count) => {
    return !node.next ? count : length(node.next, count + 1);
  }

  return length(this, 1);
};
ListNode.prototype.push = function(x) {
  const push = node => {
    if (!node) {
      return new ListNode(x);
    }
    return new ListNode(node.value, push(node.next));
  };
  return push(this);
};

ListNode.prototype.remove = function(value) {
  const remove = node => {
    if (node.value === value && node.next && node.next.next) {
      return new ListNode(node.next.value, node.next.next)
    }
    if (node.value === value) {
      return null;
    }
    return new ListNode(node.value, remove(node.next));
  };

  return remove(this);
};

ListNode.prototype.append = function(xs) {
  const append = node => {
    if (!node) {
      return xs;
    }
    return new ListNode(node.value, append(node.next));
  };
  return append(this);
};

module.exports = {
  EmptyList,
  ListNode,
};
