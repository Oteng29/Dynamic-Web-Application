//EXERCISE 1

const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

// 1. Console log each name
names.forEach(name => {
  console.log(name);
});

// 2. Console log each name with matching province
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// 3. Map: convert province names to uppercase
const uppercaseProvinces = provinces.map(province => province.toUpperCase());
console.log(uppercaseProvinces);

// 4. Map: create new array with character count of names
const characterCount = names.map(name => name.length);
console.log(characterCount);

// 5. Sort provinces alphabetically
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// 6. Filter: remove provinces with the word "Cape"
const filteredProvinces = provinces.filter(province => !province.includes('Cape'));
console.log(filteredProvinces.length);

// 7. Map and Some: create boolean array checking for 'S' character in names
const hasSCharacter = names.map(name => name.startsWith('S') || name.includes('s'));
console.log(hasSCharacter);

// 8. Reduce: create an object indicating the province of an individual
const provinceObject = names.reduce((obj, name, index) => {
  obj[name] = provinces[index];
  return obj;
}, {});
console.log(provinceObject);


//EXERCISE 2

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ];
  
  // 1. Console log each product name
  products.forEach(product => {
    console.log(product.product);
  });
  
  // 2. Filter: filter out products with name longer than 5 characters
  const filteredProducts = products.filter(product => product.product.length <= 5);
  console.log(filteredProducts);
  
  // 3. Filter, Map, and Reduce: convert prices to numbers and calculate combined price
  const totalPrice = products
    .filter(product => product.price !== '' && !isNaN(Number(product.price)))
    .map(product => Number(product.price))
    .reduce((acc, price) => acc + price, 0);
  console.log(totalPrice);
  
  // 4. Reduce: concatenate all product names
  const concatenatedNames = products.reduce((acc, product) => {
    return acc === '' ? product.product : `${acc}, ${product.product}`;
  }, '');
  console.log(concatenatedNames);
  
  // 5. Reduce: calculate highest and lowest-priced items
  const { highest, lowest } = products.reduce((acc, product) => {
    if ((Number(product.price))) {
      if (acc.highest === null || product.price > acc.highest.price) {
        acc.highest = { price: product.price, name: product.product };
      }
      if (acc.lowest === null || product.price < acc.lowest.price) {
        acc.lowest = { price: product.price, name: product.product };
      }
    }
    return acc;
  }, { highest: null, lowest: null });
  console.log(`Highest: ${highest.name}. Lowest: ${lowest.name}`);
  
  // 6. Object.entries and Reduce: recreate object with changed keys
  const recreatedObject = Object.entries(products).reduce((acc, [key, value]) => {
    const modifiedKey = key === 'product' ? 'name' : key === 'price' ? 'cost' : key;
    acc[modifiedKey] = value;
    return acc;
  }, {});
  console.log(recreatedObject);
  
