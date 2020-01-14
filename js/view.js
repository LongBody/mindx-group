const view = {
    currentScreen: null
}

view.showComponents = async function(screenName) {
    view.currentScreen = screenName

    switch (screenName) {
        case 'register':
            {
                let app = document.getElementById('app')
                app.innerHTML = components.register

                let link = document.getElementById('register-link')
                link.onclick = linkClickHandler

                let form = document.getElementById('register-form')
                form.onsubmit = formSubmitHandler

                function linkClickHandler() {
                    view.showComponents('logIn')
                }

                function formSubmitHandler(e) {
                    e.preventDefault() // chan su kien form submit mac dinh

                    // get data
                    let registerInfo = {
                            firstname: form.firstname.value.trim(),
                            lastname: form.lastname.value.trim(),
                            email: form.email.value.trim().toLowerCase(),
                            password: form.password.value,
                            confirmPassword: form.confirmPassword.value
                        }
                        // validate data
                    let validateResult = [
                            view.validate('firstname-error', [registerInfo.firstname, 'Misssing firstname!']),
                            view.validate('lastname-error', [registerInfo.lastname, 'Missing lastname!']),
                            view.validate('email-error', [registerInfo.email, 'Missing email!']),
                            view.validate('password-error', [
                                registerInfo.password, 'Missing password!',
                                registerInfo.password.length >= 6, 'Password length must greater than or equals 6'
                            ]),
                            view.validate('confirm-password-error', [
                                registerInfo.confirmPassword, 'Missing confirm password!',
                                registerInfo.confirmPassword == registerInfo.password, 'Password and confirm password not match!'
                            ])
                        ]
                        // submit data
                    if (view.allPassed(validateResult)) {
                        controller.register(registerInfo)
                    }
                }
                break
            }
        case 'logIn':
            {
                let app = document.getElementById('app')
                app.innerHTML = components.logIn

                let link = document.getElementById('log-in-link')
                link.onclick = linkClickHandler

                let form = document.getElementById('log-in-form')
                form.onsubmit = formSubmitHandler

                function linkClickHandler() {
                    view.showComponents('register')
                }

                function formSubmitHandler(e) {
                    e.preventDefault()
                    let logInInfo = {
                        email: form.email.value,
                        password: form.password.value
                    }

                    let validateResult = [
                        view.validate('email-error', [logInInfo.email, 'Missing email!']),
                        view.validate('password-error', [
                            logInInfo.password, 'Missing password!',
                            logInInfo.password.length >= 6, 'Password length must greater than or equals 6!'
                        ])
                    ]

                    if (view.allPassed(validateResult)) {
                        controller.logIn(logInInfo)
                    }
                }
                // forget password by firebase
                let forgetPassword = document.getElementById("forget-password");
                forgetPassword.onclick = forgetPasswordHandler

                function forgetPasswordHandler() {
                    view.showComponents('forgetPassword');
                }

                break
            }
        case 'chat':
            {
                let app = document.getElementById('app')
                app.innerHTML = components.chat

                let formAddMessage = document.getElementById('form-add-message')
                formAddMessage.onsubmit = formAddMessageSubmit

                let formAddConversation = document.getElementById('form-add-conversation');
                formAddConversation.onsubmit = formAddConversationSubmit


                controller.setupDatabaseChange()
                await controller.loadConversations() // load all conversations and save to model
                view.showCurrentConversation() // read data from model and display to screen

                view.showListConversation()

                async function formAddMessageSubmit(e) {
                    e.preventDefault()

                    let content = formAddMessage.message.value.trim()
                    if (model.currentConversation && content) {

                        view.disable('form-add-message-btn')
                        let message = {
                            content: content,
                            owner: firebase.auth().currentUser.email,
                            createAt: new Date().toISOString()
                        }
                        await controller.updateNewMessage(model.currentConversation.id, message)
                        formAddMessage.message.value = ''
                        view.enable('form-add-message-btn')


                    }
                }
                async function formAddConversationSubmit(e) {
                    e.preventDefault();
                    view.disable('form-add-conversation-btn')
                    let title = formAddConversation.title.value;
                    let friendEmail = formAddConversation.friendEmail.value.trim().toLowerCase();
                    let currentEmail = firebase.auth().currentUser.email;
                    let friendEmailExists = await controller.validateEmailExists(friendEmail)

                    let validateResult = [
                        view.validate('title-error', [
                            title, 'Missing tittle'
                        ]),

                        view.validate('friend-email-error', [
                            friendEmail, 'Missing friendEmail',
                            friendEmailExists, 'Friend email do not exists',
                            friendEmail != currentEmail, `Please enter an other person's email `
                        ])

                    ]
                    if (view.allPassed(validateResult)) {
                        let conversation = {
                            users: [currentEmail, friendEmail],
                            messages: [],
                            title: title,
                            createAt: new Date().toISOString()
                        }
                        console.log(conversation)
                        await controller.addConversation(conversation)
                        console.log('added new conversation')
                        formAddConversation.title.value = ""
                        formAddConversation.friendEmail.value = ""
                    }
                    view.enable('form-add-conversation-btn')



                }

                document.getElementById('sign-out-btn').addEventListener('click', function() {
                    firebase.auth().signOut()
                })

                document.getElementById('showImage').addEventListener('click', function() {
                    view.showComponents('showImage')


                })
                document.getElementById('laugh-show').addEventListener('click', function() {
                    // listMessage.innerHTML += ` <span class="thumb-up-show"><i class="fas fa-thumbs-up"></i></span>`
                    let message = {
                        content: '<i class = "fas fa-thumbs-up"></i>',
                        owner: firebase.auth().currentUser.email,
                        createAt: new Date().toISOString()
                    }
                    controller.updateNewMessage(model.currentConversation.id, message);
                })


                break;
            }
        case 'loading':
            {
                let app = document.getElementById('app')
                app.innerHTML = components.loading

                break
            }
        case 'showImage':
            {
                let Email = firebase.auth().currentUser.email;
                let app = document.getElementById('app')
                app.innerHTML = `<div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>Hồ Sơ Cá Nhân</h1>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div class="col-lg-5">
                        <div class="card">
                            <div class="form-group">      
                                <img id="blah" alt="your image" />
                                <input type='file' onchange="readURL(this)" />
                               
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h6>Email:${Email}</h6>
                        <h6>Name:</h6>
                    </div>
                </div>
                </div>`







            }
        case 'forgetPassword':
            {
                let app = document.getElementById('app')
                app.innerHTML = components.forgetPassword;

                let form = document.getElementById('forget-password-form')
                form.onsubmit = forgetPasswordHandlerSubmit


                async function forgetPasswordHandlerSubmit(e) {
                    e.preventDefault()

                    view.setText('forget-password-success', '')
                    view.setText('forget-password-error', '')
                    await firebase.auth().sendPasswordResetEmail(
                            form.forgetPassword.value)
                        .then(function() {
                            view.setText('forget-password-success', 'Check email to change your password')
                        })
                        .catch(function(err) {
                            // Error occurred. Inspect error.code.
                            view.setText('forget-password-error', 'Your Email not existed or maybe deleted')
                        });
                }


            }
    }
}

