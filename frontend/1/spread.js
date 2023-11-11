oldArr = [1,2,3];

newArr = [...oldArr,4,5]

console.log(newArr)

oldObj = {
    name:'max'
}

newObj = {
    ...oldObj,
    age:'23'
}

console.log(newObj)

const filter = (...args)=>{
    return args.filter(element => element === 1)
}

console.log(filter(1,2,3))