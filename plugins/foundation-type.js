// 字符串
var myName = "Gene";
// 数字
var age = 18;
// 字符串 可以使用模板字符串：用`${变量}`
var sentence = "Hello ,my name is " + myName + ".I'll be +" + (age + 1) + "+years old next month.";
// ts数组：number[]或者数组范型Array<number>
var listA = [1, 2, 3];
var listB = [4, 5, 6];
// 元组Tuple,当访问一个越界的元素，会使用 ‘联合类型’ 替代
var x;
x = ['afjaf', 2];
// 枚举enum
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var colorName = Color[2];
// any 不知道暂时是什么类型的时候就用any ,any 一把唆
// 类型断言 （1）用<>包裹着变量）（2）用as
var someValue = "this is a string";
var strLength = someValue.length;
var asValue = 'this is as assignment';
var asLength = asValue.length;
console.log(sentence, listA, listB, x, colorName);
console.log(strLength, asLength);
