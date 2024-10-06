

// all videos api and search by query api fetch here
const allVideosApiHandle = async (userInputValue) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${userInputValue ? `?category=${userInputValue}` : ''}`);
    const data = await res.json();

    allVideosLoader(data.posts)

}

// all videos loader function and search by filter functionality
const allVideosLoader = (posts) => {

    const mainContainer = document.getElementById('allPostMainContainer');
    mainContainer.innerHTML = "";

    posts.forEach(post => {

        const div = document.createElement('div');

        div.innerHTML = `
         <div class="card flex flex-row bg-[#F3F3F5] py-5 px-3 mb-3">
                            <div class="post_left w-[15%]">

                                <div class="indicator">
                                    ${post.isActive == true ? `<span class="indicator-item badge badge-success"></span>` : `<span class="indicator-item badge badge-error"></span>`}
                                    <div class="avatar">
                                        <div class="w-24 rounded-xl">
                                            <img class="border-2 border-gray-200"
                                                src="${post.image}" />
                                        </div>
                                    </div>
                                </div>




                            </div>
                            <div class="post_right w-3/4">
                                <div class="post_header flex gap-4">
                                    <p># <span>${post.category}</span></p>
                                    <p>Author: ${post.author.name}</p>
                                </div>
                                <h2 class="text-xl font-bold py-2">${post.title}</h2>
                                <p>${post.description}</p>
                                <div class="border-2 border-dashed border-gray-300 my-6"></div>

                                <div class="post_info flex justify-between items-center pb-5">
                                    <ul class="flex gap-4 items-center">
                                        <li><i class="fa-regular fa-comment-dots"></i> <span class="ml-1">${post.comment_count}</span>
                                        </li>
                                        <li><i class="fa-regular fa-eye"></i> <span class="ml-1">${post.view_count}</span></li>
                                        <li><i class="fa-regular fa-clock"></i> <span class="ml-1">${post.posted_time}</span> Min</li>

                                    </ul>
                                    <button onclick ="addToMark('${post.description}' , '${post.view_count}')" class="bg-[#10B981] rounded-full py-1 px-2"><i
                                            class="fa-solid fa-envelope text-white"></i></button>
                                </div>

                            </div>
                        </div>
    `;

        mainContainer.appendChild(div);
    })



};


// click to envelop icon to add description into right side and counter increase functionality
const addToMark = (description, views) => {

    const detailsContainer = document.getElementById('details_card_right');

    const div = document.createElement('div');
    div.innerHTML = `
      <div class="click_to_add_card flex items-center mt-3 rounded-xl gap-3 bg-white px-3 py-3">
          <p>${description}</p>
          <p class="flex items-center gap-2"><i class="fa-regular fa-eye"></i> <span>${views}</span>
           </p>
        </div>
    `
    detailsContainer.appendChild(div);

    // marks as read counter increase 

    const marksAsReadCounterText = document.getElementById('marksAsReadCounter').innerText;

    const countNum = parseInt(marksAsReadCounterText);
    const counter = countNum + 1;

    document.getElementById('marksAsReadCounter').innerText = counter;

}


// user input handle here
const userInputHandle = () => {
    const userInput = document.getElementById('userInput').value;

    allVideosApiHandle(userInput);


}

// latest all post api fetch here

const latestPostApiFetch = async () =>{

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    
    latestVideosLoader(data);

}

// latest videos loader using api
const latestVideosLoader = (latestPosts) =>{

    const latestPostContainer = document.getElementById('latestPostContainer');

    latestPosts.forEach(post => {

        const div = document.createElement('div');
        div.innerHTML = `
             <div class="latest_post_card shadow-xl px-3 py-3 border-gray-300 border-2 h-[460px]">
                        <div class="w-full h-[230px]">
                            <img class="w-full h-full rounded-xl"
                                src="${post.cover_image}"
                                alt="latest post img">
                        </div>
                        <p class="py-2"><i class="fa-solid fa-calendar-days"></i> ${post.author.posted_date? `<span class="text-xs font-bold">${post.author.posted_date}</span>` : "No Publish Date"} </p>
                        <h2 class="text-lg font-bold pb-2">${post.title}</h2>
                        <p class="text-sm">${post.description}
                        </p>
                        <div class="post_by flex gap-6 mt-3">
                            <div class="left">
                                <img class="w-[55px] h-[55px] rounded-full border-2 border-gray-200"
                                    src="${post.profile_image}"
                                    alt="post by">

                            </div>
                            <div class="right">
                                ${post.author.name?`<h3 class="text-lg font-bold">${post.author.name}</h3>`: "Benevolent"}
                               ${post.author.designation? ` <p class="text-xs font-semibold">${post.author.designation}</p>`: "Unknown"}
                            </div>
                        </div>

                    </div>
        `;

        latestPostContainer.appendChild(div);

    })


}

// all videos loader using api function call here
allVideosApiHandle();  
// latest posted videos loader using api function call here
latestPostApiFetch();