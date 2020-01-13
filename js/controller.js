const controller = {}

controller.register = async function(registerInfo) {
    let email = registerInfo.email
    let password = registerInfo.password
    let displayName = registerInfo.lastname + " " + registerInfo.firstname
    view.setText('register-success', '')
    view.setText('register-error', '')
    view.disable('register-btn')

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText('register-success', 'An verification email has been sended to your email address!')
    } catch (err) {
        view.setText('register-error', err.message)
    }

    view.enable('register-btn')
}

controller.logIn = async function(logInInfo) {
    let email = logInInfo.email
    let password = logInInfo.password

    try {
        let result = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (!result.user || !result.user.emailVerified) {
            throw new Error('User must verify email!')
        }
        view.showComponents('chat')
    } catch (err) {
        view.setText('log-in-error', err.message)
    }
}

controller.setupDatabaseChange = function() {
    let currentEmail = firebase.auth().currentUser.email
    let isFirstRun = true

    firebase.firestore().collection('conversations').where('users', 'array-contains', currentEmail).onSnapshot(function(snapshot) {
        if (isFirstRun) {
            isFirstRun = false
            return
        }
        let docChanges = snapshot.docChanges()
        for (docChange of docChanges) {
            if (docChange.type == "modified") {
                let conversationChange = transformDoc(docChange.doc)
                    // console.log('new', conversationChange)
                    // console.log('old', model.currentConversation)
                    // update model.conversation
                    //update model.current-conversation
                model.updateConversation(conversationChange)
                view.showCurrentConversation()

            }
            if (docChanges.type == 'added') {
                let conversationChange = transformDoc(docChange.doc)
                model.updateConversation(conversationChange)
                view.showListConversation()
            }
        }

    })
}

controller.updateNewMessage = function(conversationId, message) {
    return firebase.firestore().collection('conversations').doc(conversationId).update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    })
}


controller.addConversation = function(conversation) {
    return firebase
        .firestore()
        .collection('conversations')
        .add(conversation)
}

controller.validateEmailExists = async function(email) {
    try {
        let signInMethod = await firebase.auth().fetchSignInMethodsForEmail(email)
        return signInMethod.length > 0
    } catch (error) {
        return false
    }

}

controller.loadConversations = async function() {
    // get many conversations
    // save conversations to model
    // save current conversation
    let currentEmail = firebase.auth().currentUser.email
    let result = await firebase
        .firestore()
        .collection('conversations')
        .where('users', 'array-contains', currentEmail)
        .get()

    let conversations = transformDocs(result.docs)
    model.saveConversations(conversations)
    if (conversations.length) {
        let currentConversation = conversations[0]
        model.saveCurrentConversation(currentConversation)
    }
}

function transformDocs(docs) {
    // let datas = []
    // for(let doc of docs) {
    //   let data = doc.data()
    //   data.id = doc.id
    //   datas.push(data)
    // }
    // return datas
    return docs.map(transformDoc)
}

function transformDoc(doc) {
    let data = doc.data()
    data.id = doc.id
    return data
}