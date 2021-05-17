// 字符串
let myName :string = `Gene`;
// 数字
let age :number = 18;
// 字符串 可以使用模板字符串：用`${变量}`
let sentence :string = `Hello ,my name is ${ myName }.I'll be +${age +1}+years old next month.`;
// ts数组：number[]或者数组范型Array<number>
let listA:number[]=[1,2,3];
let listB: Array<number> = [4, 5, 6];
// 元组Tuple,当访问一个越界的元素，会使用 ‘联合类型’ 替代
let x:[string,number];
x= ['afjaf',2];
// 枚举enum
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];
// any 不知道暂时是什么类型的时候就用any ,any 一把唆
// 类型断言 （1）用<>包裹着变量）（2）用as。但是在TS中使用JSX时，只有as
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let asValue :any = 'this is as assignment';
let asLength:number  = (asValue as string).length;
console.log(sentence,listA,listB,x,colorName);
console.log(strLength,asLength);