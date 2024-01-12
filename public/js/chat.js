const messageTextArea = document.getElementById("messageTextArea");
const messageSendBtn = document.getElementById("messageSendBtn");
const chatBoxBody = document.getElementById("chatBoxBody");
const uiGroup = document.getElementById("groups");
const groupNameHeading = document.getElementById("groupNameHeading");
const socket = io("http://localhost:5000");
// socket.on("data", (data) => {
//   console.log(data);
// });

async function activeGroup(e) {
  chatBoxBody.innerHTML = "";
  groupNameHeading.innerHTML = "";
  const activeLi = document.getElementsByClassName("active");
  if (activeLi.length != 0) {
    activeLi[0].removeAttribute("class", "active");
  }
  let li = e.target;
  while (li.tagName !== "LI") {
    li = li.parentElement;
  }
  li.setAttribute("class", "active");
  const groupName = li.querySelector("span").textContent;
  localStorage.setItem("groupName", groupName);
  const span = document.createElement("span");
  span.appendChild(document.createTextNode(groupName));
  groupNameHeading.appendChild(span);
  getMessages();
}

async function messageSend() {
  try {
    if (chatBoxBody.querySelector(".groupMembersDiv")) {
      const members = chatBoxBody.querySelectorAll(".groupMembersDiv");
      members.forEach((member) => {
        member.remove();
      });
    }
    const message = messageTextArea.value;
    const token = localStorage.getItem("token");
    const groupName = localStorage.getItem("groupName");
    if (!groupName || groupName == "") {
      return alert("Select group to send the message");
    }
    const res = await axios.post(
      `http://localhost:4000/chat/sendMessage/`,
      {
        message: message,
        groupName: groupName,
      },
      { headers: { Authorization: token } }
    );
    messageTextArea.value = "";
    getMessages();
  } catch (error) {
    console.log("something went wrong");
  }
}

function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

async function getMessages() {
  const token = localStorage.getItem("token");
  const decodedToken = decodeToken(token);
  const userId = decodedToken.userId;
  const groupName = localStorage.getItem("groupName");

  socket.emit("getMessages", groupName);

  socket.on("messages", (messages) => {
    chatBoxBody.innerHTML = "";
    messages.forEach((message) => {
      
      
      if (message.userId == userId) {
        console.log(message)
        if(message.isImage==true){
          
          const div = document.createElement("div");
          chatBoxBody.appendChild(div);
  
          const messageSendby = document.createElement("span");
          messageSendby.classList.add(
            "d-flex",
            "justify-content-end",
            "px-3",
            "mb-1",
            "text-uppercase",
            "small",
            "text-white"
          );
          messageSendby.appendChild(document.createTextNode("You"));
          div.appendChild(messageSendby);
  
          const messageBox = document.createElement("div");
          const messageText = document.createElement("div");
          const image_tag=document.createElement("img")
          image_tag.src=message.message
          console.log(message.message)
  
          messageBox.classList.add("d-flex", "justify-content-end", "mb-4");
  
          messageText.classList.add("msg_cotainer_send");
          messageText.appendChild(image_tag);
  
          messageBox.appendChild(messageText);
          div.appendChild(messageBox);
        }
        else{
          const div = document.createElement("div");
        chatBoxBody.appendChild(div);

        const messageSendby = document.createElement("span");
        messageSendby.classList.add(
          "d-flex",
          "justify-content-end",
          "px-3",
          "mb-1",
          "text-uppercase",
          "small",
          "text-white"
        );
        messageSendby.appendChild(document.createTextNode("You"));
        div.appendChild(messageSendby);

        const messageBox = document.createElement("div");
        const messageText = document.createElement("div");

        messageBox.classList.add("d-flex", "justify-content-end", "mb-4");

        messageText.classList.add("msg_cotainer_send");
        messageText.appendChild(document.createTextNode(message.message));

        messageBox.appendChild(messageText);
        div.appendChild(messageBox);
        }
      } else {
        if(message.isImage==true){
          
          const div = document.createElement("div");
          chatBoxBody.appendChild(div);
  
          const messageSendby = document.createElement("span");
          messageSendby.classList.add(
            "d-flex",
            "justify-content-start",
            "px-3",
            "mb-1",
            "text-uppercase",
            "small",
            "text-white"
          );
          messageSendby.appendChild(document.createTextNode(message.name));
          div.appendChild(messageSendby);
  
          const messageBox = document.createElement("div");
          const messageText = document.createElement("div");
          const image_tag=document.createElement("img")
          image_tag.src=message.message
          console.log(message.message)
  
          messageBox.classList.add("d-flex", "justify-content-start", "mb-4");
  
          messageText.classList.add("msg_cotainer");
          messageText.appendChild(image_tag);
  
          messageBox.appendChild(messageText);
          div.appendChild(messageBox);
        }
        else{
          const div = document.createElement("div");
        chatBoxBody.appendChild(div);

        const messageSendby = document.createElement("span");
        messageSendby.classList.add(
          "d-flex",
          "justify-content-start",
          "px-3",
          "mb-1",
          "text-uppercase",
          "small",
          "text-white"
        );
        messageSendby.appendChild(document.createTextNode(message.name));
        div.appendChild(messageSendby);

        const messageBox = document.createElement("div");
        const messageText = document.createElement("div");

        messageBox.classList.add("d-flex", "justify-content-start", "mb-4");

        messageText.classList.add("msg_cotainer");
        messageText.appendChild(document.createTextNode(message.message));

        messageBox.appendChild(messageText);
        div.appendChild(messageBox);
        }
      }
    });
  });
}


