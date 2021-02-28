<template>
  <v-app>
    <header-tag />
    <v-main>
      <v-card
      class='mx-auto my-12'
      max-width='374'
      >
    <template slot='progress'>
      <v-progress-linear
        color='deep-purple'
        height='10'
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height='250'
      src='../../assets/login.jpg'
    ></v-img>

    <v-card-title>ورود به حساب کاربری</v-card-title>

    <v-card-text>
      <form>
        <v-text-field
          v-model='username'
          :error-messages='usernameErrors'
          :counter='10'
          label='کدملی'
          required
          @input='$v.username.$touch()'
          @blur='$v.username.$touch()'
        ></v-text-field>
        <v-text-field
          v-model='password'
           type='password'
          :error-messages='passwordErrors'
          :counter='50'
          label='گذرواژه'
          required
          @input='$v.password.$touch()'
          @blur='$v.password.$touch()'
        ></v-text-field>
    <!-- <v-divider class='mx-4'></v-divider> -->
        <v-btn
        color='success'
        elevation='3'
        depressed
        large
        small
        class='mr-4'
        @click='Login()'
        > ورود </v-btn>
        <v-btn
        @click='clear'
        color='secondary'
        elevation='3'
        depressed
        large
        small
        > باز سازی </v-btn>
      </form>
    </v-card-text>

  </v-card>
    </v-main>
  </v-app>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import HeaderTag from '../Shared/Header'
  export default {
    mixins: [validationMixin],
    validations: {
      username: { required },
      password: { required },
    },
    data: () => ({
      username: '',
      password: '',
    }),
    components: {
      HeaderTag,
    },
    computed: {
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('نام کاربری خود را وارد کنید')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('گذرواژه را وارد کنید')
        return errors
      },
    },

    methods: {
      Login () {
        const User = {
          Password: this.password,
          UserName: this.username,
        }
        this.$store.dispatch('LoginByForm', User)
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.username = ''
        this.password = ''
      },
    },
  }
</script>
