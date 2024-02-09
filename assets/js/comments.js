const data = {
    "currentUser": {
      "image": { 
        "png": "assets/images/avatars/image-juliusomo.png",
        "webp": "assets/images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "assets/images/avatars/image-amyrobson.png",
            "webp": "assets/images/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "assets/images/avatars/image-maxblagun.png",
            "webp": "assets/images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "assets/images/avatars/image-ramsesmiron.png",
                "webp": "assets/images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "assets/images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]
};

let currentUserComments = JSON.parse(localStorage.getItem('currentUserEntries')) || [];

function saveCurrentUserCommentToLocalStorage(){
    return localStorage.setItem('currentUserEntries',JSON.stringify(currentUserComments));
}

const commentsContainer = document.querySelector('.comments');

function createCommentItem(id, content, createdAt, score, username , userImage) {
  return `<div class="comment" data-commentid="${id}">
            <div class="comment-rating">
                <a href="#" class="comment-rating-up" data-commentid="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M6.33018 10.896C6.46674 10.896 6.58468 10.8463 6.684 10.747C6.78331 10.6477 6.83297 10.5298 6.83297 10.3932V7.004H10.1477C10.2842 7.004 10.4022 6.95434 10.5015 6.85503C10.6008 6.75571 10.6505 6.63777 10.6505 6.50121V5.27216C10.6505 5.1356 10.6008 5.01766 10.5015 4.91834C10.4022 4.81903 10.2842 4.76937 10.1477 4.76937H6.83297V1.39879C6.83297 1.26223 6.78331 1.14429 6.684 1.04497C6.58468 0.945655 6.46674 0.895996 6.33018 0.895996H4.91491C4.77835 0.895996 4.66041 0.945655 4.56109 1.04497C4.46177 1.14429 4.41212 1.26223 4.41212 1.39879V4.76937H1.07878C0.942221 4.76937 0.824282 4.81903 0.724965 4.91834C0.625647 5.01766 0.575989 5.1356 0.575989 5.27216V6.50121C0.575989 6.63777 0.625647 6.75571 0.724965 6.85503C0.824282 6.95434 0.942221 7.004 1.07878 7.004H4.41212V10.3932C4.41212 10.5298 4.46177 10.6477 4.56109 10.747C4.66041 10.8463 4.77835 10.896 4.91491 10.896H6.33018Z" fill="#C5C6EF"/>
                    </svg>
                </a>
                <strong>${score}</strong>
                <a href="#" class="comment-rating-down" data-commentid="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="3" viewBox="0 0 10 3" fill="none">
                        <path d="M9.25591 2.66C9.46018 2.66 9.63659 2.60445 9.78515 2.49334C9.93371 2.38223 10.008 2.25028 10.008 2.0975V0.722504C10.008 0.569726 9.93371 0.437781 9.78515 0.32667C9.63659 0.215559 9.46018 0.160004 9.25591 0.160004H0.760085C0.555814 0.160004 0.379398 0.215559 0.230837 0.32667C0.082276 0.437781 0.00799561 0.569726 0.00799561 0.722504V2.0975C0.00799561 2.25028 0.082276 2.38223 0.230837 2.49334C0.379398 2.60445 0.555814 2.66 0.760085 2.66H9.25591Z" fill="#C5C6EF"/>
                    </svg>
                </a>
            </div>
            <div class="comment-body">
                <div class="comment-header">
                    <div class="profile-info">
                        <img src="${userImage}">
                        <strong>${username}</strong>
                        ${username == data.currentUser.username ? `<span class = "current-user">you</span>` : ""}
                        <span>${createdAt}</span>
                    </div>
                    ${username == data.currentUser.username ? 
                      `
                      <div class="user-btn-container">
                        <a href="#" class="delete-btn user-btn" data-commentid="${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64458 1.16667H11.5261V2.33333H0V1.16667H2.88153L3.84633 0H7.67981L8.64458 1.16667ZM2.68944 14C1.8441 14 1.15261 13.3017 1.15261 12.4479V3.5H10.3735V12.4479C10.3735 13.3017 9.682 14 8.8367 14H2.68944Z" fill="#ED6368"/>
                          </svg>
                          Delete
                        </a>
                        <a href="#" class="edit-btn user-btn" data-commentid="${id}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0813 0.474468L13.4788 2.87199C14.1491 3.51055 14.1765 4.57097 13.5401 5.24327L5.66499 13.1184C5.37977 13.4012 5.00593 13.5773 4.60623 13.6171L0.957442 13.9496H0.878691C0.646111 13.951 0.422565 13.8596 0.257434 13.6959C0.0728398 13.5119 -0.0201832 13.2553 0.00368177 12.9959L0.379936 9.34706C0.419753 8.94736 0.595858 8.57352 0.878691 8.2883L8.75377 0.413217C9.43263 -0.160306 10.4336 -0.133966 11.0813 0.474468ZM8.15877 3.4495L10.5038 5.79452L12.2538 4.08826L9.86504 1.69948L8.15877 3.4495Z" fill="#5357B6"/>
                          </svg>
                          Edit
                        </a>
                      </div>
                      ` 
                      : 
                      `<a href="#" class="reply-btn" data-commentid="${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                            <path d="M0.227189 4.31583L5.0398 0.159982C5.46106 -0.203822 6.125 0.0915222 6.125 0.656646V2.8456C10.5172 2.89589 14 3.77618 14 7.93861C14 9.61864 12.9177 11.283 11.7214 12.1532C11.348 12.4247 10.816 12.0839 10.9536 11.6437C12.1935 7.67857 10.3655 6.62588 6.125 6.56484V8.96878C6.125 9.5348 5.46056 9.82883 5.0398 9.46545L0.227189 5.30918C-0.0755195 5.04772 -0.0759395 4.57766 0.227189 4.31583Z" fill="#5357B6"/>
                        </svg> Cevap Yaz
                      </a>`
                    }
                </div>
                <div class="content-container">
                  <p class="content" data-commentid="${id}">${content}</p>
                </div>
            </div>
          </div>`;

}

function createReplyItem(id, content, createdAt, score, username , userImage) {
  return `<div class="new-reply-comment">
            <div class="stick"></div>
            <div class="comment" data-commentid="${id}">
                <div class="comment-rating">
                    <a href="#" class="comment-rating-up" data-commentid="${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M6.33018 10.896C6.46674 10.896 6.58468 10.8463 6.684 10.747C6.78331 10.6477 6.83297 10.5298 6.83297 10.3932V7.004H10.1477C10.2842 7.004 10.4022 6.95434 10.5015 6.85503C10.6008 6.75571 10.6505 6.63777 10.6505 6.50121V5.27216C10.6505 5.1356 10.6008 5.01766 10.5015 4.91834C10.4022 4.81903 10.2842 4.76937 10.1477 4.76937H6.83297V1.39879C6.83297 1.26223 6.78331 1.14429 6.684 1.04497C6.58468 0.945655 6.46674 0.895996 6.33018 0.895996H4.91491C4.77835 0.895996 4.66041 0.945655 4.56109 1.04497C4.46177 1.14429 4.41212 1.26223 4.41212 1.39879V4.76937H1.07878C0.942221 4.76937 0.824282 4.81903 0.724965 4.91834C0.625647 5.01766 0.575989 5.1356 0.575989 5.27216V6.50121C0.575989 6.63777 0.625647 6.75571 0.724965 6.85503C0.824282 6.95434 0.942221 7.004 1.07878 7.004H4.41212V10.3932C4.41212 10.5298 4.46177 10.6477 4.56109 10.747C4.66041 10.8463 4.77835 10.896 4.91491 10.896H6.33018Z" fill="#C5C6EF"/>
                        </svg>
                    </a>
                    <strong>${score}</strong>
                    <a href="#" class="comment-rating-down" data-commentid="${id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="3" viewBox="0 0 10 3" fill="none">
                            <path d="M9.25591 2.66C9.46018 2.66 9.63659 2.60445 9.78515 2.49334C9.93371 2.38223 10.008 2.25028 10.008 2.0975V0.722504C10.008 0.569726 9.93371 0.437781 9.78515 0.32667C9.63659 0.215559 9.46018 0.160004 9.25591 0.160004H0.760085C0.555814 0.160004 0.379398 0.215559 0.230837 0.32667C0.082276 0.437781 0.00799561 0.569726 0.00799561 0.722504V2.0975C0.00799561 2.25028 0.082276 2.38223 0.230837 2.49334C0.379398 2.60445 0.555814 2.66 0.760085 2.66H9.25591Z" fill="#C5C6EF"/>
                        </svg>
                    </a>
                </div>
                <div class="comment-body">
                    <div class="comment-header">
                        <div class="profile-info">
                            <img src="${userImage}">
                            <strong>${username}</strong>
                            ${username == data.currentUser.username ? `<span class = "current-user">you</span>` : ""}
                            <span>${createdAt}</span>
                        </div>
                        ${username == data.currentUser.username ? 
                          `
                          <div class="user-btn-container">
                            <a href="#" class="delete-btn user-btn" data-commentid="${id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.64458 1.16667H11.5261V2.33333H0V1.16667H2.88153L3.84633 0H7.67981L8.64458 1.16667ZM2.68944 14C1.8441 14 1.15261 13.3017 1.15261 12.4479V3.5H10.3735V12.4479C10.3735 13.3017 9.682 14 8.8367 14H2.68944Z" fill="#ED6368"/>
                              </svg>
                              Delete
                            </a>
                            <a href="#" class="edit-btn user-btn" data-commentid="${id}">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0813 0.474468L13.4788 2.87199C14.1491 3.51055 14.1765 4.57097 13.5401 5.24327L5.66499 13.1184C5.37977 13.4012 5.00593 13.5773 4.60623 13.6171L0.957442 13.9496H0.878691C0.646111 13.951 0.422565 13.8596 0.257434 13.6959C0.0728398 13.5119 -0.0201832 13.2553 0.00368177 12.9959L0.379936 9.34706C0.419753 8.94736 0.595858 8.57352 0.878691 8.2883L8.75377 0.413217C9.43263 -0.160306 10.4336 -0.133966 11.0813 0.474468ZM8.15877 3.4495L10.5038 5.79452L12.2538 4.08826L9.86504 1.69948L8.15877 3.4495Z" fill="#5357B6"/>
                              </svg>
                              Edit
                            </a>
                          </div>
                          ` 
                          : 
                          `<a href="#" class="reply-btn" data-commentid="${id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                                <path d="M0.227189 4.31583L5.0398 0.159982C5.46106 -0.203822 6.125 0.0915222 6.125 0.656646V2.8456C10.5172 2.89589 14 3.77618 14 7.93861C14 9.61864 12.9177 11.283 11.7214 12.1532C11.348 12.4247 10.816 12.0839 10.9536 11.6437C12.1935 7.67857 10.3655 6.62588 6.125 6.56484V8.96878C6.125 9.5348 5.46056 9.82883 5.0398 9.46545L0.227189 5.30918C-0.0755195 5.04772 -0.0759395 4.57766 0.227189 4.31583Z" fill="#5357B6"/>
                            </svg> Cevap Yaz
                          </a>`
                        }
                    </div>
                    <div class="content-container">
                      <p class="content" data-commentid="${id}">${content}</p>
                    </div>
                </div>
              </div>
          </div>`;

}

// DESTRUCTING 

// function createCommentItem(comment){
//   const {id,content,createdAt,score,user} = comment; 
//   console.log(id);
//   console.log(content);
//   console.log(createdAt);
//   console.log(score);
//   console.log(user.username);
// }

// DESTRUCTING END

function renderComments() {
  commentsContainer.innerHTML = '';

  // Commentler
  for (const comment of data.comments) {
    let commentHTML = createCommentItem(comment.id, comment.content, comment.createdAt, comment.score, comment.user.username,comment.user.image.png);
    commentsContainer.innerHTML += commentHTML;
  }

  // LocalStorage'ta tutulan commentler
  for(const comment of currentUserComments){
    if(comment.replyingTo == null){
      commentsContainer.innerHTML += createCommentItem(comment.id, comment.content, comment.createdAt, comment.score, comment.user.username,comment.user.image.png);
    }
  }

  // Current User'ın verdiği cevaplar
  for(const reply of currentUserComments){
    for (const comment of data.comments) {
      if(reply.replyingTo == comment.user.username){
        const replyContent = reply.content;
        const boldContent = replyContent.replace(/(@\w+)/g, '<b>$1</b>');
        const entries = document.querySelectorAll('.comment');
        for (const entry of entries) {
          if(entry.dataset.commentid == comment.id){
            const createReply = createReplyItem(reply.id, boldContent, reply.createdAt, reply.score, reply.user.username,reply.user.image.png);
            entry.insertAdjacentHTML('afterend', createReply);
          }
        }
      }
    }
  }


  // Data'da yer alan cevaplar
  for (const comment of data.comments) {
    if(comment.replies.length > 0){
      console.log(comment.replies)
      for (const reply of comment.replies) {
        if(reply.replyingTo == comment.user.username){
          const replyContent = reply.content;
          const entries = document.querySelectorAll('.comment');
          for (const entry of entries) {
            if(entry.dataset.commentid == comment.id){
              const createReply = createReplyItem(reply.id, replyContent, reply.createdAt, reply.score, reply.user.username,reply.user.image.png);
              entry.insertAdjacentHTML('afterend', createReply);
            }
          }
        }
      }
    }
  }

  bindEvents();
}

function searchCommentById(id) {
  let searchedComment = null;
  for(const comment of currentUserComments) {
      if(comment.id === id) {
          searchedComment = comment;
          break;
      }
  }
  for (const comment of data.comments) {
    if(comment.id === id){
      searchedComment = comment;
      break;
    }
  }

  return searchedComment;
}

function rateCommentUp(e) {
  e.preventDefault();
  const commentId = Number(this.dataset.commentid);
  const comment = searchCommentById(commentId);
  comment.score++;
  saveCurrentUserCommentToLocalStorage();
  renderComments();
}

function rateCommentDown(e) {
  e.preventDefault();
  const commentId = Number(this.dataset.commentid);
  const comment = searchCommentById(commentId);
  comment.score--;
  saveCurrentUserCommentToLocalStorage();
  renderComments();
}

function handleNewCommentForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    // document.querySelector('textarea[name="content"]').value
    formObj.id = createUniqueId()
    formObj.createdAt = "Now";
    formObj.score = 0;
    formObj.replies = [];
    formObj.user = data.currentUser;

    currentUserComments.push(formObj);
    saveCurrentUserCommentToLocalStorage();

    renderComments();

    // tum form elemanlarinin icini temizler
    e.target.reset();

}

