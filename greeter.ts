interface Person{
    name:string,
    age:number,
    address:string
}
function greeter(person:Person){
     
    return "halo,"+person.name+",my age is "+person.age+",my address is "+person.address;
}

let user = {
    name:"fitor",
    age:18,
    address:'jiajiahao building'
}
// document.body.innerHTML = greeter(user);
console.log(greeter(user)); 