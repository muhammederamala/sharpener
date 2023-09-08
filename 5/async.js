
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


const handlePostFormSubmit = async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    try{
        await createPost({title, content});
        await updateLastUserActivityTime();

        console.log("POSTS:",user.posts);
        console.log("Last Active:",user.lastActivityTime);

        const deletedPost = await deletePost();
        console.log("Deleted Post:", deletedPost);
        console.log("Updated Post:", user.posts);
        } 
        catch (error){
            console.error(error);
        }
}
    



document.getElementById("postForm").addEventListener("submit", handlePostFormSubmit);
