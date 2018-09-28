<template>
  <div class="hero-head">
    <header class="nav" :class="{'nav-iframe': isOpenedInIFrame}">
      <div class="container">
        <div class="nav-left">
          <router-link to="/" class="nav-item" :class="{'hide': isOpenedInIFrame}">
            <img src="/static/app-logo.png" class="app-logo" /> <p class="app-logo-name"><span class="headerSpan">MasterNodeum</span></p>
          </router-link>
        </div>
        <div class="nav-center">
          <span class="nav-item" :class="{'hide': isOpenedInIFrame}">
            <a class="enjoy-css" :class="{'hide': isOpenedInIFrame}" @click="div_show">
              <span class="headerSpan">Subscription</span>
            </a>
            <link async href="https://fonts.googleapis.com/css?family=Advent%20Pro" data-generated="http://enjoycss.com" rel="stylesheet" type="text/css"/>
          </span>
        </div>
        <div class="nav-right nav-menu">
          <span class="nav-item">
            <img src="/static/app-logo.png" class="iframe-app-logo" :class="{'show': isOpenedInIFrame}"/>
            <a class="button is-success is-inverted is-outlined" :class="{'hide': isOpenedInIFrame}" @click="toggleModal">
              <span class="headerSpan">What's this?</span>
            </a>
          </span>
        </div>
      </div>
    </header>
    <div class="modal" :class="{'is-active': modalActive}">
      <div class="modal-background" @click="toggleModal"></div>
        <div class="modal-card">
          <header class="modal-card-head"></header>
          <section class="modal-card-body">
            <div class="content">
              <h3> MasterNodeum </h3>
              <img src="/static/app-logo.png" class="modal-body-logo" id="app-logo"/>
              <p> <a href="https://www.masternodeum.com/" target="_blank">MasterNodeum</a>  is a site that holding the market for the next generation of mining offering a system that you can be aware of fast, reliable and up-to-date developments. </p>
              <p><a target="_blank">MasterNodeum</a>  <a href="https://www.masternodeum.com/" target="_blank"></a> In addition, taking care to work with non-fraudulent, secure companies, and we only get ads from companies that match this definition</p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <div class="content has-text-centered">
              <div class="footer-title">MasterNodeum | <icon name="calendar" height="12"></icon> 2018</div>
              <div class="footer-social-media">
                <a class="icon" href="" target="_blank">
                  <icon name="h-square" scale="2"></icon>
                </a>
                <a class="icon" href="" target="_blank">
                  <icon name="github-square" scale="2"></icon>
                </a>
                 <a class="icon" href="" target="_blank">
                  <icon name="linkedin-square" scale="2"></icon>
                </a>
                <a class="icon" href="mailto:ozantde@gmail.com" target="_blank">
                  <icon name="envelope-square" scale="2"></icon>
                </a>
              </div>
              <div class="wallet-content">

              </div>
            </div>
          </footer>
          <button class="modal-close is-medium" @click="toggleModal"></button>
        </div>
    </div>
    <div id="overlay" class="overlay modal">
      <legend>varsa bu kısımla ilgili açıklamalar
        varsa bu kısımla ilgili açıklamalar
        varsa bu kısımla ilgili açıklamalar
        varsa bu kısımla ilgili açıklamalar
        varsa bu kısımla ilgili açıklamalar</legend>
      <!-- Popup Div Starts Here -->
      <div id="popupContact">
        <!-- Contact Us Form -->
        <form action="/kaydet.php" id="form" method="post" name="form">
          <h2 id="subscribeH2">Subscribe Us!</h2>
          <hr>
          <span class="formGroup">
            <label for="name">Name</label>
            <input id="name" class="subscribeInput" name="name" placeholder="John" type="text" required>
          </span>
          <span class="formGroup">
            <label for="surname">Surname</label>
            <input id="surname" class="subscribeInput" name="surname" placeholder="Doe" type="text" required>
          </span>
          <span class="formGroup emailGroup">
            <label for="email">Email</label>
            <input id="email" name="email" class="subscribeInput" placeholder="example@example.com" type="text" required>
          </span>
          <span class="formGroup phoneGroup">
            <label for="phone">Phone</label>
           <span class="telGroup"><v-select id="v-select" class="Select-option" style="width: 20px;"
                                            v-model="selectedCountry"
                                            :options="countryList"
                                            label="label"
                                            item-text="label"
                                            item-value="id"
                                            return-object></v-select>
            <input type="tel" id="phone" name="phone" class="subscribeInput"
                   placeholder="123-456-7890"
                   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                   required /></span>
          </span>
          <a href="#" @click="check_empty" id="submit">Send</a>
        </form>
        <button id="closePopUp" class="modal-close is-medium" @click="div_hide"></button>
      </div>
      <!-- Popup Div Ends Here -->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {get}  from 'axios'
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  Vue.use(VueAxios, axios)
export default {
  name: 'headerHero',
  data () {
    return {
      modalActive: false,
      subscriptionActive: false,
      showBTCWallet: false,
      showETHWallet: false,
      isOpenedInIFrame: false,
      countryList: [],
      selectedCountry: null
    }
  },
  created () {
    if (window.self !== window.top) {
      this.isOpenedInIFrame = true
    }
  },
  methods: {
    toggleModal () {
      this.modalActive = !this.modalActive
    },
    displayBTC () {
      this.showBTCWallet = true
    },
    displayETH () {
      this.showETHWallet = true
    },
    check_empty() {
      if (document.getElementById('name').value == "" || document.getElementById('email').value == "" ) {
        alert("Fill All Fields !");
      } else {
        return this.subscription_post();//returnu kaldır
        alert("Form Submitted Successfully...");
      }
    },
//Function To Display Popup
    div_show() {
      let promises = [];
      let responses = [];
      document.getElementsByClassName("overlay")[0].style.display = "block";
      const countryUrl = 'http://localhost:3000/countries';
      promises.push(
        new Promise ( (resolve, reject) => {
          get(countryUrl).then((response) => {
            responses.push(response.data)
            resolve();
          }).catch(reject)
        })
      );
      Promise.all(promises).then(() => {
        this.countryList = responses[0];
        console.log(responses[0]);
      });
    },
//Function to Hide Popup
    div_hide(){
      document.getElementsByClassName("overlay")[0].style.display = "none";
    },
//Function to Post Subscription Popup Data
    subscription_post(){
      let data ={"name": document.getElementById('name').value,
                                        "surname":document.getElementById('surname').value,
                                        "phone":document.getElementById('phone').value,
                                        "email":document.getElementById('email').value,
                                        "country_id":this.selectedCountry.id};
      this.axios.post('http://localhost:3000/subscribers', data)
        .then(response => {
          console.log(response);
          if(response.data.success == true){
            this.div_hide();
          }else{
            alert("An Error Encountered");
          }

      }).catch(err => {
        alert("An Error Encountered");
        console.log(err);
      });
    }
  }
}
</script>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Kaushan+Script');
$small: 590px;
$medium: 768px;
$large: 1024px;
$subscription-form-bg: darken(pink, 20%);
$subscription-form-color: white;
$subscription-form-padding: rem-calc(32);