const fileInput = document.getElementById('file')
const uploadbtn = document.getElementById('uploadbtn')
uploadbtn.addEventListener('click',uploadFile);
       async function uploadFile(e){
        try{
            e.preventDefault();
            const file = fileInput.files[0];
            console.log(file);
            if(!file){
                alert('Choose a File to continue')
            }
            else{
              const groupName = localStorage.getItem("groupName");
              const token = localStorage.getItem("token");
                const formData = new FormData();
                formData.append('file', fileInput.files[0]);
                formData.append('groupName',groupName)
            console.log(formData);
            
            const response=await axios.post(`http://localhost:4000/chat/sendfile`,formData,
            {
                headers: {
                  Authorization: token , 
                  'Content-Type': 'multipart/form-data'
                }
              })
                // console.log(response.data.message.message);
                // document.getElementById('new-message').value=response.data.message.message
                getMessages();
            }
        }catch(err){
            console.log(err);
        }
       }

// async function getMessages() {
//   try {
//     const groupName = localStorage.getItem("groupName");
//     if (!groupName || groupName == "") {
//       return alert("Select group to get the message");
//     }
//     let param;
//     const localStorageChats = JSON.parse(localStorage.getItem("chats"));
//     if (localStorageChats && localStorageChats.length !== 0) {
//       let array = JSON.parse(localStorage.getItem("chats"));
//       let length = JSON.parse(localStorage.getItem("chats")).length;
//       param = array[length - 1].id;
//     } else {
//       param = 0;
//     }
//     const res = await axios.get(
//       `http://localhost:4000/chat/getMessages?param=${param}&groupName=${groupName}`
//     );
//     const token = localStorage.getItem("token");
//     const decodedToken = decodeToken(token);
//     const userId = decodedToken.userId;
//     // chatBoxBody.innerHTML = "";
//     const chats = JSON.parse(localStorage.getItem("chats"));
//     if (!chats) {
//       localStorage.setItem("chats", JSON.stringify(res.data.messages));
//     } else {
//       res.data.messages.forEach((message) => {
//         chats.push(message);
//       });
//       localStorage.setItem("chats", JSON.stringify(chats));
//     }
//     res.data.messages.forEach((message) => {
//       if (message.userId == userId) {
//         const div = document.createElement("div");
//         chatBoxBody.appendChild(div);

//         const messageSendby = document.createElement("span");
//         messageSendby.classList.add(
//           "d-flex",
//           "justify-content-end",
//           "px-3",
//           "mb-1",
//           "text-uppercase",
//           "small",
//           "text-white"
//         );
//         messageSendby.appendChild(document.createTextNode("You"));
//         div.appendChild(messageSendby);

//         const messageBox = document.createElement("div");
//         const messageText = document.createElement("div");

//         messageBox.classList.add("d-flex", "justify-content-end", "mb-4");

//         messageText.classList.add("msg_cotainer_send");
//         messageText.appendChild(document.createTextNode(message.message));

//         messageBox.appendChild(messageText);
//         div.appendChild(messageBox);
//       } else {
//         const div = document.createElement("div");
//         chatBoxBody.appendChild(div);

//         const messageSendby = document.createElement("span");
//         messageSendby.classList.add(
//           "d-flex",
//           "justify-content-start",
//           "px-3",
//           "mb-1",
//           "text-uppercase",
//           "small",
//           "text-white"
//         );
//         messageSendby.appendChild(document.createTextNode(message.name));
//         div.appendChild(messageSendby);

//         const messageBox = document.createElement("div");
//         const messageText = document.createElement("div");

//         messageBox.classList.add("d-flex", "justify-content-start", "mb-4");

//         messageText.classList.add("msg_cotainer");
//         messageText.appendChild(document.createTextNode(message.message));

//         messageBox.appendChild(messageText);
//         div.appendChild(messageBox);
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

messageSendBtn.addEventListener("click", messageSend);
// document.addEventListener("DOMContentLoaded", getMessagesFromLocalStorage);
uiGroup.addEventListener("click", activeGroup);
document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("groupName", "");
  localStorage.setItem("chats", JSON.stringify([]));
});
