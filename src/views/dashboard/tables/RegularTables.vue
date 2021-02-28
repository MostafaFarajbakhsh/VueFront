<template>
  <v-container
    id='regular-tables'
    fluid
    tag='section'
  >
    <base-v-component
    heading='Simple Tables'
    link='components/simple-tables'
    />

    <base-material-card
      icon='mdi-account-group'
      title=' مدیریت کاربران'
      class='px-5 py-3'
    >
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model='search'
            append-icon='mdi-magnify'
            label='Search'
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers='headers'
          :items='GetAllUsers'
          :search='search'
          mobile-breakpoint='0'
        ></v-data-table>
      </v-card>
    </base-material-card>
    <div class='py-5' />
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          // {
          //   text: 'نام',
          //   align: 'start',
          //   sortable: false,
          //   value: 'name',
          // },
          { text: 'نام', value: 'FirstName' },
          { text: 'نام خانوادگی', value: 'LastName' },
          { text: 'کد ملی', value: 'NationalCode' },
          { text: 'همراه', value: 'CellPhoneNumber' },
          { text: 'شماره شناسنامه', value: 'BirthCertificateIdCard' },
          { text: 'تاریخ تولد', value: 'BirthDay' },
          { text: 'نوع کاربری', value: 'Type' },
        ],
        // desserts: [
        //   {
        //     name: 'Frozen Yogurt',
        //     calories: 159,
        //     fat: 6.0,
        //     carbs: 24,
        //     protein: 4.0,
        //     iron: '1%',
        //   },
        // ],
      }
    },
    computed: {
      GetAllUsers () {
        return this.$store.getters.GetAllUsers
      },
    },
    created () {
      this.$store.dispatch('GetAllUsersFromServer')
    },
  }
</script>
