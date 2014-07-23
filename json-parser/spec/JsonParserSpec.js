describe("JsonParser", function() {
  var jsonParser;

  beforeEach(function() {
    jsonParser = new JsonParser();
  });



    describe("to be initialized properly", function () {
        it("should parse an empty tree correctly", function () {
            var tree = jsonParser.parse('{}');
            expect(tree).toEqual(JsonObject.empty());
        });
        it("should construct JSON object as not empty", function () {
            var jNumber = new JsonObject('test');
            expect(jNumber).toNotEqual(JsonObject.empty());
        });
        it("should construct JSON number correctly", function () {
            var jNumber = new JsonNumber(3);
            expect(jNumber.getNativeValue()).toBe(3);
        });
        it("should allow putting new items", function () {
            var newMap = {a: new JsonNumber(3)};
            expect(newMap).toNotEqual(JsonObject.empty());
        });
    });
    describe("should parse data", function () {
        it("should parse JSON single number", function () {
            var tree1 = jsonParser.parse('{\"a\":3}');
            var newMap1 = {a: new JsonNumber(3)};

            expect(tree1).toEqual(new JsonObject(newMap1));


            var tree2 = jsonParser.parse('{\"a\":4}');
            var newMap2 = {};
            newMap2['a'] = new JsonNumber(4);
            expect(tree2).toEqual(new JsonObject(newMap2));
        });
        it("should parse JSON single string", function () {
            var tree1 = jsonParser.parse('{\"a\":\"someText\"}');
            var newMap1 = {a: new JsonString("someText")};
            expect(tree1).toEqual(new JsonObject(newMap1));
        });
        it("should parse JSON with two numbers", function () {
            var tree = jsonParser.parse('{\"val1\":3, \"val2\":5, \"val3\":88}');
            var map = {'val1': new JsonNumber(3), 'val2': new JsonNumber(5), 'val3': new JsonNumber(88)};
            expect(tree).toEqual(new JsonObject(map));
        });
    });
    describe("should allow recursion", function () {
        it("should parse JSON with nested JSONs", function () {
            var tree = jsonParser.parse('{\"val1\":{\"val2\":6}}');
            var map = {'val1': new JsonObject({ 'val2': new JsonNumber(6)})};
            expect(tree).toEqual(new JsonObject(map));
        });
        it("should parse JSON with nested commas", function () {
            var tree = jsonParser.parse('{\"val1\":{\"val2\":5,\"val3\":436}}');
            var map = {'val1': new JsonObject({ 'val2': new JsonNumber(5), 'val3': new JsonNumber(436)})};
            expect(tree).toEqual(new JsonObject(map));
        });

    });

});