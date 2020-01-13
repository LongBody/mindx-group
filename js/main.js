window.onload = init

function init() {
    view.showComponents('loading')

    firebase.auth().onAuthStateChanged(function(user) {
        if (view.currentScreen == 'register' ||
            view.currentScreen == 'logIn') {
            return
        }
        if (user && user.emailVerified) {
            view.showComponents('chat')
        } else {
            view.showComponents('register')
        }
    })
}

// demo
async function demoQueryDatabase() {
    // get many
    let result = await firebase.firestore().collection('conversations').get()
    console.log(result)

}

demoQueryDatabase()