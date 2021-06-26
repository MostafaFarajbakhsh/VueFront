<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
   <v-row>
        <template>
          <v-spacer></v-spacer>
          <v-text-field
            v-model='search'
            append-icon='mdi-magnify'
            label='جستجو'
          ></v-text-field>
          <v-spacer></v-spacer>
    </template>
      </v-row>
    <v-row>
      <div
      v-for="User in FilterSerach"
      :key="User.Id"
      >
        <v-card
          class="mx-2"
          max-width="320"
          elevation="2"
          outlined
          shaped
          color="grey lighten-4"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">
                <h2>{{User.FullName}}</h2>
              </div>
              <v-list-item-title class="text-h5 mb-1">
               شماره تماس:  {{User.CellPhoneNumber}}
              </v-list-item-title>
              <v-list-item-title class="text-h5 mb-1">
               کد ملی:  {{User.NationalCode}}
              </v-list-item-title>
              <v-list-item-title class="text-h5 mb-1">
               نام پدر:  {{User.FatherName}}
              </v-list-item-title>
              <v-list-item-subtitle>آدرس : {{User.Address}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
            >
              Button
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        search: '',
      }
    },
    created () {
      this.initialize()
    },
    computed: {
      GetAllUsers () {
        return this.$store.getters.GetAllUsers
      },
      FilterSerach () {
        return this.GetAllUsers.filter((user) => {
          return user.FullName.match(this.search)
        })
      },
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      initialize () {
        this.$store.dispatch('GetAllUsersFromServer')
      },
    },
  }
</script>
