/*
Korištenje AI alata: DA
Alat: Gemini
Dijelovi zadatka: Pomoć pri izradi funkcije findProductByName(),
posebno pri normalizaciji teksta i realizaciji case-insensitive pretrage,
kao i pri provjeri vraćanja objekta proizvoda ili vrijednosti null.
*/

const VAT_RATE = 0.2;
const CURRENCY = "KM";
const USD_PER_EUR = 1.16;

// Kuponi su već normalizovani: napisani su velikim slovima i bez razmaka.
const VALID_COUPONS = ["SAVE10", "SAVE15", "FREESHIP"];

// Uklanja spoljne razmake i pretvara kod kupona u velika slova.
function normalizeCoupon(code) {
  code = code.trim();
  code = code.toUpperCase();
  return code;
}

// Provjerava da li se normalizovani kupon nalazi u nizu validnih kupona.
function isValidCoupon(code) {
  return VALID_COUPONS.indexOf(code) !== -1;
}

// Čita, normalizuje i provjerava kupon, a zatim prikazuje odgovarajuću poruku.
function validateAndNotify() {
  const code = document.getElementById("promo-input").value;
  const normalizedCode = normalizeCoupon(code);

  if (isValidCoupon(normalizedCode)) {
    if (normalizedCode === "SAVE10") {
      alert("Vaš kupon donosi 10% popusta.");
    } else if (normalizedCode === "SAVE15") {
      alert("Vaš kupon donosi 15% popusta.");
    } else {
      alert("Vaš kupon donosi besplatnu dostavu.");
    }
  } else {
    alert("Uneseni kupon nije validan.");
  }
}

// Svaki proizvod ima isti skup svojstava: name, price i qty.
const allProducts = [
  { name: "Ženski bež blejzer", price: 95, qty: 8 },
  { name: "Muška bijela košulja", price: 55, qty: 16 },
  { name: "Ženska bluza bez rukava", price: 32, qty: 6 },
  { name: "Muške plave farmerke", price: 70, qty: 14 },
  { name: "Retro farmerke", price: 70, qty: 5 },
  { name: "Kaput boje karamele", price: 95, qty: 12 },
  { name: "Pletena majica", price: 55, qty: 9 },
  { name: "Traper košulja", price: 34, qty: 18 },
  { name: "Elegantne pantalone", price: 28, qty: 10 },
  { name: "Široke pantalone", price: 30, qty: 7 },
];

// Računa ukupnu vrijednost svih proizvoda na lageru.
let totalValue = 0;

for (const product of allProducts) {
  totalValue += product.price * product.qty;
}

console.log("Ukupna vrijednost lagera: " + totalValue + " " + CURRENCY);

// Formira novi niz samo od proizvoda čija je količina 10 ili manja.
const lowStock = [];

for (const product of allProducts) {
  if (product.qty <= 10) {
    lowStock.push(product);
  }
}

console.log("Proizvodi sa niskim stanjem:");
console.log(lowStock);

// Pretražuje proizvode po nazivu bez obzira na velika i mala slova.
function findProductByName(list, searchName) {
  const normalizedSearchName = searchName.toLowerCase().trim();

  for (const product of list) {
    const normalizedProductName = product.name.toLowerCase().trim();

    if (normalizedProductName === normalizedSearchName) {
      return product;
    }
  }

  return null;
}

// Testovi kupona: validan, drugi validan i nevalidan kupon.
console.log(
  "Kupon save10 je validan:",
  isValidCoupon(normalizeCoupon(" save10 ")),
);
console.log(
  "Kupon FREESHIP je validan:",
  isValidCoupon(normalizeCoupon("FREESHIP")),
);
console.log(
  "Kupon POPUST20 je validan:",
  isValidCoupon(normalizeCoupon("POPUST20")),
);

// Testovi pretrage: postojeći i nepostojeći proizvod.
console.log(
  "Rezultat uspješne pretrage:",
  findProductByName(allProducts, " traper KOŠULJA "),
);
console.log(
  "Rezultat neuspješne pretrage:",
  findProductByName(allProducts, "Nepostojeći proizvod"),
);

// Provjerava podatke unesene u formu za prijavu.
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  return email === "admin" && password === "admin";
}

let iznos = 0;

// Dodaje cijenu proizvoda na ukupan iznos kupovine.
function dodajNaIznos(cena) {
  iznos += cena;
  return iznos;
}

console.log(dodajNaIznos(95));
console.log(dodajNaIznos(55));
console.log(dodajNaIznos(32));
iznos = 0;

// Prikazuje trenutni ukupni iznos klikom na ikonu korpe.
function openCart() {
  alert("Trenutni ukupni iznos porudžbine je " + iznos + " " + CURRENCY + ".");
}
