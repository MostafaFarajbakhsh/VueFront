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
                    disabled
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
                    disabled
                    v-model="GetFolderById.Number"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    class="purple-input"
                    label="توضیحات"
                    disabled
                    v-model="GetFolderById.Description"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    class="purple-input"
                    label="آدرس فیزیگی"
                    disabled
                    v-model="GetFolderById.PhysicalAddress"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              افزودن کاربر به پرونده
            </div>

            <!-- <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div> -->
          </template>
          <v-data-table
            :headers="headers"
            :items="GetAllUsers"
            :search='search'
            sort-by="calories"
            class="elevation-1"
            :loading = !GetAllUsers.length
            loading-text="در حال بارگذاری..."
          >
            <template
                  slot="item.radif"
                  scope="props"
                  >
                  {{ props.index + 1 }}
            </template>
            <template v-slot:top>
              <v-toolbar
                flat
              >
              <v-spacer></v-spacer>
                  <v-text-field
                    v-model='search'
                    append-icon='mdi-magnify'
                    label='جستجو'
                    single-line
                    hide-details
                  ></v-text-field>
                <!-- <v-toolbar-title>My CRUD</v-toolbar-title> -->
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                :retain-focus="false"
                v-model="DialogAdd"
                max-width="500px"
                >
                  <v-card>
                    <v-card-title class="headline">آیا از اضافه کردن کاربر  {{ editedItem.FullName }} به پرونده مطمئن هستید؟</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="CloseAdd"
                      >
                      Cancel
                      </v-btn>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="AddUserConfirm"
                      >
                      OK
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
              class="mx-2"
              fab
              small
              @click="AddUser(item)"
              color="cyan"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
            </template>
            <template v-slot:no-data>
              <v-btn
                color="primary"
                @click="initialize"
              >
                Reset
              </v-btn>
            </template>
          </v-data-table>
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
        <div
        v-for="User in GeAllUsersByFolderId"
        :key="User.Id"
        >
          <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h3 class="display-2 font-weight-light mb-3 black--text">
              {{User.FullName}}
            </h3>

            <h4 class="display-1 font-weight-light mb-3 black--text">
             کد ملی: {{User.NationalCode}}
            </h4>
            <h4 class="display-1 font-weight-light mb-3 black--text">
             شماره همراه: {{User.CellPhoneNumber}}
            </h4>
            <p class="font-weight-light grey--text">
              آدرس : {{User.Address}}
            </p>

            <v-btn
              color="red"
              rounded
              class="mr-0"
              @click="RemoveUser()"
            >
             حذف از پرونده
            </v-btn>
          </v-card-text>
        </base-material-card>
        <v-dialog
                v-model="DialogRemove"
                max-width="500px"
                :retain-focus="false"
                >
                  <v-card>
                    <v-card-title class="headline">آیا از حذف کردن کاربر  {{ User.FullName }} از پرونده مطمئن هستید؟</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="CloseRemove"
                      >
                      Cancel
                      </v-btn>
                      <v-btn
                      color="blue darken-1"
                      text
                      @click="ConfirmRemove(User)"
                      >
                      OK
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      DialogAdd: false,
      DialogRemove: false,
      search: '',
      UserID: '',
      Password: '',
      IsActive: true,
      confirm_password: '',
      FirstName: '',
      LastName: '',
      FatherName: '',
      EmailAddress: '',
      NationalCode: '',
      BirthCertificateId: '',
      BirthDay: new Date().toISOString().substr(0, 10),
      CellPhoneNumber: '',
      TellNumber: '',
      Job: '',
      PostalCode: '',
      Type: 0,
      Address: '',
      Description: '',
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        { text: 'ردیف', value: 'radif' },
        { text: 'نام', value: 'FirstName' },
        { text: 'نام خانوادگی', value: 'LastName' },
        { text: 'کد ملی', value: 'NationalCode' },
        { text: 'همراه', value: 'CellPhoneNumber' },
        { text: 'فعالیت', value: 'actions' },
      ],
      editedIndex: -1,
      editedItem: {
        Password: '',
        IsActive: true,
        confirm_password: '',
        FirstName: '',
        LastName: '',
        FatherName: '',
        EmailAddress: '',
        NationalCode: '',
        BirthCertificateId: '',
        BirthDay: '',
        CellPhoneNumber: '',
        TellNumber: '',
        Job: '',
        PostalCode: '',
        Type: 0,
        Address: '',
        Description: '',
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),
    computed: {
      GetFolderById () {
        return this.$store.getters.GetFolder
      },
      GetAllUsers () {
        return this.$store.getters.GetAllUsers
      },
      GeAllUsersByFolderId () {
        return this.$store.getters.GetUsersByFolderId
      },
    },
    created () {
      this.initialize()
    },
    watch: {
      $route () {
        this.$store.dispatch('GetFolderFromServer', {
          Id: this.$route.params.Id,
        })
      },
    },
    methods: {
      initialize () {
        this.$store.dispatch('GetFolderFromServer', {
          Id: this.$route.params.Id,
        })
        this.$store.dispatch('GetAllUsersFromServer')
        this.$store.dispatch('GeUsersByFolderIdFromServer', this.$route.params.Id)
      },
      AddUser (item) {
        this.editedIndex = this.GetAllUsers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.DialogAdd = true
      },
      RemoveUser () {
        this.DialogRemove = true
      },
      AddUserConfirm () {
        const Motasaref = {
          FolderId: this.GetFolderById.Id,
          UserID: this.editedItem.Id,
        }
        this.$store.dispatch('AddUserToFolder', Motasaref)
        this.CloseAdd()
        this.initialize()
      },
      ConfirmRemove (User) {
        const UserAndFolder = {
          FolderId: this.$route.params.Id,
          UserID: User.Id,
        }
        this.$store.dispatch('DeleteUserFromFolder', UserAndFolder)
        this.DialogRemove = false
        this.initialize()
      },
      CloseAdd () {
        this.DialogAdd = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      CloseRemove () {
        this.DialogRemove = false
      },
    },
  }
</script>
