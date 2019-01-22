const {
  processReactions,
  createLinkedList,
  listLength,
} = require('./processReactions');
const ListNode = require('./listNode');

test('processReactions should return the number of units remaining after processing reactions', () => {
  const units = processReactions('./2018/05/testInput.txt');
  expect(units).toBe(10);
});

describe('createLinkedList()', () => {
  const inputString = 'dabAcCaCBAcCcaDA';

  test('should build a linked list with number of nodes equal to input strings length', () => {
    let list = createLinkedList(inputString);
    let count = 1;

    while (list.next) {
      count++;
      list = list.next;
    }

    expect(count).toBe(inputString.length);
  });

  test('should return the first node in the linked list', () => {
    const list = createLinkedList(inputString);

    expect(list.letter).toBe('d');
  });
});

describe('listLength()', () => {
  test('should count the number of nodes in a linked list', () => {
    let linkedList;
    let lengthOfList = listLength(linkedList);
    expect(lengthOfList).toBe(0);

    linkedList = new ListNode('a');
    lengthOfList = listLength(linkedList);
    expect(lengthOfList).toBe(1);

    const secondNode = new ListNode('b');
    linkedList.next = secondNode;
    lengthOfList = listLength(linkedList);
    expect(lengthOfList).toBe(2);
  });
});
