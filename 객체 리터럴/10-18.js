var person = {
  name: 'Lee',
};

// 프로퍼티 동적 생성
person.age = 20;

// person 객체에 age 프러퍼티가 존재한다.
// 따라서 delete 연산자로 age 프로퍼티를 삭제할 수 있다.
delete person.age;

console.log(person); // { name: 'Lee' }
