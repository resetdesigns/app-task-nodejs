/*
 *	Object Property Shorthand Syntax
 *	Use case: Adding values to an object whose var name is the same as the object property
 */
const name = 'Joseph';
const age = 33;
const gender = 'Male';

// When vars and object properties share the same name you can use the shorthand syntax
// Without object property shorthand syntax
const person = {
    name: name,
    age: age,
    gender: gender,
};
console.log(person); // outputs { name: 'Joseph', age: 33, gender: 'Male' }

// With object property shorthand syntax
const anotherPerson = {
    name,
    age,
    gender,
};

console.log(anotherPerson); // outputs { name: 'Joseph', age: 33, gender: 'Male' }

/*
 *	Object Destructuring
 *	Use case: When you have an object you want to store its properties into individual variables
 */
const product = {
    label: 'My Product',
    price: 5,
    stock: 201,
    salePrice: undefined,
};

// Instead of explicity setting each var to the object property
// const label = product.label;
// const price = product.price;
// const stock = product.stock;
// You can destructure the object
const { price, stock } = product;
console.log('price ' + price);
console.log('stock' + stock);

// When destructuring you can also reassign the var name
const { label: productLabel } = product;
console.log('label ' + productLabel);

// You can also extend the object by defining another var with default values
const { rating = 5 } = product;
console.log('rating ' + rating);
