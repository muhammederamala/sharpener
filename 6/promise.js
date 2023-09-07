console.log("Person 1 : shows ticket");
console.log("Person 2 : shows ticket");

const wifebringtickets = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve("ticket")
    },3000)
});

const getPopcorn = wifebringtickets.then(()=>{
    console.log("husband:lets go eat");
    return new Promise((resolve, reject) => resolve("get popcorn"))
});

const getButter = getPopcorn.then((t)=>{
    console.log("husband: i need butter on popcorn");
    return new Promise((resolve, reject) => resolve("got butter"))
})

getButter.then((t)=>{
    console.log(t)
})

console.log("Person 4 : shows ticket");
console.log("Person 5 : shows ticket");