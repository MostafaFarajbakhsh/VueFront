<template>
<v-app>
    <Header/>
    <v-main>
  <v-card class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src='../../assets/signup.jpg'
    ></v-img>

    <v-card-title>ثبت نام</v-card-title>

    <v-card-text>
      <form>
        <v-text-field
          v-model="firstname"
          :error-messages="firstnameErrors"
          :counter="50"
          label="نام"
          required
          @input="$v.firstname.$touch()"
          @blur="$v.firstname.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="lastname"
          :error-messages="lastnameErrors"
          :counter="100"
          label="نام خانوادگی"
          required
          @input="$v.lastname.$touch()"
          @blur="$v.lastname.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          :counter="10"
          label="کدملی"
          required
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          :error-messages="passwordErrors"
          :counter="50"
          label="گذرواژه"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>

        <!-- <v-divider class="mx-4"></v-divider> -->
        <v-btn
          color="success"
          elevation="3"
          depressed
          large
          small
          class="mr-4"
          @click.prevent="signupUser()"
          
        >
          ثبت نام
        </v-btn>

        <v-btn
          @click="clear"
          color="secondary"
          elevation="3"
          depressed
          large
          small
        >
          باز سازی
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
   </v-main>
  </v-app>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import Header from '../Shared/Header';
export default {
  mixins: [validationMixin],

  validations: {
    username: { required, maxLength: maxLength(10), minLength: minLength(10) },
    firstname: { required, maxLength: maxLength(50), minLength: minLength(2) },
    lastname: { required, maxLength: maxLength(100), minLength: minLength(2) },
    password: { required, maxLength: maxLength(50), minLength: minLength(6) },
  },
components: {
    
    Header,
  },
  data: () => ({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  }),

  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.maxLength && errors.push("کد ملی باید 10 رقم باشد");
      !this.$v.username.required && errors.push("کد ملی را وارد کنید");
      return errors;
    },
    firstnameErrors() {
      const errors = [];
      if (!this.$v.firstname.$dirty) return errors;
      !this.$v.firstname.maxLength &&
        errors.push("نام حداکثر می تواند 50 حرف باشد");
      !this.$v.firstname.minLength &&
        errors.push("نام حداقل می تواند 2 حرف باشد");
      !this.$v.firstname.required && errors.push("نام را وارد کنید");
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.lastname.$dirty) return errors;
      !this.$v.lastname.maxLength &&
        errors.push("نام خانوادگی حداکثر می تواند تا 100 کاراکتر باشد");
      !this.$v.lastname.minLength &&
        errors.push("نام خانوادگی حداقل می تواند 2 حرف باشد");
      !this.$v.lastname.required && errors.push("نام خانوادگی را وارد کنید");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("گذرواژه حد اکثر باید 50 کاراکتر باشد");
         !this.$v.password.minLength &&
        errors.push("گذرواژه حد اقل باید 6 کاراکتر باشد");
      !this.$v.password.required && errors.push("گذرواژه را وارد کنید");
      return errors;
    },
  },

  methods: {
    signupUser() {
      const User = {
        CellPhoneNumber: this.password,
        NationalCode: this.username,
        LastName: this.lastname,
        FirstName: this.firstname,
      };
      this.$store.dispatch("SignUpUserByForm",User);
      // console.log(User);
      // this.$store.dispatch("SignUpUserByForm", User);
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.firstname = "";
      this.lastname = "";
      this.username = "";
      this.password = "";
    },
  },
};
</script>