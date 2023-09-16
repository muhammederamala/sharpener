function delayPrint(message,delay){
    return new Promise((resolve) =>{
        setTimeout(()=>{
            console.log(message)
            resolve()
        },delay)
    })
}


// **************************************************************
// using async await
async function print(){
    console.log('a')
    console.log('b')
    await delayPrint('c',3000)
    await delayPrint('d',0)
    console.log('e')
}

print()

// *******************************************************************

// using then syntax

// console.log('a')
// console.log('b')
// delayPrint('c',3000)
// .then(() =>{
//     delayPrint('d',0)
// })
// .then(()=>{
//     console.log('e')
// })
