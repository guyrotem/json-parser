/**
 * Created by Guy_Rotem on 7/23/14.
 */
function StringPredicates () {

}

StringPredicates.openers = ['[', '{'];
StringPredicates.closers = [']', '}'];
StringPredicates.siblingSeparators = [','];

StringPredicates.isArray = function (input) {
    return input[0] === '[' && input[input.length - 1] === ']';
};

StringPredicates.isPrimitive = function isPrimitive(value) {
    return value.indexOf('{') === -1 && value.indexOf('[') === -1;
};

StringPredicates.isEmptyString = function isEmptyString(str) {
    return str === '';
};

StringPredicates.getSiblingSplitter = function (str) {
    var openers = ['[', '{'];
    var closers = [']', '}'];
    var siblingSeparators = [','];

    var nestingLevel = 0;
    for(var charIndex = 0; charIndex < str.length; charIndex++) {
        if(_.contains(openers, str[charIndex])) {
            nestingLevel++
        } else if (_.contains(closers, str[charIndex])) {
            nestingLevel--;
        } else if (_.contains(siblingSeparators, str[charIndex])) {
            if(nestingLevel === 0) {
                return {isFound: true, charIndex: charIndex};
            }
        }

    }
    return {isFound: false, charIndex: -1};
};