.headerSpan{
  color: #1ecd97;
}

  #form,#subscribeH2, .formGroup>input{
    font-family: 'Kaushan Script', cursive !important;
  }

.button.is-success.is-inverted.is-outlined {
  background-color: transparent;
  border-color: #1ecd97;
  color: #fff;
}
v-select{
  max-height: 50px;
}
.overlay {
  position: fixed; /* Positioning and size */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.80);
  display: none; /* making it hidden by default */
  z-index: 20;
}


@media screen and (max-width: 768px){
  #closePopUp {
  position: absolute;
  top: 7px;
  right: 154px;
  }
}

.formGroup {
  display: inline-grid;
}
.phoneGroup{
  margin-bottom: 65px;
}
.telGroup{
  display: inline-block;
}
.emailGroup{
  width: 269px;
}
.dropdown-toggle {
    cursor: text;
    height: 30px !important;
    margin-top: 4px !important;
}
.dropdown.v-select.single.searchable{
  width: 60px !important;
  height: 29px !important;
  margin-top: 4px;
  max-height: 60px;
}
  .dropdown-menu{
    max-height: 60px!important;
  }
  .open ul {
    max-height: 50px!important;
  }
.enjoy-css {
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  width: 150px;
  height: 32px;
  cursor: pointer;
  margin: 0 auto;
  border: 2px solid rgb(30,205,151);
  -webkit-border-radius: 5%;
  border-radius: 5%;
  font: bolder 1.5rem/2rem "Advent Pro", Helvetica, sans-serif;
  color: rgb(30, 205, 151);
  text-align: center;
  -o-text-overflow: clip;
  text-overflow: clip;
  letter-spacing: 1px;
  background: rgba(0,0,0,0);
  -webkit-transition: background-color 0.3s cubic-bezier(0, 0, 0, 0), color 0.3s cubic-bezier(0, 0, 0, 0), width 0.3s cubic-bezier(0, 0, 0, 0), border-width 0.3s cubic-bezier(0, 0, 0, 0), border-color 0.3s cubic-bezier(0, 0, 0, 0);
  -moz-transition: background-color 0.3s cubic-bezier(0, 0, 0, 0), color 0.3s cubic-bezier(0, 0, 0, 0), width 0.3s cubic-bezier(0, 0, 0, 0), border-width 0.3s cubic-bezier(0, 0, 0, 0), border-color 0.3s cubic-bezier(0, 0, 0, 0);
  -o-transition: background-color 0.3s cubic-bezier(0, 0, 0, 0), color 0.3s cubic-bezier(0, 0, 0, 0), width 0.3s cubic-bezier(0, 0, 0, 0), border-width 0.3s cubic-bezier(0, 0, 0, 0), border-color 0.3s cubic-bezier(0, 0, 0, 0);
  transition: background-color 0.3s cubic-bezier(0, 0, 0, 0), color 0.3s cubic-bezier(0, 0, 0, 0), width 0.3s cubic-bezier(0, 0, 0, 0), border-width 0.3s cubic-bezier(0, 0, 0, 0), border-color 0.3s cubic-bezier(0, 0, 0, 0);
}

