'use strict';

function JsonParser() {

}

JsonParser.prototype.parse = function (input) {
    //  START code
    if(StringPredicates.isPrimitive(input)) {
        return PrimitiveParser.parse(input);
    }
    if(StringPredicates.isArray(input)) {
        var formatter = new ArrayParser();
    } else {
        formatter = new ObjectParser();
    }
    var nextExp = formatter.stripBrackets(input);
    var jsonMap = formatter.createMap();

    while(!StringPredicates.isEmptyString(nextExp)) {

        var result = StringPredicates.getSiblingSplitter(nextExp);
        var splitterIndex = result.isFound ? result.charIndex : nextExp.length;
        var firstExp = nextExp.substring(0, splitterIndex);
        nextExp = nextExp.substring(splitterIndex + 1);

        var expAsJson = formatter.parse(firstExp);

        formatter.add(jsonMap, this.parse(expAsJson.value), expAsJson.key);
    }
    return formatter.wrap(jsonMap);

};

JsonParser.unstripBrackets = function (string, openingBrackets, closingBrackets) {
    return openingBrackets + string + closingBrackets;
};

JsonParser.prototype.print = function (tree) {
    return tree.print();
};