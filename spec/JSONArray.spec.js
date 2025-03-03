import { toTimestamp, JSONArray, JSONObject } from '@themost/json';

describe('JSONArray', () => {

    it('should use JSONArray', () => {
        const arr = new JSONArray();
        arr.push(new Date(2022, 11, 14));
        const json = arr.toString();
        const value = toTimestamp(new Date(2022, 11, 14));
        expect(json).toEqual(`["${value}"]`);
    });

    it('should use JSONArray with Set', () => {
        const set = new Set([ 1,2,3,4,5 ]);
        const arr = new JSONArray(set);
        const json = arr.toString();
        expect(json).toEqual('[1,2,3,4,5]');
    });

    it('should use JSONArray with Map', () => {
        const map = new Map([ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]);
        const arr = new JSONArray(map);
        const json = arr.toString();
        expect(json).toEqual('[["a",1],["b",2],["c",3]]');
    });

    it('should use Array and change prototype to JSONArray', () => {
        const arr = [ 1, 2, 3, 4, 5 ];
        Object.setPrototypeOf(arr, JSONArray.prototype);
        const json = arr.toString();
        expect(json).toEqual('[1,2,3,4,5]');
    });

    it('should use JSONArray.toString() with indent', () => {
        const arr = new JSONArray([ 1, 2, 3, 4, 5 ]);
        const json = arr.toString(2);
        expect(json).toEqual(`[\n  1,\n  2,\n  3,\n  4,\n  5\n]`);
    });

    it('should use JSONObject with init', () => {
        const obj = new JSONObject({
            value: new Date(2022, 11, 14),
            hello: () => {
                return 'Hello, World!';
            }
        });
        expect(obj.value).toEqual(new Date(2022, 11, 14));
        expect(obj.hello()).toEqual('Hello, World!');
        expect(obj instanceof JSONObject).toBeTruthy();
        const json = obj.toString();
        expect(json).toEqual(`{"value":"${toTimestamp(new Date(2022, 11, 14))}"}`);
    });

    it('should use JSONObject without init', () => {
        const obj = new JSONObject();
        obj.value = new Date(2022, 11, 14);
        expect(obj.value).toEqual(new Date(2022, 11, 14));
        expect(obj instanceof JSONObject).toBeTruthy();
        const json = obj.toString();
        expect(json).toEqual(`{"value":"${toTimestamp(new Date(2022, 11, 14))}"}`);
    });

    it('should use JSONObject with class which overrides toString()', () => {

        class Foo {
            constructor() {
                this.message = 'Hello, World!';
                this.recipient = 'World';
            }
            toString() {
                return this.message;
            }
        }

        const a = new Foo();
        const obj = new JSONObject(a);
        expect(obj instanceof JSONObject).toBeTruthy();
        expect(obj.message).toEqual('Hello, World!');
        expect(obj.recipient).toEqual('World');
        obj.recipient = 'World!';
        const json = obj.toString();
        expect(json).toEqual(`{"message":"Hello, World!","recipient":"World!"}`);
    });

});