.enjoy-css:hover {
  .headerSpan{
    color: rgb(255,255,255);
  }
  background: rgb(80, 205, 151);
}

.enjoy-css:active {
  border: 2px solid rgba(33,224,163,1);
  background: rgba(33,224,163,1);
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  transition: none;
}
span.nav-item{
  margin-top: 10px;
}

.nav {
  font-family: Nunito, sans-serif;
  -webkit-box-shadow: 0px 0px 0px 0px !important;
  box-shadow: 0px 0px 0px 0px !important;

  .nav-left {
    overflow-y: hidden;

    .nav-item {
      /*@media screen and (max-width: $medium) {
        padding-top: 15px;
      }*/

      .app-logo {
        max-height: 35px;
        padding-right: 5px;
      }

      .app-logo-name {
        font-size: 18px;
        color:#4e4f51 !important;
        letter-spacing: 5px;
        padding-top: 2px;

        @media screen and (max-width: $small) {
          display: none;
        }
      }
    }
  }

  .nav-right {
    /*@media screen and (max-width: $medium) {
      background-color: transparent;
      display: block;
      top: 0;
      left: inherit;
    }*/
    .nav-item {
      .iframe-app-logo {
        max-height: 25px;
        padding-right: 5px;
        display: none;
      }

      .button {
        color:#4e4f51 !important;
        &:hover {
          color: #fd6721;
        }
      }
    }
  }
}
.modal {
  .modal-card {
    border-radius: 10px;
    max-width: 500px;

     @media screen and (max-width: $medium) {
      margin: 0px;
    }

    .modal-card-head {
      display: block;
      background-color: #FFF;
      border-bottom: 0px;
      padding-bottom: 0px;

      .modal-logo {
        height: 80px;
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;

        @media screen and (max-width: $medium) {
          height: 40px;
        }
      }

      .modal-card-title {
        font-size: 25px;
        letter-spacing: 5px;
      }
    }

    .modal-card-body {
      font-family: Nunito, sans-serif;
      color: #000;
      padding: 0px 20px;
      padding-bottom: 20px;

      p {
        font-size: 14px;

        @media screen and (max-width: $medium) {
          font-size: 12px;
        }

        a {
          color: #fd6721;
          font-weight: 700;
          text-decoration: none;
        }
      }

      h3 {
        color: #fd6721;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      #app-logo {
        height: 60px;
      }

      #vue-logo {
        height: 60px;

        -webkit-animation-name: spinner;
        -webkit-animation-timing-function: linear;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-duration: 30s;
        animation-name: spinner;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: 30s;
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        transform-style: preserve-3d;

        @media screen and (max-width: $medium) {
          height: 40px;
        }
      }

      .is-success {
        background-color: #fd6721;

        @media screen and (max-width: $medium) {
          display: none;
        }
      }
    }

    .modal-card-foot {
      font-family: Nunito, sans-serif;
      padding-bottom: 1px;
      background-color: transparent;

      @media screen and (max-width: $medium) {
        padding-top: 5px;
      }

      .content {
        color: #FFF;
        display: block;
        margin: 0 auto;

        @media screen and (max-width: $medium) {
          display: none;
        }

        .footer-title {
          font-size: 15px;
          font-weight: 400;
        }

        .footer-social-media {
          height: 30px;
          color: #fd6721;

          .icon {
            text-decoration: none;
            -webkit-transform: scale(0.8);
            -moz-transform: scale(0.8);
            -o-transfrom: scale(0.8);
            -webkit-transition-duration: 0.5s;
            -moz-transition-duration: 0.5s;
            -o-transition-duration: 0.5s;
            transition: 0.5s;

            &:hover {
              color: #4fc08d;
            }
          }
        }

        .wallet-content {
          display: block;
          margin: 0 auto;
          font-size: 11px;

          .wallet-tag {
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 0px;
            -o-transition: .5s;
            -ms-transition: .5s;
            -moz-transition: .5s;
            -webkit-transition: .5s;
            transition: .5s;

            &:hover {
              color: #fd6721;
            }
          }

          .wallet-id {
            color: #00d1b2;
          }
        }
      }
    }
  }

  .modal-close {
    background-color: #fd6721;

    @media screen and (max-width: $medium) {
      position: absolute;
      top: 15px;
      right: 5px;
    }
  }
}

