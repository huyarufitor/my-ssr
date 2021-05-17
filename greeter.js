function greeter(person) {
    return "halo," + person.name + ",my age is" + person.age + ",my address is" + person.address;
}
var user = {
    name: "fitor",
    age: 18,
    address: 'jiajiahao building'
};
// document.body.innerHTML = greeter(user);
console.log(greeter(user));
