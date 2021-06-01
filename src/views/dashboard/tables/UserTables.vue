<template>
  <v-container
    id='regular-tables'
    fluid
    tag='section'
  >
    <!-- <base-v-component
    heading='مدیریت کاربران'
    link='components/simple-tables'
    /> -->

    <base-material-card
      title='مدریت کاربران '
      class='px-2 py-2'
      >
    <template>
  <v-data-table
    :headers="headers"
    :items="GetAllUsers"
    :search='search'
    sort-by="calories"
    class="elevation-1"
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
          v-model="dialog"
          max-width="900px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              tile
              color="green"
            >
            <v-icon left>
            mdi-plus
            </v-icon>
              کاربر جدید
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="نام *"
                  v-model="editedItem.FirstName"
                ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="نام خانوادگی*"
                      v-model="editedItem.LastName"
                      hint="لطفا نام خانوادگی را وارد کنید"
                    ></v-text-field>
                  </v-col>
                  <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="*کدملی"
                  v-model="editedItem.NationalCode"
                  hint="لطفا کدملی را وارد کنید"
                ></v-text-field>
                  </v-col>
                  <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    label="نام پدر"
                    v-model="editedItem.FatherName"
                    hint="example of persistent helper text"
                  ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="شماره شناسنامه"
                      v-model="editedItem.BirthCertificateId"
                      hint="لطفا شماره شناسنامه را وارد کنید"
                    ></v-text-field>
                  </v-col>
                  <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-menu
                    ref="menu"
                    v-model="editedItem.menu"
                    :close-on-content-click="false"
                    :return-value.sync="BirthDay"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedItem.BirthDay"
                        label="تاریخ تولد"
                        prepend-icon="mdi-calendar"
                        readonly
                        :first-day-of-week="0"
                        locale="ir-fa"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedItem.BirthDay"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(editedItem.BirthDay)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  </v-col>
                   <v-col
              cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                v-model="editedItem.CellPhoneNumber"
                  label="شماره همراه"
                ></v-text-field>
              </v-col>
               <v-col
              cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                v-model="editedItem.TellNumber"
                  label="تلفن ثابت"
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                v-model="editedItem.EmailAddress"
                  label="ایمیل"
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                  label="کدپستی"
                  v-model="editedItem.PostalCode"
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                v-model="editedItem.Job"
                  label="شغل"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                label="گذرواژه*"
                v-model="editedItem.Password"
                type="password"
                :rules="[v => !!v || 'field is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                label="تائید گذرواژه*"
                v-model="editedItem.confirm_password"
                type="password"
                :rules="[(editedItem.Password === editedItem.confirm_password) || 'تکرار گذرواژه باید یکسان باشد']"
                ></v-text-field>
              </v-col>
               <v-col
              cols="12"
                sm="12"
                md="12"
                >
                <v-text-field
                  label="آدرس"
                  v-model="editedItem.Address"
                ></v-text-field>
              </v-col>
              <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          name="input-7-1"
          label="توضیحات"
          v-model="editedItem.Description"
          value=""
        ></v-textarea>
      </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                <v-select
                  :items="[
                  { text: 'کاربر', value: 0 } , { text: 'کاربر ویژه', value: 100 }, { text: 'مدیر سیستم', value: 500 }, { text: 'برنامه نویس', value: 900 } ]"
                  v-model="editedItem.Type"
                  label="نوع کاربر*"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
              <v-switch
               color="blue"
              v-model="editedItem.IsActive"
              :label="`وضعیت کاربر: ${editedItem.IsActive}`"
              ></v-switch>
              </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="mx-2"
                dark
                tile
                color="indigo"
                @click="close"
              >
                انصراف
              </v-btn>
              <v-btn
                class="mx-2"
                dark
                tile
                color="success"
                @click="save"
              >
                ذخیره
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
        v-model="dialogDelete"
        max-width="500px"
        >
          <v-card>
            <v-card-title class="headline">آیا از حذف پروفایل {{ editedItem.FullName }} مطمئن هستید؟</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              color="blue darken-1"
              text
              @click="closeDelete"
              >
              Cancel
              </v-btn>
              <v-btn
              color="blue darken-1"
              text
              @click="deleteItemConfirm"
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
      @click="editItem(item)"
      color="cyan"
    >
      <v-icon dark>
        mdi-pencil
      </v-icon>
    </v-btn>
      <v-btn
      class="mx-2"
      fab
      small
      @click="deleteItem(item)"
      color="red"
    >
      <v-icon dark>
        mdi-delete
      </v-icon>
    </v-btn>
    <v-btn
      class="mx-2"
      fab
      small
      @click="OpenUserFolderItem(item)"
      color="success"
    >
      <v-icon dark>
        mdi-open-in-app
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
</template>
    </base-material-card>
    <div class='py-5' />
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
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
        { text: 'شماره شناسنامه', value: 'BirthCertificateIdCard' },
        { text: 'تاریخ تولد', value: 'BirthDay' },
        { text: 'نوع کاربری', value: 'Type' },
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
      formTitle () {
        return this.editedIndex === -1 ? 'کاربر جدید' : 'ویرایش کاربر'
      },
      GetAllUsers () {
        return this.$store.getters.GetAllUsers
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$store.dispatch('GetAllUsersFromServer')
      },

      editItem (item) {
        const result = this.GetAllUsers.find(s => {
          return s.NationalCode === item.NationalCode
        })
        this.editedIndex = this.GetAllUsers.indexOf(item)
        this.editedItem = Object.assign({}, result)
        this.dialog = true
      },
      OpenUserFolderItem (item) {
        this.$store.dispatch('OpenUserFolderFromServer', item)
      },
      deleteItem (item) {
        this.editedIndex = this.GetAllUsers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.GetAllUsers.splice(this.editedIndex, 1)
        this.$store.dispatch('DeleteUserFromServer', this.editedItem)
        this.initialize()
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
        this.initialize()
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          this.$store.dispatch('UpdateUserFromServer', this.editedItem)
          this.initialize()
          Object.assign(this.GetAllUsers[this.editedIndex], this.editedItem)
        } else {
          const pofile = {
            Password: this.editedItem.Password,
            IsActive: this.editedItem.IsActive,
            FirstName: this.editedItem.FirstName,
            LastName: this.editedItem.LastName,
            FatherName: this.editedItem.FatherName,
            Username: this.editedItem.NationalCode,
            EmailAddress: this.editedItem.EmailAddress,
            NationalCode: this.editedItem.NationalCode,
            BirthCertificateId: this.editedItem.BirthCertificateId,
            BirthDay: this.editedItem.BirthDay,
            CellPhoneNumber: this.editedItem.CellPhoneNumber,
            TellNumber: this.editedItem.TellNumber,
            Job: this.editedItem.Job,
            PostalCode: this.PostalCode,
            Type: this.editedItem.Type,
            Address: this.editedItem.Address,
            Description: this.editedItem.Description,
          }
          this.editedItem = pofile
          this.$store.dispatch('SignUpUserByForm', this.editedItem)
          this.initialize()
          this.GetAllUsers.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