.hide {
  display: none !important;
}

.show {
  display: block !important;
}

.nav-iframe {
  height: 2.5rem;
}

img#close {
  position:absolute;
  right:-14px;
  top:-14px;
  cursor:pointer;
  width: 10%;
}
div#popupContact {
  position:absolute;
  left:50%;
  color: #000;
  padding-left: 52px;
  max-height: 120vw;
  width: 500px;
  top:17%;
  margin-left:-202px;
  font-family:'Raleway',sans-serif
}
form {
  max-width:300px;
  min-width:250px;
  //spadding:10px 50px;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 120vw;
  border:5px solid #4fc08d;
  border-radius:10px;
  font-family:'Raleway',sans-serif;
  background-color:#fff
}
p {
  margin-top:30px
}
h2 {
  background-color:#FEFFED;
  background-color:#4fc08d;
  border:1px solid #4fc08d;
  padding:20px 35px;
  margin:-10px -50px;
  text-align:center;
  font-weight: bolder;
  font-size: larger;
  color: #000;
  border-radius:10px 10px 0 0;
  font-family:'Raleway',sans-serif
}
hr {
  margin:10px -50px;
  border:0;
  border-top:1px solid #ccc;
  font-family:'Raleway',sans-serif;
}
.subscribeInput {
  //width:75%;
  padding:6px;
  margin-top: 5px;
  margin-bottom: 5px;
  border:1px solid #ccc;
  padding-left:10px;
  font-size:14px;
  font-family:'Raleway',sans-serif;
}

.subscribeInput:focus{
  outline: none;
  box-shadow: 0 0 2.5pt 1.7pt #42b983;
}

#name {
  background-repeat:no-repeat;
  background-position:5px 7px;
  font-family:'Raleway',sans-serif;
}
#email {
  background-repeat:no-repeat;
  background-position:5px 7px;
  font-family:'Raleway',sans-serif;
}
textarea {
  background-repeat:no-repeat;
  background-position:5px 7px;
  width:82%;
  height:95px;
  padding:10px;
  resize:none;
  margin-top:30px;
  border:1px solid #ccc;
  padding-left:40px;
  font-size:16px;
  font-family:raleway;
  margin-bottom:30px
}
#submit {
  text-decoration:none;
  width:100%;
  text-align:center;
  display:block;
  background-color:#4fc08d;
  color:#000;
  border:1px solid #4fc08d;
  //border: 2px outset #4e4f51;
  padding:10px 0;
  font-size:20px;
  cursor:pointer;
  border-radius:-5px;
  -webkit-transition: .05s all;
  -webkit-transition-delay: .05s;
  -moz-transition: .05s all;
  -moz-transition-delay: .05s;
  -ms-transition: .05s all;
  -ms-transition-delay: .05s;
  -o-transition: .05s all;
  -o-transition-delay: .05s;
  transition: .05s all;
  transition-delay: .05s;
  &:hover {
    color: #fd6721;
    background-color: lightseagreen;
    -webkit-transition-delay: 0s;
    -moz-transition-delay: 0s;
    -ms-transition-delay: 0s;
    -o-transition-delay: 0s;
    transition-delay: 0s;
  }
}
button {
  width:10%;
  height:45px;
  border-radius:3px;
  background-color:#cd853f;
  color:#fff;
  font-family:'Raleway',sans-serif;
  font-size:18px;
  cursor:pointer
}

@-webkit-keyframes spinner {
    from
    {
        -webkit-transform: rotateY(0deg);
    }
    to {
        -webkit-transform: rotateY(-360deg);
    }
}
@keyframes spinner {
    from {
        -moz-transform: rotateY(0deg);
        -ms-transform: rotateY(0deg);
        transform: rotateY(0deg);
    }
    to
    {
        -moz-transform: rotateY(-360deg);
        -ms-transform: rotateY(-360deg);
        transform: rotateY(-360deg);

    }
}
</style>
