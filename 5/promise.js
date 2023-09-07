const user = {
    lastActivityTime: null,
    posts: [],
}

function updateLastUserActivityTime(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            user.lastActivityTime = new Date();
            resolve();
        },1000)
    })
}


function createPost(post){
    return new Promise((resolve) =>{
        setTimeout(() =>{
            user.posts.push(post);
            resolve();
        },1000)
    })
}

function deletePost(){
    return new Promise((resolve) => {
        setTimeout(()=>{
            if(user.posts.length > 0){
                const deletedPost = user.posts.pop();
                resolve(deletedPost);
            }
        })
    })
}

document.getElementById("postForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    createPost({title,content})
    .then(updateLastUserActivityTime)
    .then(() =>{
        console.log("Posts:",user.posts);
        console.log("Last ActiveL", user.lastActivityTime);

        return deletePost();
    })
    .then((deletedPost)=>{
        console.log("Deleted Post:", deletedPost);
        console.log("updated Post:", user.posts);
    })
    .catch((error)=>{
        console.error(error);
    })
    

})