function createUniqueId(){
  let id = data.comments.length + 1;
  for (const comment of currentUserComments) {
    if(comment.id === id){
      id+=1;
    }
  }
  return id
}


let toDeleteComment = null
const dialog = document.querySelector('.dialog');
function deleteComment(e){
  e.preventDefault();
  const commentId = parseInt(this.dataset.commentid);
  const comment = searchCommentById(commentId);
  toDeleteComment = comment;
  dialog.showModal();
  bindEvents();
}

function deleteCommentFunc(e){
  e.preventDefault();
  const commentIndex = currentUserComments.indexOf(toDeleteComment);
  console.log(commentIndex);
  if(e.target.id == "yes"){
    currentUserComments.splice(commentIndex,1);
    saveCurrentUserCommentToLocalStorage();
    renderComments();
  }
  dialog.close();
}

function editComment(e){
  e.preventDefault();
  const commentId = parseInt(this.dataset.commentid);
  const comment = searchCommentById(commentId);
  const contents = document.querySelectorAll('.content');
  for (const content of contents) {
    if(content.dataset.commentid == comment.id){
     content.parentElement.innerHTML = 
     `
      <form class="edit-form" data-commentid="${commentId}">
        <textarea required name="content" rows="3">${comment.content}</textarea>
        <button class="save-btn">Kaydet</button>
      </form>
     `
     document.querySelector('.edit-form textarea').focus();
    }
  }
  const editedForm = document.querySelector('.edit-form');
  editedForm.addEventListener('submit',saveEditedForm);
}

