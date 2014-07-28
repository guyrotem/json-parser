/**
 * Created by Guy_Rotem on 7/23/14.
 */

function TypeParser () {

}

TypeParser.stripBrackets = function(str, openingBracket, closingBracket) {
    if(str[0] != openingBracket || str[str.length - 1] != closingBracket) {
        throw new Error("Unexpected input! expected brackets in "+str);
    }
    return str.substring(1, str.length-1);
};

TypeParser.prototype.stripBrackets = function (str, openingBracket, closingBracket) {
    if(openingBracket === undefined) {openingBracket = this.getOpeningBracket()}
    if(closingBracket === undefined) {closingBracket = this.getClosingBracket()}
    return TypeParser.stripBrackets(str, openingBracket, closingBracket);
};

TypeParser.packData = function(data, open, close, separator) {
    var outputString = '';
    _.forEach(data, function(item) {
        outputString += item + separator;
    });
    return JsonParser.unstripBrackets(outputString.substring(0, outputString.length - 1), open, close);
};

function ObjectParser () {

}

ObjectParser.prototype = new TypeParser();

ObjectParser.jsonSplitter = ':';


ObjectParser.prototype.createMap = function () {
    return {};
};

ObjectParser.prototype.wrap = function(content) {
    return new JsonObject(content);
};

ObjectParser.prototype.parse = function (exp) {
    return this.extractKeyValue(exp, ObjectParser.jsonSplitter);

};

ObjectParser.prototype.add = function (map, result, jsonTitle) {
    map[jsonTitle] = result;
};

ObjectParser.prototype.getOpeningBracket = function () {
    return '{';
};

ObjectParser.prototype.getClosingBracket = function () {
    return '}';
};

ObjectParser.prototype.extractKeyValue = function (arg, splitter) {
    function findChar(str, search) {
        var charIndex = str.indexOf(search);
        return { isFound: charIndex !== -1, charIndex: charIndex };
    }

    var result = findChar(arg, splitter);
    if(!result.isFound) {
        throw new Error('Not a valid JSON expression: ' + arg);
    }
    var key =  arg.substring(0 , result.charIndex);
    key = this.stripBrackets(key, '\"', '\"');
    var value = arg.substring(result.charIndex + 1);
    return {value: value, key: key};
};

ObjectParser.prototype.processItem = function(key, obj) {
    var propertyValue = Object.getOwnPropertyDescriptor(obj, key).value;
    return '\"'+ key + '\"' + ':' + propertyValue.print();
};
ObjectParser.prototype.getProperties = function(data) {
    return Object.getOwnPropertyNames(data);
};

/**
 * Created by Guy_Rotem on 7/23/14.
 */
function ArrayParser () {

}

ArrayParser.prototype = new TypeParser();

ArrayParser.prototype.createMap = function () {
    return [];
};

ArrayParser.prototype.wrap = function(content) {
    return new JsonArray(content);
};

ArrayParser.prototype.parse = function (exp) {
    return {value: exp};
};

ArrayParser.prototype.add = function (map, result) {
    map.push(result);
};
ArrayParser.prototype.getOpeningBracket = function () {
    return '[';
};

ArrayParser.prototype.getClosingBracket = function () {
    return ']';
};
ArrayParser.prototype.processItem = function(val) {
    return val.print();
};
ArrayParser.prototype.getProperties = function(data) {
    return data;
};