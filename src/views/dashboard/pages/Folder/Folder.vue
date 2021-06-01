<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              اطلاعات پرونده {{GetFolderById.Title}}
            </div>

            <!-- <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div> -->
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="عنوان پرونده"
                    class="purple-input"
                    v-model="GetFolderById.Title"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="شماره پرونده"
                    class="purple-input"
                    v-model="GetFolderById.Number"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="توضیحات"
                    v-model="GetFolderById.Description"
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="آدرس فیزیگی"
                    v-model="GetFolderById.PhysicalAddress"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h3 class="display-2 font-weight-light mb-3 black--text">
              {{GetFolderById.Title}}
            </h3>

            <h4 class="display-1 font-weight-light mb-3 black--text">
              شماره تماس: {{GetFolderById.Number}}
            </h4>

            <p class="font-weight-light grey--text">
              آدرس : {{GetFolderById.Description}}
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              انتخاب عکس
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    // data () {
    //   return {
    //     FirstName: '',
    //     LastName: '',
    //     FatherName: '',
    //     Username: '',
    //     Password: '',
    //     EmailAddress: '',
    //     NationalCode: '',
    //     BirthCertificateId: '',
    //     BirthDay: '',
    //     CellPhoneNumber: '',
    //     TellNumber: '',
    //     Job: '',
    //     PostalCode: '',
    //     Type: '',
    //     Address: '',
    //     Description: '',
    //   }
    // },
    computed: {
      GetFolderById () {
        return this.$store.getters.GetFolder
      },
    },
    created () {
      this.$store.dispatch('GetFolderFromServer', {
        Id: this.$route.params.Id,
      })
    },
    watch: {
      $route () {
        this.$store.dispatch('GetFolderFromServer', {
          Id: this.$route.params.Id,
        })
      },
    },
    methods: {
      // dfgdg
    },
  }
</script>
