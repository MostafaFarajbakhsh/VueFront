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
    ><v-card>
    <v-row justify-md="start">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="900px"
    >
      <template v-slot:activator="{ on, attrs }">
            <v-btn
      class="mx-2"
      dark
      tile
      v-bind="attrs"
      v-on="on"
      color="cyan"
    >
      <v-icon left>
       mdi-plus
      </v-icon>
      افزدون کاربر
    </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">افزدون کاربر</span>
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
                  v-model="FirstName"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="نام خانوادگی*"
                  v-model="LastName"
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
                  v-model="NationalCode"
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
                  v-model="FatherName"
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
                  v-model="BirthCertificateId"
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
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="BirthDay"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="BirthDay"
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
                      v-model="BirthDay"
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
                        @click="$refs.menu.save(BirthDay)"
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
                v-model="CellPhoneNumber"
                  label="شماره همراه"
                ></v-text-field>
              </v-col>
               <v-col
              cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                v-model="TellNumber"
                  label="تلفن ثابت"
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                v-model="EmailAddress"
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
                  v-model="PostalCode"
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
                sm="6"
                md="4"
                >
                <v-text-field
                v-model="Job"
                  label="شغل"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                label="گذرواژه*"
                v-model="password"
                type="password"
                :rules="[v => !!v || 'field is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                label="تائید گذرواژه*"
                v-model="confirm_password"
                type="password"
                :rules="[(password === confirm_password) || 'تکرار گذرواژه باید یکسان باشد']"
                ></v-text-field>
              </v-col>
               <v-col
              cols="12"
                sm="12"
                md="12"
                >
                <v-text-field
                  label="آدرس"
                  v-model="Address"
                ></v-text-field>
              </v-col>
                <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          name="input-7-1"
          label="توضیحات"
          v-model="Description"
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
                  v-model="Type"
                  label="نوع کاربر*"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
               <v-switch
               color="blue"
      v-model="IsActive"
      :label="`وضعیت کاربر: ${IsActive.toString()}`"
    ></v-switch>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mx-2"
            dark
            tile
            color="indigo"
            @click="dialog = false"
          >
            انصراف
          </v-btn>
          <v-btn
            class="mx-2"
            dark
            tile
            color="success"
            @click="SignUpUserByForm()"
          >
            ایجاد
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
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
        >
         <template
         slot="item.radif"
         scope="props"
         >
        {{ props.index + 1 }}
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
    </template></v-data-table>
      </v-card>
    </base-material-card>
    <div class='py-5' />
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        password: '',
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
        Udialog: false,
        Unotifications: false,
        Usound: true,
        Uwidgets: false,
        dialog: false,
        menu: false,
        modal: false,
        menu2: false,
        search: '',
        headers: [
          // {
          //   text: 'نام',
          //   align: 'start',
          //   sortable: false,
          //   value: 'name',
          // },
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
      }
    },
    methods: {
      SignUpUserByForm () {
        const pofile = {
          password: this.password,
          IsActive: this.IsActive,
          FirstName: this.FirstName,
          LastName: this.LastName,
          FatherName: this.FatherName,
          Username: this.NationalCode,
          EmailAddress: this.EmailAddress,
          NationalCode: this.NationalCode,
          BirthCertificateId: this.BirthCertificateId,
          BirthDay: this.BirthDay,
          CellPhoneNumber: this.CellPhoneNumber,
          TellNumber: this.TellNumber,
          Job: this.Job,
          PostalCode: this.PostalCode,
          Type: this.Type,
          Address: this.Address,
          Description: this.Description,
        }
        console.log(pofile)
        this.$store.dispatch('SignUpUserByForm', pofile)
      },
      editItem (item) {
        console.log(item.NationalCode)
      },
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
