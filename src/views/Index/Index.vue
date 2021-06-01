<template>
  <v-app>
      <Header-Tag />
    <v-main>
      <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <router-link
        to='/'
        >
          <p class="display-1 font-weight-bold mb-3">
            موقوفه حاج سید رضا سفیداری
          </p>
        </router-link>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-row
align="center"
justify="space-around"
        >
          <router-link to="/signup">
            <v-btn
              color="primary"
              elevation="3"
              depressed
              large
              rounded
              small
            >ثبت نام
            </v-btn>
          </router-link>
          <router-link to="/login">
            <v-btn
            color="success"
            elevation="3"
            depressed
            large
            rounded
            small
              >ورود
              </v-btn>
            </router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
    </v-main>
  </v-app>

</template>

<script>
  import Header from '../Shared/Header'
  export default {
    name: 'HelloWorld',

    components: {
      'Header-Tag': Header,
    },
    data: () => ({}),
  }
</script>
