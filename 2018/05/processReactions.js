const ListNode = require('./ListNode');
const fs = require('fs');

function processReactions(inputFile) {
  const inputData = fs.readFileSync(inputFile, { encoding: 'utf-8' }).trim();
  let polymerList = createLinkedList(inputData);

  if (listLength(polymerList) < 3) {
    return listLength(polymerList);
  }

  let currentNode = polymerList;

  while (currentNode) {
    currentNode = processReaction(currentNode);
  }

  return listLength(polymerList);
}

// Builds a linked list from a string and returns the first node in the list
function createLinkedList(textString) {
  let firstNode;
  let currentNode;

  for (let index = 0; index < textString.length; index++) {
    const letter = textString[index];
    const node = new ListNode(letter);

    if (index === 0) {
      firstNode = node;
      currentNode = node;
    } else {
      currentNode.next = node;
      node.previous = currentNode;
      currentNode = node;
    }
  }

  return firstNode;
}

function listLength(firstNode) {
  if (!firstNode) {
    return 0;
  }

  let length = 1;
  let currentNode = firstNode;

  while (currentNode.next) {
    length++;
    currentNode = currentNode.next;
  }

  return length;
}

// Process reaction if there is one and return the next node to be used for processing
function processReaction(currentNode) {
  let firstNode = currentNode.next;
  let secondNode;

  if (firstNode) {
    secondNode = firstNode.next;
  }

  // If there aren't two next nodes, we're at the end of the list
  if (!secondNode) {
    return undefined;
  }

  if (
    firstNode.letter !== secondNode.letter &&
    (firstNode.letter === secondNode.letter.toUpperCase() ||
      firstNode.letter === secondNode.letter.toLowerCase())
  ) {
    const thirdNode = secondNode.next;
    currentNode.next = thirdNode;

    if (thirdNode) {
      thirdNode.previous = currentNode;
    }

    if (currentNode.previous) {
      return currentNode.previous;
    }
  }

  return currentNode.next;
}

module.exports = {
  processReactions,
  createLinkedList,
  listLength,
};
