/**
 * Created by Guy_Rotem on 7/24/14.
 */

function JsonObject(data) {
    this.data = data;
}

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

function JsonArray(values) {
    this.data = values;
}

JsonObject.empty = function () {
    return new JsonObject({});
};

JsonObject.prototype.print = function () {

    var formatter = this.getFormatter();

    var nativeData = this.getNativeValue();
    if(nativeData == null) {
        return null;
    }
    var properties = [];

    _.forEach(formatter.getProperties(nativeData), function (item) {
        var processed = formatter.processItem(item, nativeData);
        properties.push(processed);
    });
    return TypeParser.packData(properties, formatter.getOpeningBracket(), formatter.getClosingBracket(), JsonObject.itemSplitter);
};

JsonObject.itemSplitter = ',';

JsonObject.prototype.getFormatter = function () {
    return new ObjectParser();
};

JsonNumber.prototype = new JsonObject();
JsonString.prototype = new JsonObject();
JsonBoolean.prototype = new JsonObject();
JsonArray.prototype = new JsonObject();

JsonArray.prototype.getFormatter = function () {
    return new ArrayParser();
};

JsonString.prototype.print = function () {
    return JsonParser.unstripBrackets(this.getNativeValue(), '\"', '\"');
};
JsonBoolean.prototype.print = function () {
    return this.getNativeValue();
};
JsonNumber.prototype.print = function () {
    return this.getNativeValue();
};