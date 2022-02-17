const person = {
  name: 'Lee',
  address: 'Seoul',
  __proto__: { age: 20 },
};

// for...in 문의 변수 prop에 person 객체의 프로퍼티 키가 할당된다.
for (const key in person) {
  console.log(key + ': ' + person[key]);
}
// name: Lee
// address: Seoul
// age: 20
