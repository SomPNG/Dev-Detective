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


const dlBtn = document.querySelector('.dlBtn');
const dlIcon = document.querySelector('[dlIcon]');
const dlPara = document.querySelector('[dlPara]');
const wrapper = document.querySelector('.wrapper');
const main = document.querySelector('.main');
const searchBar = document.querySelector('.search-Bar');
const statBar = document.querySelector('.profile-info');

// Creating Dark mode and light mode applying functions

function applyLight(){
    dlIcon.classList.remove('fa-sun');
    dlIcon.classList.add('fa-moon');
    dlPara.innerText= "Dark";

    wrapper.style.backgroundColor = '#F0F2F5';
    wrapper.style.color = 'Black';
    username.style.color = 'Black';

    main.style.backgroundColor = "#F9F9F9";
    main.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
    searchBar.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
    searchBar.style.backgroundColor = "#F9F9F9";
    statBar.style.backgroundColor = "#CCCCCC";
    searchBtn.style.backgroundColor = '#E5E7EB';
}

function applyDark(){
    dlIcon.classList.remove('fa-moon');
    dlIcon.classList.add('fa-sun');
    dlPara.innerText= "Light";


    wrapper.style.backgroundColor = '#0D1117';
    wrapper.style.color = 'White';
    username.style.color = 'White';
    main.style.backgroundColor = "#161B22";
    main.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.6)";
    searchBar.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.6)";
    searchBar.style.backgroundColor = "#161B22";
    statBar.style.backgroundColor = "#0B0F14";
}

dlBtn.addEventListener('click',()=>{
    if(dlPara.innerText === "Dark"){
        applyDark();
    }
    else if(dlPara.innerText === "Light"){
        applyLight();
    }
})


// checking preffered mode of a user's pc
const preferMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if(preferMode){
    console.log('dark');
    applyDark();
}
else{
    applyLight();
    console.log("light");
}


// For change in dark or light mode
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',(e)=>{
    if(e.matches){
        applyDark();
        console.log("Prefers dark scheme");
    }
    else{
        applyLight();
        console.log("prefers light theme");
    }
})

