const components = {}

components.register = `
<section class="register-container">
  <form id="register-form" class="register-form">
    <div class="form-header">
      <h3>Mindx Chat</h3>
    </div>
    <div class="form-content">
      <div class="name-wrapper">
        <div class="input-wrapper">
          <input type="text" name="firstname" placeholder="Firstname">
          <div id="firstname-error" class="message-error"></div>
        </div>
        <div class="input-wrapper">
          <input type="text" name="lastname" placeholder="Lastname">
          <div id="lastname-error" class="message-error"></div>
        </div>
      </div>
      <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email">
        <div id="email-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div id="password-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="confirmPassword" placeholder="Confirm password">
        <div id="confirm-password-error" class="message-error"></div>
      </div>
      <div id="register-error" class="message-error"></div>
      <div id="register-success" class="message-success"></div>
    </div>
    <div class="form-footer">
      <a id="register-link" href="#">Already have an account? Login</a>
      <button id="register-btn" type="submit">Register</button>
    </div>
  </form>
</section>
`


components.logIn = `
<section class="log-in-container">
  <form id="log-in-form" class="log-in-form">
    <div class="form-header">
      <h3>Mindx Chat</h3>
    </div>
    <div class="form-content">
      <div class="input-wrapper">
        <input type="email" name="email" placeholder="Email">
        <div id="email-error" class="message-error"></div>
      </div>
      <div class="input-wrapper">
        <input type="password" name="password" placeholder="Password">
        <div id="password-error" class="message-error"></div>
      </div>
      <div id="log-in-error" class="message-error"></div>
    </div>
    <div class="form-footer">
      <a id="log-in-link" href="#">Not yet have an account? Register</a>
      <button type="submit">Log in</button>
    </div>
  </form>
</section>
`

components.chat = `
<section class="chat-container">
  <!-- aside-left -->
  <div class="aside-left card">
            <div class="list-conversation " id="list-conversation"> 
         
            </div>
            <form class="form-add-conversation" id="form-add-conversation">
                <div class="input-wrapper">
                    <input type="text " name="title" placeholder="Enter conversation title ">
                    <div id="title-error" class="message-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="email " name="friendEmail" placeholder="Enter a friend email ">
                    <div id="friend-email-error" class="message-error"></div>
                </div>
                <button class="user-btn" id="showImage"  type="submit"><i class="fas fa-user-tie"></i></button>   
                <button class="sign-out-btn" id="sign-out-btn"  type="submit"><i class="fas fa-sign-out-alt"></i></button>
                <button class="btn-icon"  id="form-add-conversation-btn" type="submit"><i class="fas fa-plus"></i></button>
                


            </form>

        </div>
  <div class="current-conversation">
  <div class="info-nav-message pt-3">
  <input class="form-control-lg  col-sm-3 shadow-sm " type="text" placeholder="Search ...">
  <button class="btn btn-outline-success " type="submit">Search</button>
  </div>
    <div id="list-message" class="list-message">
    </div>
    <form id="form-add-message" class="form-add-message" >
      <div class="input-wrapper">
        <input type="text" name="message" placeholder="Enter your message">   
        <span class="emoji-show" id="emoji-show"><i class="fas fa-smile-beam"></i></span>
        <span class="thumb-up" id="laugh-show"><i class="fas fa-thumbs-up"></i></span>
 
      </div>
      <button id="form-add-message-btn" type="submit">Send</button>
    </form>
  </div>
  <!-- aside-right -->

  <div class="aside-right card">
  <div class=""></div></div>
</section>
`

components.loading = `
<div class="show-loading">
<div class="loading">
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
<div class="loading__square"></div>
</div></div>
`

// components.showImage = `<div class="container">
// <div class="row">
//     <div class="col-lg-12">
//         <h1>Hồ Sơ Cá Nhân</h1>
//     </div>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <div class="col-lg-5">
//         <div class="card">
//             <div class="form-group">
//                 <label for="">Upload Image</label>
//                 <input type="file" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
//             </div>
//         </div>
//     </div>
//     <div class="col-lg-6">
//         <h6>Email:"${Email}</h6>
//         <h6>Name:</h6>
//     </div>
// </div>
// </div>`