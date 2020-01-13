// 1. type
let str = 'abc'
let number = 123
let obj = {}

console.log(typeof str) // 'string'
console.log(typeof number) // 'number'
console.log(typeof obj) // 'object'
    // 2. boolean

// false ~ null, undefined, NaN, '', 0, false
// true ~ else

// == not check type; === also check type

// 3. string
// Regex
let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
let str = 'abc'
let str2 = '0912345678'
let str3 = '012-0998-0988'
console.log(regex.test(str)) // false
console.log(regex.test(str2)) // true
console.log(regex.test(str3)) // true

'abc'.length // 3
    '  abc abc \n\r \t '.trim() // 'abc abc'
'abc   abc'.replace(/[ ]+/g, ' ') // 'abc abc'
'abc123'.replace('abc', '000') // '000123'
'Abc'.toLowerCase() // 'abc'
'Abc'.toUpperCase() // 'ABC'

'abc'.includes('b') // true
'abc'.startsWith('a') // true
'abc'.endsWith('c') // true

'0123456789'.substring(1, 6) // '12345'
'0123456789'.substring(7), '789'

// 4. Number
parseInt('123') // 123
parseFloat('123.1') // 123.1

Math.PI // 3.14
Math.sqrt(2) // 1.4...
Math.pow(2, 3) // 8
Math.sin(Math.PI / 2) // 1
Math.asin()
Math.cos & Math.acos
Math.tan & Math.atan
Math.ceil(1.2) // 2
Math.floor(1.2) // 1
let num = 1.123123
parseInt(num * 100) / 100

// 5. Array
let array = [1, 2, 3]
for (let number of array) {
    console.log(number)
}
// .push() - pop()
[1, 2, 3].push(4) // [1, 2, 3, 4]
    [1, 2, 3].pop() // [1, 2]
    // .unshift() - .shift()
    [1, 2, 3].unshift(0) // [0, 1, 2, 3]
    [1, 2, 3].shift(0) // [2, 3]
    // .splice()
    [0, 1, 2].splice(1, 1) // [0, 2]
    [0, 1, 2].splice(1, 2) // [0]
    [0, 1, 2].splice(1, 1, 10) // [0, 10, 2]
    [0, 1, 2].splice(1, 2, 10) // [0, 10]
    // .forEach()
array.forEach(function(number) {
        console.log(number)
    })
    // .sort()
    [2, 1, 3].sort() // [1, 2, 3]
    ['b', 'c', 'd'].sort() // ['b', 'c', 'd']
    [{ id: 2 }, { id: 1 }, { id: 3 }]
    .sort(function(e1, e2) {
        // return < 0 >> e1 < e2
        // return = 0 >> e1 == e2
        // return > 0 >> e1 > 2
        return e1.id - e2.id
    })
    // .filter()
    [1, 2, 3, 4].filter(function(element) {
        return element % 2 == 0
    }) // [2, 4]
    // .find() .findIndex()
    // .includes()
    // .map()
    [2, 4, 6].map(function(element) {
        return element / 2
    }) // [1, 2, 3]
    // 6. class - object, OOP
    // class, object, constructor, attributes, methods
    // lop - doi tuong - ham tao - thuoc tinh - phuong thuc
    // inheritance - encapsulation - polymorphism - abstraction 
    // ke thua - dong goi - da hinh - truu tuong



// let ? :
// (condition)? (value if true) : (value if false)

let number = 10;
let otherNumber = number > 10 ? 1 : number < 0 ? -1 : 0



let data = { id: 1, name: 'xxx', age: 20 }
let { id, name, age } = data
console.log(id)
console.log(name)
    // declare info form data

let { id, name, age: number } = data

let arr = [1, 2, 3]
let [ele1, ele2, ele3] = arr
console.log(ele1)
console.log(ele2)
console.log(ele3)