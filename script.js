const url= "https://api.github.com/users/";
const username= document.querySelector("[search-field]");
const searchBtn = document.querySelector("[searchButton]")

const invalidUsername = document.querySelector('[invalidUsername]');

searchBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    getUserData(url+username.value);
});

async function getUserData(gitUrl) {
    try{
        const data= await fetch(gitUrl);
        const response= await data.json();
        username.value="";
        if(response?.login){
            displayData(response);
        }
        else{
            invalidUsername.classList.add('active');
            setTimeout(() => {
                invalidUsername.classList.remove('active');
            }, 2000);
        }
        
    }
    catch(err){
        console.log("Error during API call:" + err);
    }
}


const profilePic = document.querySelector('[pfp]');
const persname= document.querySelector('[person-name]');
const usernameLink = document.querySelector('[link-username]');
const joinDate = document.querySelector('[joining-date]');

const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];  

const userBio= document.querySelector('[person-bio]');

const repos= document.querySelector('[repo-num]');
const followers = document.querySelector('[followers-num]');
const following =document.querySelector('[following-num]');

const userlocation = document.querySelector('[location-info]');
const link = document.querySelector('[link-info]');
const xTwitter = document.querySelector('[x-username]');
const company = document.querySelector('[current-company]');

function displayData(userData){
    profilePic.src= `${userData?.avatar_url}`;

    if(userData?.name){
        persname.innerText = userData?.name;
    }
    else{
        persname.innerText = "Not Provided";
    }

    usernameLink.href= `https://github.com/${userData?.login}`
    usernameLink.innerText = '@'+userData?.login;

    joinDate.innerText = `Joined ${userData?.created_at.slice(8,10)} ${months[Number(userData?.created_at.slice(5,7))-1]} ${userData?.created_at.slice(0,4)}`;
    
    if(userData?.bio){
        userBio.innerText = userData?.bio;
    }
    else{
        userBio.innerText = "This Profile has no bio";
    }

    repos.innerText = userData?.public_repos;
    followers.innerText = userData?.followers;
    following.innerText = userData?.following;

    if(userData?.location){
        userlocation.innerText= userData.location;
        userlocation.href = `https://www.google.com/maps?q=${userData.location.split(",")[0]}`
    }
    else{
        userlocation.removeAttribute('href');
        userlocation.innerText = "Not Available";
    }

    if(userData?.blog!=""){
        link.href= userData.blog;
        link.innerText = userData.blog
    }
    else{
        link.removeAttribute('href');
        link.innerText= "Not Available";
    }

    if(userData?.twitter_username){
        xTwitter.href=`https://x.com/${userData.twitter_username}`;
        xTwitter.innerText= '@'+ userData?.twitter_username;
    }
    else{
        xTwitter.removeAttribute('href');
        xTwitter.innerText= "Not Available";
    }

    if(userData?.company){
        company.innerText = userData.company;
    }
    else{
        company.innerText= "Not Available"
    }

}

getUserData(url+'somPNG');
