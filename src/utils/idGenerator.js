export default function generateId() {    
  const prefix = "TKT";

  console.log(" all ok ... importing from correct place ...  ");

  const now = Date.now().toString();
  const timePart = now.slice(-4);

  const letters = Array.from({ length: 2 }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))
  ).join("");

  return prefix + timePart + letters;

}