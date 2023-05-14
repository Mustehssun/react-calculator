const range = (begin, end) => end == begin? [end]: [...range(begin, end-1), end];
const reverseRange = (begin, end) => range(begin, end).reverse();
const mapNthElement = (list, n, lambda) => list.map((element, index) => index%n == 0 && index != 1? lambda(element): element);

module.exports = {
    range,
    reverseRange,
    mapNthElement
};