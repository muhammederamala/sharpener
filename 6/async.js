console.log("Person 1 : shows ticket");
console.log("Person 2 : shows ticket");

const preMovie = async () => {
    const wifebringtickets = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve("ticket")
        },3000)
    });

    const getPopcorn = new Promise((resolve, reject) =>{
        setTimeout(()=>{
            resolve("popcorns")
        },1000)
    })

    const getButter = new Promise((resolve,reject) =>{
        setTimeout(()=>{
            resolve("butter")
        },1000)
    })
    let ticket;
    try{
    ticket = await wifebringtickets;
    let [popcorn, butter] = await Promise.all([getPopcorn, getButter])
    console.log("popcorn, butter")
    console.log("got butter");
    }

    catch(e){
        ticket = "sad face"
    }

    return ticket;
}



preMovie().then((m)=>console.log(m))

console.log("Person 4 : shows ticket");
console.log("Person 5 : shows ticket");