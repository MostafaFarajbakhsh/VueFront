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
              ویرایش کاربر
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
                    label="نام"
                    class="purple-input"
                    v-model="GetAcountUser.FirstName"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="نام خانوادگی"
                    class="purple-input"
                    v-model="GetAcountUser.LastName"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="نام پدر"
                    class="purple-input"
                    v-model="GetAcountUser.FatherName"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="نام کاربری"
                    class="purple-input"
                    v-model="GetAcountUser.Username"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="رمز عبور"
                    type="password"
                    v-model="GetAcountUser.Password"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="ایمیل"
                    class="purple-input"
                    v-model="GetAcountUser.EmailAddress"
                  />
                </v-col>
 <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="کد ملی"
                    class="purple-input"
                    v-model="GetAcountUser.NationalCode"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="شماره شناسنامه"
                    v-model="GetAcountUser.BirthCertificateId"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="تاریخ تولد"
                    class="purple-input"
                    v-model="GetAcountUser.BirthDay"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="شماره همراه"
                    class="purple-input"
                    v-model="GetAcountUser.CellPhoneNumber"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="تلفن ثابت"
                    v-model="GetAcountUser.TellNumber"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="شغل"
                    class="purple-input"
                    v-model="GetAcountUser.Job"
                  />
                </v-col>
                 <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="کد پستی"
                    v-model="GetAcountUser.PostalCode"
                  />
                </v-col>
                 <v-col
                  cols="12"
                  sm="6"
                >
                <v-select
                  :items="[
                  { text: 'کاربر', value: 0 } , { text: 'کاربر ویژه', value: 100 }, { text: 'مدیر سیستم', value: 500 }, { text: 'برنامه نویس', value: 900 } ]"
                  v-model="GetAcountUser.Type"
                  label="نوع کاربر*"
                ></v-select>
              </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="آدرس"
                    class="purple-input"
                    v-model="GetAcountUser.Address"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="توضیحات"
                    v-model="GetAcountUser.Description"
                  />
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    @click="UpdateUserProfile()"
                  >
                    ویرایش
                  </v-btn>
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
              {{GetAcountUser.FullName}}
            </h3>

            <h4 class="display-1 font-weight-light mb-3 black--text">
              شماره تماس: {{GetAcountUser.CellPhoneNumber}}
            </h4>

            <p class="font-weight-light grey--text">
              آدرس : {{GetAcountUser.Address}}
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
      GetAcountUser () {
        return this.$store.getters.GetUser
      },
    },
    methods: {
      UpdateUserProfile () {
        const UpdateUser = {
          FirstName: this.GetAcountUser.FirstName,
          LastName: this.GetAcountUser.LastName,
          FatherName: this.GetAcountUser.FatherName,
          Username: this.GetAcountUser.Username,
          Password: this.GetAcountUser.Password,
          EmailAddress: this.GetAcountUser.EmailAddress,
          NationalCode: this.GetAcountUser.NationalCode,
          BirthCertificateId: this.GetAcountUser.BirthCertificateId,
          // BirthDay: this.BirthDay,
          CellPhoneNumber: this.GetAcountUser.CellPhoneNumber,
          TellNumber: this.GetAcountUser.TellNumber,
          Job: this.GetAcountUser.Job,
          PostalCode: this.GetAcountUser.PostalCode,
          Type: this.GetAcountUser.Type,
          Address: this.GetAcountUser.Address,
          Description: this.GetAcountUser.Description,
        }
        this.$store.dispatch('UpdateUserFromServer', UpdateUser)
      },
    },
  }
</script>
