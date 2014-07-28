describe("JsonParser", function() {
    var jsonParser;

    beforeEach(function () {
        jsonParser = new JsonParser();
    });
    describe("should parse strings into tree", function () {
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
            it("should parse JSON with three numbers", function () {
                var tree = jsonParser.parse('{\"val1\":3,\"val2\":5,\"val3\":88}');
                var map = {'val1': new JsonNumber(3), 'val2': new JsonNumber(5), 'val3': new JsonNumber(88)};
                expect(tree).toEqual(new JsonObject(map));
            });
            it("should parse BOOLEAN false", function () {
                var tree = jsonParser.parse('{\"val1\":false}');
                var map = {'val1': new JsonBoolean(false)};
                expect(tree).toEqual(new JsonObject(map));
            });
            it("should parse BOOLEAN true", function () {
                var tree = jsonParser.parse('{\"val1\":true}');
                var map = {'val1': new JsonBoolean(true)};
                expect(tree).toEqual(new JsonObject(map));
            });
            it("should parse NULL correctly", function () {
                var tree = jsonParser.parse('{\"val1\":null}');
                var map = {'val1': new JsonObject(null)};
                expect(tree).toEqual(new JsonObject(map));
            });
            it("should parse JSON with arrays", function () {
                var tree = jsonParser.parse('{\"val1\":[1]}');
                var map = {'val1': new JsonArray([new JsonNumber(1)])};
                expect(tree).toEqual(new JsonObject(map));
            });
            it("should parse JSON arrays with multiple values", function () {
                var tree = jsonParser.parse('{\"val1\":[2,\"test\",4]}');
                var map = {'val1': new JsonArray([new JsonNumber(2), new JsonString('test'), new JsonNumber(4)])};
                expect(tree).toEqual(new JsonObject(map));
            });
            it("should parse JSON arrays with nested values", function () {
                var tree = jsonParser.parse('{\"val1\":[2,[1,{\"val7\":{\"val8\":99,\"val34\":true}},4],4]}');
                var map = {'val1': new JsonArray([new JsonNumber(2), new JsonArray([new JsonNumber(1), new JsonObject({'val7': new JsonObject({'val8': new JsonNumber(99), 'val34': new JsonBoolean(true)})}), new JsonNumber(4)]), new JsonNumber(4)])};
                expect(tree).toEqual(new JsonObject(map));
            });
            xit("should ignore whitespaces", function () {
                var tree = jsonParser.parse('{\"val1\" : [2 , [1 , {\"val7\" : {\"val8\" : 99, \"val34\" : true }  } , 4 ] , 4 ] }');
                var map = {'val1': new JsonArray([new JsonNumber(2), new JsonArray([new JsonNumber(1), new JsonObject({'val7': new JsonObject({'val8': new JsonNumber(99), 'val34': new JsonBoolean(true)})}), new JsonNumber(4)]), new JsonNumber(4)])};
                expect(tree).toEqual(new JsonObject(map));
            })

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
    describe("should deParse tree into string", function () {
        describe("should generate primitives", function () {
            it("should deParse empty tree", function () {
                var originalJsonString = '{}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse empty array", function () {
                var originalJsonString = '[]';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse number", function () {
                var originalJsonString = '{\"a\":3}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse bool", function () {
                var originalJsonString = '{\"c\":false}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse arrays", function () {
                var originalJsonString = '{\"arrayI\":[1,2,3]}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse empty array", function () {
                var originalJsonString = '{\"arrayI\":[]}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse null", function () {
                var originalJsonString = '{\"null\":null}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse strings", function () {
                var originalJsonString = '{\"str\":\"myStr\"}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
        });
        describe("should support recursion", function () {
            it("should support nested arrays", function () {
                var originalJsonString = '{\"arrayI\":[1,{\"arrayJ\":[2,55,6]},3]}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse JSON with nested JSONs", function () {
                var originalJsonString = '{\"val1\":{\"val2\":6}}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should parse JSON with three numbers", function () {
                var originalJsonString = '{\"val1\":3,\"val2\":5,\"val3\":88}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });
            it("should deParse JSON arrays with nested values", function () {
                var originalJsonString = '{\"val1\":[2,[1,{\"val7\":{\"val8\":99,\"val34\":true}},4],4]}';
                var tree = jsonParser.parse(originalJsonString);
                var restoredJsonString = jsonParser.print(tree);
                expect(restoredJsonString).toEqual(originalJsonString);
            });

        });
    });
});