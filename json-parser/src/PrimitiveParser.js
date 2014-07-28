/**
 * Created by Guy_Rotem on 7/23/14.
 */

function PrimitiveParser () {

}

PrimitiveParser.isJsonString = function(val) {
    var quotIndex = val.indexOf('\"');
    var isFound = (quotIndex != -1);
    return isFound;
};
PrimitiveParser.isNumber = function(val) {
    return !isNaN(parseInt(val));
};


PrimitiveParser.parse = function parsePrimitiveValue(val) {
    if (PrimitiveParser.isNumber(val)) {
        return PrimitiveParser.getAsInt(val);
    } else if(PrimitiveParser.isJsonString(val)) {
        return PrimitiveParser.getAsString(val);
    } else if (val === 'null') {
        return PrimitiveParser.getAsNull();
    } else if (val === 'true' || val === 'false') {
        return PrimitiveParser.getAsBoolean(val);
    } else {
        throw new Error('Unknown primitive: ' + val);
    }
};

PrimitiveParser.getAsString =
    function (str) {
        return new JsonString(TypeParser.stripBrackets(str, '\"', '\"'));
    };

PrimitiveParser.getAsInt =
    function (num) {
        return new JsonNumber(parseInt(num));
    };

PrimitiveParser.getAsBoolean =
    function (bool) {
        return new JsonBoolean(bool === 'false' ? false : true);
    };
PrimitiveParser.getAsNull = function () {
    return new JsonObject(null);
};