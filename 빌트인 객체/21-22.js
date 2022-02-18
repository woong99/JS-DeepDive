// 숫자
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false

// 문자열
console.log(isNaN('blabla')); // true
console.log(isNaN('10')); // false
console.log(isNaN('10.12')); // false
console.log(isNaN('')); // false: '' => 0
console.log(isNaN(' ')); // false: ' ' => 0

// 불리언
console.log(isNaN(true)); // false: true -> 1
console.log(isNaN(null)); // false: null -> 0

// undefined
console.log(isNaN(undefined)); // true: undefined -> NaN

// 객체
console.log(isNaN({})); // true: {} -> NaN

// date
console.log(isNaN(new Date())); // false: new Date() => Number
console.log(isNaN(new Date().toString())); // true: String => NaN
