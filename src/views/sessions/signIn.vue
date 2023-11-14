<template>
  <div
    class="auth-layout-wrap not-found-wrap"
  >
    <div class="auth-content">
      <div class="card o-hidden login-card">
        <div class="row">
          <div class="col-8 offset-2 pt-4">
              <div class="auth-logo text-center mb-30">
                <h2 class="logo_login_page pull-left ">
                  <img :src="require('@/assets/images/logo-wide.png')" />
                  <span class="logotip"></span>
                </h2>
                <h2 class="logo_login_page text_logo ">{{$t('message.mno') }} </h2>
              </div>
          </div>

          <div class="col-8 offset-2">
            <div class="p-4">
            <h1 class="mb-3 text-18">Kirish</h1>
            <b-form @submit.prevent="formSubmit">
              <b-form-group label="Login" class="text-12">
                <b-form-input
                        class="form-control"
                        type="text"
                        v-model="user.username"
                        email
                        required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Parol" class="text-12">
                <b-form-input
                        class="form-control"
                        type="password"
                        v-model="user.password"
                ></b-form-input>
              </b-form-group>

              <!-- <b-button block to="/" variant="primary btn-rounded mt-2"
                >Sign In</b-button
              > -->
              <b-button
                      
                      tag="button"
                      class="btn-block mt-3 "
                      variant="outline-primary mt-2"
                      :disabled="loading"
                      type="submit"
              >
                Kirish
              </b-button>
              <div v-once class="typo__p" v-if="loading">
                <div class="spinner sm spinner-primary mt-3"></div>
              </div>
            </b-form>

           <!-- <div class="mt-3 text-center">
              <router-link to="forgot" tag="a" class="text-muted">
                <u>Forgot Password?</u>
              </router-link>
            </div>-->
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "SignIn"
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      // // password: "vue006",
      userId: "",
    };
  },
  computed: {
  /*  validation() {
      return this.userId.length > 4 && this.userId.length < 13;
    },*/
    ...mapGetters(["loggedInUser", "loading", "error"])
  },

  methods: {
    ...mapActions(["login"]),
    formSubmit() {
      this.$store.dispatch("LoginByUsername", this.user).then(res => {
        this.makeToast("success", "Successfully Logged In", 'Logged In');
        if (res.role != 4) {
          this.$router.push({path: '/'})
        }else{
          this.$router.push({path: '/app/statistics'})
        }
      }).catch(error => {
          this.makeToast("danger", error.response.data.detail, 'Failed');
//          notify(error)
      })
    },
    makeToast(variant = null, msg, title) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    }
  },
  watch: {
    /*loggedInUser(val) {
      if (val && val.uid && val.uid.length > 0) {
        this.makeToast("success", "Successfully Logged In");

        setTimeout(() => {
          this.$router.push("/");
        }, 500);
      }
    },*/
    error(val) {
      if (val != null) {
        this.makeToast("warning", val.message);
      }
    }
  }
};
</script>

<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
.auth-logo {
  display: block;
  width: 100%;
}
.logo_login_page {
  color: #838383;
  font-family: sans-serif;
  text-transform: uppercase;
  position: relative;
}
.logo_login_page img {
  max-width: 90px !important;
  height: auto;
}
  .pull-left {
    float: left !important;
  }
  .text_logo {
    margin-top: 25px;
    font-size: 18px;
    font-weight: bold;
    margin-left: 30px;
    position: absolute;
    left: 95px;
  }
  .logotip {
    width: 300px;
    height: 300px;
    top: -90px;
    left: -107px;
    position: absolute;
    display: block;
    background: url('../../assets/images/grad-logo.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .login-card {
    box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.08);
  }
</style>
