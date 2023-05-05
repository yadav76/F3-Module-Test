// Getting all the Attributes
const fetchBtn = document.getElementById('fetch-data');
const info = document.querySelector('.info');
const pinContent = document.querySelector('.other-content');
const postOffice = document.querySelector('.post-office');
const lattitude = document.getElementById('lat');
const longitude = document.getElementById('long');
const city = document.getElementById('city');
const region = document.getElementById('region');
const organisation = document.getElementById('organisation');
const hostname = document.getElementById('hostname');
const map = document.getElementById('map');
const x = document.getElementById('x');
const timeZone = document.getElementById('time-zone');
const dateTime = document.getElementById('date-time');
const pincode = document.getElementById('pincode');
const message = document.getElementById('message');
const searchBar = document.getElementById('search-bar');
const showIp = document.getElementById('show-ip');

let IP;
let lat;
let long;
let pin;
var jsonData;

var postArr = [];

var ipUrl = `https://api.ipify.org?format=json`;
fetch(ipUrl)
.then((response) => response.json())
.then((data) => {
    IP = data.ip;

    document.getElementById('ip').innerText = data.ip;
    document.getElementById('ip').style.display = "none";
})


fetchBtn.addEventListener('click', () => {

    setTimeout(() => {

        document.getElementById('ip').style.display = "inline-block";
        
        var url = `https://ipinfo.io/${IP}/geo?token=d6aa724e6f2633`;

        fetch(url)
        .then((response) => response.json())
        .then((data) => {

            info.style.display = "flex";
            pinContent.style.display = "block";

            jsonData = data;

            // console.log(jsonData);

            let loc = jsonData.loc;
            lat = loc.split(',')[0];
            long = loc.split(',')[1];

            lattitude.innerHTML = `<strong>Lat: </strong>${lat}`;
                longitude.innerHTML = `<strong>Long: </strong>${long}`;
                city.innerHTML = `<strong>City: </strong>${jsonData.city}`;
                region.innerHTML = `<strong>Region: </strong>${jsonData.region}`;
                organisation.innerHTML = `<strong>Organisation: </strong>${jsonData.org}`;
                hostname.innerHTML = `<strong>Hostname: </strong>${jsonData.hostname}`;

            // Now show map
            map.setAttribute('src',`https://maps.google.com/maps?q=${lat},${long}&hl=en&z=14&amp&output=embed`);

            let str = new Date().toLocaleString("en-US", { timeZone: `${jsonData.timezone}` });
                timeZone.innerHTML = `<strong>Time Zone: </strong>${jsonData.timezone}`;
                dateTime.innerHTML = `<strong>Date And Time: </strong>${str}`;

                pin = jsonData.postal;
                pincode.innerHTML = `<strong>Pincode: </strong>${jsonData.postal}`;
                post(pin);
        })

    }, 1000);

    // Hide fetch Button
        fetchBtn.style.display='none';
})


function post(pin){

    var url = `https://api.postalpincode.in/pincode/${pin}`;

    fetch(url)
    .then((response) => response.json())
    .then((data) => {

        message.innerHTML = `<strong>Message: </strong>${data[0].Message}`;

        postArr = data[0].PostOffice;

        searchBar.style.display='block';

        showPost(postArr);
    })
}

// console.log(postArr);

function showPost(Arr) {

    postOffice.innerHTML='';
    let tempHtml='';

    Arr.map((ele)=>{
        tempHtml +=`
        <div class="post-content">
         <div><strong>Name:</Strong> ${ele.Name}</div>
         <div><strong>Branch Type:</Strong> ${ele.BranchType}</div>
         <div><strong>Delivery Status:</Strong> ${ele.DeliveryStatus}</div>
         <div><strong>District:</Strong> ${ele.District}</div>
         <div><strong>Division:</Strong> ${ele.Division}</div>
        </div>
        `
    })

    postOffice.innerHTML= tempHtml;
}


// Filter the Post office
searchBar.addEventListener('input',()=>{
    var Arr = postArr.filter((ele)=>{
        
        if(ele.Name.toLowerCase().includes(searchBar.value.trim().toLowerCase()) || ele.BranchType.toLowerCase().includes(searchBar.value.trim().toLowerCase())){
            return ele;
        }
    })
    showPost(Arr);
})