function saveEditedForm(e){
  e.preventDefault();
  const commentId = parseInt(this.dataset.commentid);
  const currentUserComments = searchCommentById(commentId);
  currentUserComments.content = e.target.content.value;
  saveCurrentUserCommentToLocalStorage();
  renderComments();
}

let replyId = null
function handleReplyComment(e){
  e.preventDefault();
  replyId = parseInt(this.dataset.commentid);
  const newForm = `
  <div class="new-reply-comment">
    <div class="stick"></div>
    <div class="new-comment reply-form">
      <img src="assets/images/avatars/image-juliusomo.png" alt="">
      <form>
          <textarea required name="content" rows="3"></textarea>
          <button>Ekle</button>
      </form>
    </div>
  </div>
  `;
  const targetElement = e.target.parentElement.parentElement.parentElement;
  targetElement.insertAdjacentHTML('afterend', newForm);

  const textArea = document.querySelector('textarea[name="content"]');
  textArea.value = `@${e.target.parentElement.firstElementChild.firstElementChild.nextElementSibling.textContent} `;
  textArea.focus();

  document.querySelector('.reply-form form').addEventListener('submit',saveReply);
}

function saveReply(e){
  e.preventDefault();
  const formData = new FormData(e.target);
  const formObj = Object.fromEntries(formData);

  formObj.id = createUniqueId()
  formObj.createdAt = "Now";
  formObj.score = 0;
  formObj.replyingTo = searchCommentById(replyId).user.username;
  formObj.user = data.currentUser;

  currentUserComments.push(formObj);
  saveCurrentUserCommentToLocalStorage();
  renderComments();
}

function bindEvents() {
  const newCommentForm = document.querySelector('.new-comment form');
  const ratingUpBtns = document.querySelectorAll('.comment-rating-up');
  const ratingDownBtns = document.querySelectorAll('.comment-rating-down');
  const deleteBtns = document.querySelectorAll('.delete-btn');
  const editBtns = document.querySelectorAll('.edit-btn');
  const replyBtns = document.querySelectorAll('.reply-btn');
  const dialogBtns = document.querySelectorAll('.dialog-btn')

  for(const btn of ratingUpBtns) {
    btn.addEventListener('click', rateCommentUp);
  }

  for(const btn of ratingDownBtns) {
    btn.addEventListener('click', rateCommentDown);
  }

  newCommentForm.addEventListener('submit', handleNewCommentForm);

  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', deleteComment);
  }

  for (const editBtn of editBtns) {
    editBtn.addEventListener('click',editComment)
  }
  
  for (const btn of dialogBtns) {
    btn.addEventListener('click',deleteCommentFunc)
  }

  for (const btn of replyBtns) {
    btn.addEventListener('click',handleReplyComment)
  }
}

function init() {
  renderComments();
    
}

init();