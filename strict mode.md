# strict mode

## strict mode란?

```JS
function foo() {
  x = 10;
}
foo();
console.log(x); // 10
```

전역 스코프에 x 변수의 선언이 존재하지 않기 때문에 `ReferenceError`를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성한다. 이때 전역 객체의 x 프로퍼티는 마치 전역 변수처럼 사용할 수 있다. 이러한 현상을 **암묵적 전역**이라 한다.

암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 크다. 오타나 문법 지식의 미비로 인한 실수는 언제나 발생한다. 이러한 실수를 방지하기 위해 ES5부터 strict mode(엄격 모드)기 추가되었다. strict mode는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

하지만 ESLint가 더 조음^^

---

## strict mode의 적용

전역의 선두 또는 함수 몸체의 선두에 `'use strict';`를 추가한다.

```JS
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict mode가 적용된다.

---

## 전역에 strict mode를 적용하는 것은 피하자

전역에 적용한 strict mode는 스크립트 단위로 적용된다.

```HTML
<!DOCTYPE html>
<html lang="en">
  <body>
    <script>
      'use strict';
    </script>
    <script>
      x = 1; // 에러가 발생하지 않는다.
      console.log(x); // 1
    </script>
    <script>
      'use strict';

      y = 1; // ReferenceError: y is not defined
      console.log(y);
    </script>
  </body>
</html>
```

---

## 함수 단위로 strict mode를 적용하는 것도 피하자

어떤 함수는 strict mode를 적용하고 어떤 함수는 strict mode를 적용하지 않는 것은 바람직하지 않으며 모든 함수에 일일이 strict mode를 적용하는 것은 번거로운 일이다. 그리고 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.

```JS
(function () {
  // non-strict mode
  var let = 10; // 에러가 발생하지 않는다.

  function foo() {
    'use strict';
    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
})();
```

---

## strict mode가 발생시키는 에러

### 암묵적 전역

선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.

```JS
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
})();
```

### 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`가 발생한다.

```JS
(function () {
  'use strict';

  var x = 1;
  delete x; // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a; // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo; // SyntaxError: Delete of an unqualified identifier in strict mode.
})();
```

### 매개변수 이름의 중복

중복된 매개변수 이름을 사용하면 SyntaxError가 발생한다.

```JS
(function () {
  'use strict';

  // SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
})();
```

### with 문의 사용

with 문을 사용하면 SyntaxError가 발생한다. with 문은 전달된 객체를 스코프 체인에 추가한다.

```JS
(function () {
  'use strict';

  // SyntaxError: Strict mode code may not include a with statement
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

---

## strict mode 적용에 의한 변화

### 일반 함수의 this

strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

```JS
(function () {
  'use strict';

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo {}
  }
  new Foo();
})();
```

### arguments 객체

strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

```JS
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})();
```
