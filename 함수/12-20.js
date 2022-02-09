function add(x, y) {
  console.log(arguments);
  // [Arguments] { '0': 2, '1': 5, '2': 10 }
  return x + y;
}

add(2, 5, 10);
