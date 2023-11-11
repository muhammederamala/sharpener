class Human{
    gender = 'male'
    printGender = () =>{
        console.log(this.gender)
    }
}

class Person extends Human{
    name = 'max'
    age = 20
    printName = () =>{
        console.log(this.name)
    }
    printAge = () =>{
        console.log(this.age)
    }
}

const person = new Person()
person.printName()
person.printGender()