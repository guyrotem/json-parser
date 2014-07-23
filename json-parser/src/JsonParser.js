function JsonParser() {

}

JsonParser.prototype.parse = function (input) {
    function getAsString(str) {
        return new JsonString(str.substring(str.indexOf('\"') + 1, str.lastIndexOf('\"')));
    }

    function getAsInt(num) {
        return new JsonNumber(parseInt(num));
    }

    function getAsBoolean(bool) {
        return new JsonBoolean(bool === 'false' ? false : true);
    }

    function parseSingleValue(val) {
        if (!isNaN(parseInt(val))) {
            return new getAsInt(val);
        } else if(val.indexOf('\"') == -1) {
            return new getAsBoolean(val);
        } else {
            return new getAsString(val);
        }
    }
    function extractArgs(arg) {
        var splitterIndex = arg.indexOf(':');
        if(splitterIndex == -1) {
            return [ null, null ];
        }
        var arg1 =  arg.substring(arg.indexOf('\"') + 1, splitterIndex -1);
        var closingBracketIndex = arg.lastIndexOf('}');
        var arg2 = arg.substring(splitterIndex + 1, closingBracketIndex == -1 ? arg.length : closingBracketIndex+1);
        return [ arg1, arg2 ];
    }
    function isSiblingString(str) {
        var nestingLevel = 0;
        for(var charIndex = 0; charIndex < str.length; charIndex++) {
            if(str[charIndex] === '{') {
                nestingLevel++
            } else if (str[charIndex] === '}') {
                nestingLevel--;
            } else if (str[charIndex] === ',') {
                if(nestingLevel === 0) {
                    return true;
                }
            }

        }
        return false;
    }
    function isEmptyString(str) {
        return str === '';
    }
    function stripBrackets(str) {
        if(str[0] != '{' || str[str.length - 1] != '}') {
            throw new Error("Unexpected input! expected brackets in "+str);
        }
        return str.substring(1, str.length-1);
    }

    function isPrimitive(value) {
        return value.indexOf('{') === -1
    }


    //  START code
    if(isPrimitive(input)) {
        return parseSingleValue((input));
    }

    var nextExp = stripBrackets(input);
    var jsonMap = {};

    while(nextExp != null) {
        if(isEmptyString(nextExp)) {
            return new JsonObject(null);
        }
        if (isSiblingString(nextExp)) {
            var firstExp = nextExp.split(',')[0];
            nextExp = nextExp.substring(nextExp.indexOf(',') + 1, nextExp.length);
        } else {
            var firstExp = nextExp;
            nextExp = null;
        }

        var splitted = extractArgs(firstExp);
        var jsonTitle = splitted[0];
        var jsonValue = splitted[1];

        jsonMap[jsonTitle] = this.parse(jsonValue);
    }

    return new JsonObject(jsonMap);

};

function JsonObject(data) {
    this.data = data;
}
//
//var a= new JsonObject(2);
//func = a.myNativeValue;
//func() // = 2
//func2 = a.getNativeValue;
//func2() // =

JsonObject.prototype.getNativeValue = function () {
    return this.data;
};

function JsonNumber(number) {
    this.data = number;
}

function JsonString(string) {
    this.data = string;
}

function JsonBoolean(bool) {
    this.data = bool;
}

JsonNumber.prototype = new JsonObject();
JsonString.prototype = new JsonObject();
JsonBoolean.prototype = new JsonObject();

JsonObject.empty = function () {
    return new JsonObject(null);
};
