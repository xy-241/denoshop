const socket = io.connect("https://denoshopvideoserver.herokuapp.com/",
	{reconnect: true}
);


let options = {
  timeZone: 'Singapore',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
},
formatter = new Intl.DateTimeFormat(('en-GB'), options);

const chatForm = document.getElementById('chatForm')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const phoneInput = document.getElementById('phone')
const departmentInput = document.getElementById('department')
const descInput = document.getElementById('desc')
const urgentInput = document.getElementById('urgent')

if (chatForm) {
  chatForm.addEventListener('submit',e => {
    console.log("ALRITE BRO")
    e.preventDefault()
    const name = nameInput.value
    const email = emailInput.value
    const phone = phoneInput.value
    const department = departmentInput.value
    const desc = descInput.value
    const urgent = urgentInput.checked
    const dateTime = formatter.format(new Date())
    socket.emit('new-room',userID,name,email,phone,department,desc,urgent,dateTime)
    
    // socket.emit('send-chat-message', roomName ,message)
    socket.on('redirectRoom', roomID=> {
      window.location.href = `http://www.localhost:3000/chat/videoRoom/${roomID}`;
    })
  })
} else {
  socket.emit('new-client' , roomName , username)
  let isAlreadyCalling = false;
  let getCalled = false;

  const existingCalls = [];

  const { RTCPeerConnection, RTCSessionDescription } = window;

  const peerConnection = new RTCPeerConnection();

  // function unselectUsersFromList() {
  //   const alreadySelectedUser = document.querySelectorAll(
  //     ".active-user.active-user--selected"
  //   );

  //   alreadySelectedUser.forEach(el => {
  //     el.setAttribute("class", "active-user");
  //   });
  // }

  // function createUserItemContainer(socketId) {
  //   const userContainerEl = document.createElement("div");

  //   const usernameEl = document.createElement("p");

  //   userContainerEl.setAttribute("class", "active-user");
  //   userContainerEl.setAttribute("id", socketId);
  //   usernameEl.setAttribute("class", "username");
  //   usernameEl.innerHTML = `Socket: ${socketId}`;

  //   userContainerEl.appendChild(usernameEl);

  //   userContainerEl.addEventListener("click", () => {
  //     unselectUsersFromList();
  //     userContainerEl.setAttribute("class", "active-user active-user--selected");
  //     const talkingWithInfo = document.getElementById("talking-with-info");
  //     talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
  //     callUser(socketId);
  //   });

  //   return userContainerEl;
  // }

  async function callUser(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    console.log('it works')
    socket.emit("call-user", {
      offer,
      to: socketId
    });
  }

  socket.on("call-made", async data => {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    socket.emit("make-answer", {
      answer,
      to: data.socket
    });
  });


  socket.on("answer-made", async data => {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );

    if (!isAlreadyCalling) {
      callUser(data.socket);
      isAlreadyCalling = true;
    }
  });
  // function updateUserList(socketIds) {
  //   const activeUserContainer = document.getElementById("active-user-container");

  //   socketIds.forEach(socketId => {
  //     const alreadyExistingUser = document.getElementById(socketId);
  //     if (!alreadyExistingUser) {
  //       const userContainerEl = createUserItemContainer(socketId);

  //       activeUserContainer.appendChild(userContainerEl);
  //     }
  //   });
  // }

  // socket.on("update-user-list", ({ users }) => {
  //   updateUserList(users);
  // });

  // socket.on("remove-user", ({ socketId }) => {
  //   const elToRemove = document.getElementById(socketId);

  //   if (elToRemove) {
  //     elToRemove.remove();
  //   }
  // });

  // socket.on("call-made", async data => {
  //   if (getCalled) {
  //     const confirmed = confirm(
  //       `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
  //     );

  //     if (!confirmed) {
  //       socket.emit("reject-call", {
  //         from: data.socket
  //       });

  //       return;
  //     }
  //   }

  //   await peerConnection.setRemoteDescription(
  //     new RTCSessionDescription(data.offer)
  //   );
  //   const answer = await peerConnection.createAnswer();
  //   await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  //   socket.emit("make-answer", {
  //     answer,
  //     to: data.socket
  //   });
  //   getCalled = true;
  // });

  // socket.on("answer-made", async data => {
  //   await peerConnection.setRemoteDescription(
  //     new RTCSessionDescription(data.answer)
  //   );

  //   if (!isAlreadyCalling) {
  //     callUser(data.socket);
  //     isAlreadyCalling = true;
  //   }
  // });

  // socket.on("call-rejected", data => {
  //   alert(`User: "Socket: ${data.socket}" rejected your call.`);
  //   unselectUsersFromList();
  // });

  peerConnection.ontrack = function({ streams: [stream] }) {
    const remoteVideo = document.getElementById("remote-video");
    if (remoteVideo) {
      remoteVideo.srcObject = stream;
    }
  };

  navigator.getUserMedia(
    { video: true, audio: true },
    stream => {
      const localVideo = document.getElementById("local-video");
      if (localVideo) {
        localVideo.srcObject = stream;
      }

      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    },
    error => {
      console.warn(error.message);
    }
  );

  socket.on('Error', function() {
    window.location.href = `http://www.localhost:3000/chat/error`;
  });

  socket.on('ended' , function(){
    window.location.href = 'http://www.localhost:3000/chat/ended'
  })

  socket.on('staffName', name => {
    const message = document.getElementById('messageo')
    message.innerText = `You are now connected to staff, ${name}`
  })

  socket.on('connecteded', id => {
    console.log('ok')
    callUser(id)
  })
}