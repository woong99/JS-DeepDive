function countdown(n) {
  if (n < 0) return;
  console.log(n);
  countdown(n - 1);
}
countdown(10);
// 10 9 8 7 6 5 4 3 2 1 0