view.showCurrentConversation = function(id) {
    if (model.currentConversation) {
        let messages = model.currentConversation.messages

        let listMessage = document.getElementById('list-message')
        listMessage.innerHTML = ''
        let conversations = model.conversations
        console.log(conversations)
        for (let message of messages) {

            let content = message.content
            let owner = message.owner
            let createAt = message.createAt
            let currentEmail = firebase.auth().currentUser.email
            let className = ''
            if (owner == currentEmail) {
                className = 'message your'
            } else {
                className = 'message other'
            } { /* <i class="fas fa-user-circle" id="iconUser"></i> */ }

            let html = `
    <div class="${className} show-message" >
    <div class="show-info"><img  id="myImage" class="myImage" src="https://greenpathcr.com/wp-content/uploads/2019/09/user_circle_1048392.png">
    <div class="none"> <div >${owner}</div>
    <div >${createAt}</div></div></div>
       <span>${content}</span>     
     </div>
  `


            listMessage.innerHTML += html

        }

        // document.getElementById('laugh-show').addEventListener('click', function() {
        //     // listMessage.innerHTML += ` <span class="thumb-up-show"><i class="fas fa-thumbs-up"></i></span>`
        //     let message = {
        //         content: '<i class = "fas fa-thumbs-up"></i>',
        //         owner: firebase.auth().currentUser.email,
        //         createAt: new Date().toISOString()
        //     }
        //     controller.updateNewMessage(model.currentConversation.id, message);
        // })

        listMessage.scrollTop = listMessage.scrollHeight
    }

}
view.showListConversation = function() {
    let listConversation = document.getElementById('list-conversation')
    listConversation.innerHTML = ""
    if (model.conversations && model.conversations.length) {
        // show array model.conversation
        let conversations = model.conversations
        console.log(conversations)
        for (let conversation of conversations) {



            let { id: conversationId, title, users } = conversation
            let user = users.length;

            // let member = '';
            // if (user > 1) {
            //     member = user + ' members';
            // } else {
            //     member = user + ' member';
            // }

            let member = user > 1 ? (user + 'members') : (user + 'member')


            // if (model.currentConversation && model.currentConversation.id == conversation.id) {
            //     className = 'conversation current';
            // } else {
            //     className = 'conversation'
            // }

            let className = (model.currentConversation && model.currentConversation.id == conversation.id) ?
                'conversation current' : 'conversation'
            let html = `
           <div class="card shadow p-3 mb-3  ${className}">
           <div id="${conversationId}"  id="listConversationToChange">
           <div class="conversation-title ">${title}</div>
           <div class="conversation-member ">${member}</div>
       </div></div>
          `
            listConversation.innerHTML += html
        }

        for (let conversation of conversations) {
            let conversationId = conversation.id
            let conversationCard = document.getElementById(conversationId)
            conversationCard.onclick = function() {
                model.saveCurrentConversation(conversation)
                view.showListConversation()
                view.showCurrentConversation()
            }
        }

    }
}

