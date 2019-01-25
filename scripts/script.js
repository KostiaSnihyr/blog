

//////________________________________________________________________

let inputAuthor = document.getElementById('author');
let inputPostText = document.getElementById('post-text');
let preview = document.getElementById('preview');
let btnSendPost = document.getElementById('send-post');

let newsFeed = document.getElementById('news-feed');

let date = new Date();
let currentDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
/////______________________________________________________________________





//////////////////___________________________________

function Post(author, date, paragraphText) {
    this.author = author;
    this.date = date;
    this.paragraphText = paragraphText;
    this.likes = 0;
    this.comments = 0;

    this.createPost = function() {
        let postWrapper = document.createElement('div');
            postWrapper.className = 'postWrapper';
        let a = document.createElement('a');
            a.innerText = author.value;
        let time = document.createElement('time');
            time.innerText = date;
        let img = document.createElement('img');
            img.src = preview.src;
            img.id = 'post-image';
        let p = document.createElement('p');
            p.innerText = paragraphText.value;
        let likesDiv = document.createElement('button');
            likesDiv.innerText = `Likes: ${this.likes}`;
        let counterComment = document.createElement('label');
            counterComment.className = 'qty-com';
            counterComment.innerText = `Comments (${this.comments})`;
        let writeCommentButton = document.createElement('button');
            writeCommentButton.innerText = 'Write Comment';
            writeCommentButton.className = 'create-comment';

            postWrapper.appendChild(a);
            postWrapper.appendChild(time);
            postWrapper.appendChild(img);
            postWrapper.appendChild(p);
            postWrapper.appendChild(likesDiv);
            postWrapper.appendChild(counterComment);
            postWrapper.appendChild(writeCommentButton);
            newsFeed.appendChild(postWrapper);

        likesDiv.addEventListener('click', () => {
            console.log(this);
            likesDiv.innerText = `Likes: ${++this.likes}`;
        });
    }   
}

function Comment(buttonnn) {
    this.buttonnn = buttonnn;

    this.createAuthorField = function() {
        let commentWrapper = document.createElement('div');
            commentWrapper.className = 'comment-wrapper';
        let commentInputAutor = document.createElement('input');
            commentInputAutor.value = 'Author';
        let commentInputText = document.createElement('textarea');
            commentInputText.value = 'Comment';
        let commentButton = document.createElement('button');
            commentButton.innerText = 'Send Post';


        commentWrapper.appendChild(commentInputAutor);
        commentWrapper.appendChild(commentInputText);
        commentWrapper.appendChild(commentButton);

        this.buttonnn.parentNode.appendChild(commentWrapper);
    }
}

function Form(wrapper, buttonText = 'Send Post', inputText = 'Comment', targetButton) {
    let formWrapper = document.createElement('div');
        formWrapper.className = 'comment-wrapper';
    let formInputAutor = document.createElement('input');
        formInputAutor.value = 'Author';
    let formInputText = document.createElement('textarea');
        formInputText.value = inputText;
    let formButton = document.createElement('button');
        formButton.innerText = buttonText;


    formWrapper.appendChild(formInputAutor);
    formWrapper.appendChild(formInputText);
    formWrapper.appendChild(formButton);

    wrapper.appendChild(formWrapper);

    formButton.onclick = function() {
        let wrapperReply = document.createElement('div');
            wrapperReply.className = 'last_reply';
        let authorReply = document.createElement('a');
            authorReply.href = '#';
            authorReply.innerText = formInputAutor.value;
        let textReply = document.createElement('p');
            textReply.innerText = formInputText.value;
        let buttonReply = document.createElement('button');
            buttonReply.className = 'reply-to-comment';
            buttonReply.innerText = 'reply to comment';

        wrapperReply.appendChild(authorReply);
        wrapperReply.appendChild(textReply);
        wrapperReply.appendChild(buttonReply);
        wrapper.appendChild(wrapperReply);

        targetButton.disabled = false;
        formWrapper.remove();
    };
}

function SendPost(sendBtn, input, textarea) {
    this.sendBtn = sendBtn;
    this.input = input;
    this.textarea = textarea;

    this.takeInfo = function() {
        console.log(input, textarea);
        this.wrapperForm = document.createElement('div');
        this.wrapperForm.className = 'post-wrapper';

        let sendPostA = document.createElement('a');
            sendPostA.href = '#';
            sendPostA.innerText = input.value;

        let sendPostP = document.createElement('p');
            sendPostP.innerText = textarea.value;
        
        let sendPostB = document.createElement('button');
            sendPostB.innerText = "reply to comment";
            sendPostB.className = 'reply-to-comment'

        this.wrapperForm.appendChild(sendPostA);
        this.wrapperForm.appendChild(sendPostP);
        this.wrapperForm.appendChild(sendPostB);

        // add to comment wrapper
        this.sendBtn.parentNode.appendChild(this.wrapperForm);
    }

    this.hideForm = function() {
        this.sendBtn.remove();
        this.input.remove();
        this.textarea.remove();
    }
}


btnSendPost.addEventListener('click', function(event) {
    event.preventDefault();
    
    let post = new Post(inputAuthor, currentDate, inputPostText);
    post.createPost();

    let writeComment = document.querySelectorAll('.create-comment');

    writeComment.forEach(function(event) {
        event.onclick = function(event) {
            let clickedButton = event.target;
            let comment = new Comment(clickedButton);
                comment.createAuthorField();
                clickedButton.disabled = true;

            let aaa = document.querySelectorAll('.comment-wrapper');

            aaa.forEach(function(e) {
                // console.log(e);
                let inputSendPost = e.querySelector('input');
                let textareaSendPost = e.querySelector('textarea');

                e.onclick = function(element) {
                    targ = element.target;
                    if(targ.tagName === 'BUTTON') {
                        if(targ.innerText === 'Send Post') {
                            console.log(targ.innerText);
                            // create comment
                            let sendPost = new SendPost(targ, inputSendPost, textareaSendPost);
                            sendPost.takeInfo();
                            sendPost.hideForm();
                            // update data of qty
                            let qtyCom = clickedButton.parentNode.querySelector('.qty-com');
                            let curQty = parseInt(qtyCom.innerText.substr(10));
                            qtyCom.innerText = 'Comments (' + (curQty + 1) + ')';
                        } else {
                            // create response
                            targ.disabled = true;
                            Form(targ.parentNode, 'reply', 'Text of reply', targ);
                        }

                        clickedButton.disabled = false;
                    }

                    // let replyToComBtn = document.querySelector('.reply-to-comment');
                    // console.log('replyToComBtn', replyToComBtn);
                    // replyToComBtn.addEventListener('click', function(ev) {
                    //     console.log('ev, ', ev);
                    // })
                }
            })
        }
    })

});


///////////////_________________________________________________________

function previewFile() {
    let preview = document.getElementById('preview');

    let inputSrc = document.getElementById('srcUpload');
    if(inputSrc.value.length > 5) {
        preview.src = inputSrc.value;
    } else {

        let file    = document.querySelector('input[type=file]').files[0];
        let reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
        }
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = "";
        }
    }
}
