var string = 'Hello World';
var search = 'l';
var index;

for (var i = 0; i < string.length; i++) {
  if (string[i] === search) {
    index = i;
    break; // 반복문을 탈출한다.
  }
}

console.log(index); // 2