view.setText = function(id, text) {
    document.getElementById(id).innerText = text
}

view.allPassed = function(validateResult) {
        for (let result of validateResult) {
            if (!result) {
                return false
            }
        }
        return true
    }
    /**
     * [
     *  condition1, 'message1',
     *  condition2, 'message2',
     *  ...
     * ]
     * 
     */
view.validate = function(idErrorTag, validateInfos) {
    for (let i = 0; i < validateInfos.length; i += 2) {
        let condition = validateInfos[i]
        let message = validateInfos[i + 1]
        if (!condition) {
            view.setText(idErrorTag, message)
            return false
        }
    }
    view.setText(idErrorTag, '')
    return true
}

view.disable = function(id) {
    document.getElementById(id).setAttribute('disabled', true)
}

view.enable = function(id) {
    document.getElementById(id).removeAttribute('disabled')
}

function readURL(input) {
    // var storage = firebase.app().storage("https://console.firebase.google.com/u/0/project/ci37-32415/storage/ci37-32415.appspot.com/files");

    // var storageRef = firebase.storage().ref();
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#blah')
                .show()
                .attr('src', e.target.result)
                .css({
                    'border-radius': '50%',
                    'width': '50%',
                    'height': '200px'
                })

        };
        // reader.readAsDataURL(input.files[0]);
        console.log(input.files[0].name)
        var storageRef = firebase.storage().ref();

        var uploadTask = firebase.storage().ref('images/' + input.files[0].name).put(input.files[0]);

        // uploadTask.on('state_changed', (snapshot) => {

        // })


        var pathReference = storage.ref('Images/' + input.files[0].name);
        // storage.ref('image').child(input.files[0].name).getDownloadURL().then(url => {
        //     console.log(url)
        // })
        storageRef.child('images/' + input.files[0].name).getDownloadURL().then(async function(url) {
            console.log(url)
            await $(".your [id=myImage]").show().attr('src', url)

        })
        view.showComponents('chat')







    }
}

// > 0
// % 2 == 0
// view.validateNumber = function(number) {
//   if(number <= 0) {
//     throw new Error('Number must greater than 0!')
//   }
//   if(number % 2 != 0) {
//     throw new Error('Number must be even!')
//   }
//   return true
// }

// let number = 0

// try {
//   view.validateNumber(number)
//   console.log('right number!')
// } catch(err) {
//   console.error(err.message)
// }