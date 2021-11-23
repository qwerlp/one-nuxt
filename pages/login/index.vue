<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? "Sign in" : "Sign up" }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(message, field) in errors" :key="field">
              {{ field }} {{ message }}
            </li>
          </ul>

          <form @submit.prevent="onSumbit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="eamil"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login, register } from "@/api/user";

const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "notLogin",
  name: "LoginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "1084353933@qq.com",
        password: "123",
      },
      errors: {},
    };
  },
  methods: {
    async onSumbit() {
      //提交表单
      try {
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        console.log(data);
        this.$store.commit("setUser", data.user);
        Cookie.set("user", JSON.stringify(data.user));
        //跳转到首页
        this.$router.push("/");
      } catch (err) {
        console.dir(err);
        this.errors = err.response.data.errors;
      }
    },
  },
};
</script>