if (location.href.includes("http://localhost/webApplicationChat/chats/")) {
  const form = document.querySelector(".typing-area");
  const userTo = form.querySelector(".incoming_id").value;
  const inputField = form.querySelector(".input-field");
  const sendBtn = form.querySelector("button");
  const chatBox = document.querySelector(".chat-box");

  inputField.focus();
  inputField.addEventListener("keyup", () => {
    sendBtn.classList.toggle("active", inputField.value !== "");
  });

  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let formData = new FormData(form);
    formData.append('groupId', /* Add groupId here */);

    fetch("http://localhost/webApplicationChat/chats/ajaxInsertChat/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        inputField.value = "";
        scrollToBottom();
      })
      .catch((err) => console.error(err));
  });

  chatBox.addEventListener("mouseenter", () => {
    chatBox.classList.add("active");
  });
  chatBox.addEventListener("mouseleave", () => {
    chatBox.classList.remove("active");
  });

  setInterval(() => {
    const sendData = {
      userTo: userTo,
    };

    fetch("http://localhost/webApplicationChat/ajaxgetchat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.text();
      })
      .then((data) => {
        chatBox.innerHTML = data;
        if (!chatBox.classList.contains("active")) {
          scrollToBottom();
        }
      })
      .catch((err) => console.error(err));
  }, 500);

  function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
