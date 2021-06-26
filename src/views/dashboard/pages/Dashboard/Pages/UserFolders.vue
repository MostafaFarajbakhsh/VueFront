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
      v-for="Folder in FilterSerach"
      :key="Folder.Id"
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
                <h2>{{Folder.Title}}</h2>
              </div>
              <v-list-item-title class="text-h5 mb-1">
               شماره پرونده:  {{Folder.Number}}
              </v-list-item-title>
              <v-list-item-title class="text-h5 mb-1">
               آدرس قفسه:  {{Folder.PhysicalAddress}}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h5 mb-1">
                توضیحات:  {{Folder.Description}}
              </v-list-item-subtitle>
              <v-divider
              class="mx-4"
              color="red"
              ></v-divider>
              <v-list-item-subtitle class="text-h5 mb-1">
                متصرفان:  {{Folder.Description}}
              </v-list-item-subtitle>
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
      GetAllFolders () {
        return this.$store.getters.GetAllFolders
      },
      GetAllFolderAndUsers () {
        return this.$store.getters.GetAllFolderAndUsers
      },
      FilterSerach () {
        return this.GetAllFolders.filter((folder) => {
          return folder.Title.match(this.search)
        })
      },
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      initialize () {
        this.$store.dispatch('GetAllFoldersFromServer')
        this.$store.dispatch('GetAllFolderAndUsersFromServer')
      },
    },
  }
</script>
