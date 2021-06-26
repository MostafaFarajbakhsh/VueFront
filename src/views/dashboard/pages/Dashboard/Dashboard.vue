<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
    <router-link to="/dashboard/users">
      <v-img
        height="200"
        src="../../../../assets/images/users.jpg"
      ></v-img>
            </router-link>

      <v-card-title><router-link to="/dashboard/users">
            کاربران
            </router-link></v-card-title>
      <v-card-title> تعداد کاربران : {{GetAllUsers.length}} نفر</v-card-title>
      <v-divider class="mx-4"></v-divider>
    <div class="pa-4 text-subtitle-1">
        تمام کاربران موجود در سامانه
        </div>
        </v-card>
      </v-col>
       <v-col
        cols="12"
        lg="4"
      >
      <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <router-link to="/dashboard/letters">
    <v-img
      height="200"
      src="../../../../assets/images/letter.jpg"
    ></v-img>
    </router-link>

    <v-card-title><router-link to="/dashboard/letters">
           نامه ها
          </router-link></v-card-title>
    <v-card-title> تعداد  نامه ها : {{GetAllLetters.length}} نامه</v-card-title>
    <v-divider class="mx-4"></v-divider>
  <div class="pa-4 text-subtitle-1">
       تمام کاربران موجود در سامانه
      </div>
      </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
      <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <router-link to="/dashboard/folders">
    <v-img
      height="200"
      src="../../../../assets/images/folder.jpg"
    ></v-img>
    </router-link>

    <v-card-title><router-link to="/dashboard/folders">
           پرونده ها
          </router-link></v-card-title>
    <v-card-title> تعداد  پرونده ها : {{GetAllFolders.length}} پرونده</v-card-title>
    <v-divider class="mx-4"></v-divider>
  <div class="pa-4 text-subtitle-1">
       تمام کاربران موجود در سامانه
      </div>
      </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <router-link to="/dashboard/generations">
      <v-img
        height="200"
        src="../../../../assets/images/part.jpg"
      ></v-img>
      </router-link>

      <v-card-title>
        <router-link to="/dashboard/generations">
           قطعات زمین
            </router-link>
            </v-card-title>
      <v-card-title> تعداد تعرفه ها : {{GetAllOghafCosts.length}} تعرفه </v-card-title>
      <v-divider class="mx-4"></v-divider>
    <div class="pa-4 text-subtitle-1">
        تمام کاربران موجود در سامانه
        </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <router-link to="/dashboard/generations">
      <v-img
        height="200"
        src="../../../../assets/images/tariff.jpg"
      ></v-img>
      </router-link>

      <v-card-title>
        <router-link to="/dashboard/generations">
            تعرفه اوقاف
            </router-link>
            </v-card-title>
      <v-card-title> تعداد تعرفه ها : {{GetAllOghafCosts.length}} تعرفه </v-card-title>
      <v-divider class="mx-4"></v-divider>
    <div class="pa-4 text-subtitle-1">
        تمام کاربران موجود در سامانه
        </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <router-link to="/dashboard/generations">
      <v-img
        height="200"
        src="../../../../assets/images/tree.jpg"
      ></v-img>
      </router-link>

      <v-card-title>
        <router-link to="/dashboard/generations">
            متولیان
            </router-link>
            </v-card-title>
      <v-card-title>تعداد متولیان : {{GetAllGenerations.length}} نفر </v-card-title>
      <v-divider class="mx-4"></v-divider>
    <div class="pa-4 text-subtitle-1">
        تمام کاربران موجود در سامانه
        </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-sofa"
          title="متصرفان"
          value="184"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
      }
    },
    created () {
      this.initialize()
    },
    computed: {
      GetAllGenerations () {
        return this.$store.getters.GetAllGenerations
      },
      GetAllUsers () {
        return this.$store.getters.GetAllUsers
      },
      GetAllOghafCosts () {
        return this.$store.getters.GetAllOghafCosts
      },
      GetAllFolders () {
        return this.$store.getters.GetAllFolders
      },
      GetAllLetters () {
        return this.$store.getters.GetAllLetters
      },
      ImageAddress () {
        return this.$store.getters.getImagesAddress
      },
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      initialize () {
        this.$store.dispatch('GetAllGenerationsFromServer')
        this.$store.dispatch('GetAllUsersFromServer')
        this.$store.dispatch('GetAllFoldersFromServer')
        this.$store.dispatch('GetAllOghafCostsFromServer')
      },
    },
  }
</script>
