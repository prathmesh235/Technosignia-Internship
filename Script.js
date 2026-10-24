// Day 8 — Practice Challenge Solutions
// Run with: node day8_challenge_solutions.js

// 1. Print all numbers from 1 to 100 divisible by 7
const divisibleBy7 = [];
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0) divisibleBy7.push(i);
}
console.log("1. Divisible by 7:", divisibleBy7.join(", "));

// 2. isEven(n) and use it to filter an array
const isEven = (n) => n % 2 === 0;
const numbers = [3, 8, 12, 7, 20, 5];
console.log("2. Even numbers:", numbers.filter(isEven));

// 3. Second-largest number in an array
function secondLargest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique.length >= 2 ? unique[1] : null;
}
console.log("3. Second largest of [10, 45, 32, 45, 8]:", secondLargest([10, 45, 32, 45, 8]));

// 4. Count how many times each character appears in a string
function charCount(str) {
  const counts = {};
  for (const ch of str) {
    counts[ch] = (counts[ch] || 0) + 1;
  }
  return counts;
}
console.log("4. Characters in 'banana':", charCount("banana"));

// 5. Books under price 500
const books = [
  { title: "JavaScript Basics", price: 450 },
  { title: "Advanced CSS", price: 650 },
  { title: "HTML Handbook", price: 300 },
  { title: "React in Action", price: 799 },
  { title: "Git Essentials", price: 499 },
];
const cheapBooks = books.filter((book) => book.price < 500);
console.log("5. Books under 500:");
for (const book of cheapBooks) {
  console.log(`   - ${book.title}: ₹${book.price}`);
}