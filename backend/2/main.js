// const student = {
//     name: 'max',
//     age: '25',
//     place: 'redbull',
//     greet(){
//         console.log("hi, i am " +this.name)
//     }
// }

// student.greet()



const fruits = ['apple', 'oranges' , '', 'mango', '' , 'lemon']

console.log(fruits.map(fruit =>{
    if(fruit===''){
        return 'empty string'
    }
    else{
        return fruit
    }
}))