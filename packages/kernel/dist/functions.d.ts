import { Constructable, Overwrite } from './interfaces';
/**
 * Efficiently determine whether the provided property key is numeric
 * (and thus could be an array indexer) or not.
 *
 * Always returns true for values of type `'number'`.
 *
 * Otherwise, only returns true for strings that consist only of positive integers.
 *
 * Results are cached.
 */
export declare function isNumeric(value: unknown): value is number | string;
/**
 * Determines if the value passed is a number or bigint for parsing purposes
 *
 * @param value - Value to evaluate
 */
export declare function isNumberOrBigInt(value: unknown): value is number | bigint;
/**
 * Determines if the value passed is a number or bigint for parsing purposes
 *
 * @param value - Value to evaluate
 */
export declare function isStringOrDate(value: unknown): value is string | Date;
/**
 * Efficiently convert a string to camelCase.
 *
 * Non-alphanumeric characters are treated as separators.
 *
 * Primarily used by Aurelia to convert DOM attribute names to ViewModel property names.
 *
 * Results are cached.
 */
export declare const camelCase: (input: string) => string;
/**
 * Efficiently convert a string to PascalCase.
 *
 * Non-alphanumeric characters are treated as separators.
 *
 * Primarily used by Aurelia to convert element names to class names for synthetic types.
 *
 * Results are cached.
 */
export declare const pascalCase: (input: string) => string;
/**
 * Efficiently convert a string to kebab-case.
 *
 * Non-alphanumeric characters are treated as separators.
 *
 * Primarily used by Aurelia to convert ViewModel property names to DOM attribute names.
 *
 * Results are cached.
 */
export declare const kebabCase: (input: string) => string;
/**
 * Efficiently (up to 10x faster than `Array.from`) convert an `ArrayLike` to a real array.
 *
 * Primarily used by Aurelia to convert DOM node lists to arrays.
 */
export declare function toArray<T = unknown>(input: ArrayLike<T>): T[];
/**
 * Retrieve the next ID in a sequence for a given string, starting with `1`.
 *
 * Used by Aurelia to assign unique ID's to controllers and resources.
 *
 * Aurelia will always prepend the context name with `au$`, so as long as you avoid
 * using that convention you should be safe from collisions.
 */
export declare function nextId(context: string): number;
/**
 * Reset the ID for the given string, so that `nextId` will return `1` again for the next call.
 *
 * Used by Aurelia to reset ID's in between unit tests.
 */
export declare function resetId(context: string): void;
/**
 * A compare function to pass to `Array.prototype.sort` for sorting numbers.
 * This is needed for numeric sort, since the default sorts them as strings.
 */
export declare function compareNumber(a: number, b: number): number;
/**
 * Efficiently merge and deduplicate the (primitive) values in two arrays.
 *
 * Does not deduplicate existing values in the first array.
 *
 * Guards against null or undefined arrays.
 *
 * Returns `PLATFORM.emptyArray` if both arrays are either `null`, `undefined` or `PLATFORM.emptyArray`
 *
 * @param slice - If `true`, always returns a new array copy (unless neither array is/has a value)
 */
export declare function mergeDistinct<T>(arr1: readonly T[] | T[] | null | undefined, arr2: readonly T[] | T[] | null | undefined, slice: boolean): T[];
/**
 * Decorator. (lazily) bind the method to the class instance on first call.
 */
export declare function bound<T extends Function>(target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;
export declare function mergeArrays<T>(...arrays: (readonly T[] | undefined)[]): T[];
export declare function mergeObjects<T extends object>(...objects: readonly (T | undefined)[]): T;
export declare function firstDefined<T>(...values: readonly (T | undefined)[]): T;
export declare const getPrototypeChain: <T extends Constructable<{}>>(Type: T) => readonly [T, ...Constructable<{}>[]];
export declare function toLookup<T1 extends {}>(obj1: T1): T1;
export declare function toLookup<T1 extends {}, T2 extends {}>(obj1: T1, obj2: T2): Overwrite<T1, T2>;
export declare function toLookup<T1 extends {}, T2 extends {}, T3 extends {}>(obj1: T1, obj2: T2, obj3: T3): Overwrite<T1, Overwrite<T1, T2>>;
export declare function toLookup<T1 extends {}, T2 extends {}, T3 extends {}, T4 extends {}>(obj1: T1, obj2: T2, obj3: T3, obj4: T4): Readonly<T1 & T2 & T3 & T4>;
export declare function toLookup<T1 extends {}, T2 extends {}, T3 extends {}, T4 extends {}, T5 extends {}>(obj1: T1, obj2: T2, obj3: T3, obj4: T4, obj5: T5): Readonly<T1 & T2 & T3 & T4 & T5>;
/**
 * Determine whether a value is an object.
 *
 * Uses `typeof` to guarantee this works cross-realm, which is where `instanceof Object` might fail.
 *
 * Some environments where these issues are known to arise:
 * - same-origin iframes (accessing the other realm via `window.top`)
 * - `jest`.
 *
 * The exact test is:
 * ```ts
 * typeof value === 'object' && value !== null || typeof value === 'function'
 * ```
 *
 * @param value - The value to test.
 * @returns `true` if the value is an object, otherwise `false`.
 * Also performs a type assertion that defaults to `value is Object | Function` which, if the input type is a union with an object type, will infer the correct type.
 * This can be overridden with the generic type argument.
 *
 * @example
 *
 * ```ts
 * class Foo {
 *   bar = 42;
 * }
 *
 * function doStuff(input?: Foo | null) {
 *   input.bar; // Object is possibly 'null' or 'undefined'
 *
 *   // input has an object type in its union (Foo) so that type will be extracted for the 'true' condition
 *   if (isObject(input)) {
 *     input.bar; // OK (input is now typed as Foo)
 *   }
 * }
 *
 * function doOtherStuff(input: unknown) {
 *   input.bar; // Object is of type 'unknown'
 *
 *   // input is 'unknown' so there is no union type to match and it will default to 'Object | Function'
 *   if (isObject(input)) {
 *     input.bar; // Property 'bar' does not exist on type 'Object | Function'
 *   }
 *
 *   // if we know for sure that, if input is an object, it must be a specific type, we can explicitly tell the function to assert that for us
 *   if (isObject<Foo>(input)) {
 *    input.bar; // OK (input is now typed as Foo)
 *   }
 * }
 * ```
 */
export declare function isObject<T extends object = Object | Function>(value: unknown): value is T;
/**
 * Determine whether a value is `null` or `undefined`.
 *
 * @param value - The value to test.
 * @returns `true` if the value is `null` or `undefined`, otherwise `false`.
 * Also performs a type assertion that ensures TypeScript treats the value appropriately in the `if` and `else` branches after this check.
 */
export declare function isNullOrUndefined(value: unknown): value is null | undefined;
//# sourceMappingURL=functions.d.ts.map