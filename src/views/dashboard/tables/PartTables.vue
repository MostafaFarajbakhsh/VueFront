<template>
  <v-container
    id='regular-tables'
    fluid
    tag='section'
  >
    <!-- <base-v-component
    heading='مدیریت پوشه ها'
    link='components/simple-tables'
    /> -->

    <base-material-card
      title='مدریت قطعات زمین '
      class='px-2 py-2'
      >
    <template>
  <v-data-table
    :headers="headers"
    :items="GetAllLetters"
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
            mdi-home-plus
            </v-icon>
              قطعه جدید
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
                  label="عنوان قطعه"
                  v-model="editedItem.Title"
                   hint="لطفا عنوان  قطعه  را وارد کنید"
                ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="شماره قطعه"
                      v-model="editedItem.LetterNumber"
                       hint="لطفا شماره  قطعه  را وارد کنید"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="متراژ قطعه"
                      v-model="editedItem.LetterNumber"
                       hint="لطفا متراژ  قطعه  را وارد کنید"
                    ></v-text-field>
                  </v-col>
                    <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-text-field
                  label="شمالاً"
                  v-model="editedItem.Title"
                ></v-text-field>
                  </v-col>
                    <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-text-field
                  label="شرقاً"
                  v-model="editedItem.Title"
                ></v-text-field>
                  </v-col>
                    <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-text-field
                  label="جنوباً"
                  v-model="editedItem.Title"
                ></v-text-field>
                  </v-col>
                    <v-col
                cols="12"
                sm="6"
                md="3"
              >
                <v-text-field
                  label="غرباً"
                  v-model="editedItem.Title"
                ></v-text-field>
                  </v-col>
                   <v-col
              cols="3"
                sm="3"
                md="3"
                >
                <v-checkbox
      v-model="IsSanati"
      :label="`صنعتی: `"
    ></v-checkbox>
              </v-col>
                  <v-col
              cols="3"
                sm="3"
                md="3"
                >
                <v-checkbox
      v-model="IsZeraei"
      :label="`مزروعی: `"
    ></v-checkbox>
              </v-col>
                   <v-col
              cols="3"
                sm="3"
                md="3"
                >
                <v-checkbox
      v-model="IsTejari"
      :label="`تجاری: `"
    ></v-checkbox>
              </v-col>
                   <v-col
              cols="3"
                sm="3"
                md="3"
                >
                <v-checkbox
      v-model="IsMaskooni"
      :label="`مسکونی: `"
    ></v-checkbox>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
               <v-file-input
                v-model="utm1"
                show-size
                truncate-length="30"
                label="UTM1"
                outlined
                dense
              ></v-file-input>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-file-input
                v-model="utm2"
                show-size
                truncate-length="30"
                label="UTM2"
                outlined
                dense
              ></v-file-input>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-file-input
                v-model="utm3"
                show-size
                truncate-length="30"
                label="UTM3"
                outlined
                dense
              ></v-file-input>
                  </v-col>
               <v-col
              cols="12"
                sm="12"
                md="12"
                >
                <v-text-field
                  label="آدرس قطعه"
                  v-model="editedItem.Address"
                ></v-text-field>
              </v-col>
              <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          name="input-7-1"
          label="توضیحات قطعه"
          v-model="editedItem.Description"
          value=""
        ></v-textarea>
         <v-col
              cols="12"
                sm="12"
                md="12"
                >
                <v-text-field
                  label="آدرس فیزیکی"
                  v-model="editedItem.PhysicalAddress"
                ></v-text-field>
              </v-col>
      </v-col>
      <v-col
                cols="12"
                sm="4"
              >
              <v-switch
               color="blue"
              v-model="editedItem.IsAttach"
              :label="`وضعیت ضمیمه: ${editedItem.IsAttach == false}`"
              ></v-switch>
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
              <v-switch
               color="blue"
              v-model="editedItem.IsCopy"
              :label="`وضعیت رونوشت: ${editedItem.IsCopy}`"
              ></v-switch>
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
              <v-switch
               color="blue"
              v-model="editedItem.IsActive"
              :label="`وضعیت نامه: ${editedItem.IsActive}`"
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
            <v-card-title class="headline">آیا از حذف نامه {{ editedItem.FullName }} مطمئن هستید؟</v-card-title>
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
      IsSanati: true,
      IsTejari: false,
      IsZeraei: false,
      IsMaskooni: false,
      dialogDelete: false,
      search: '',
      LetterNumber: '',
      IsActive: true,
      IsAttach: false,
      IsCopy: true,
      IsExpirable: false,
      DateTimeLetter: new Date().toISOString().substr(0, 10),
      InsertDateTime: new Date().toISOString().substr(0, 10),
      ExpireDateTime: new Date().toISOString().substr(0, 10),
      // ExpireDateTime: this.DateTimeLetter.setMonth(this.DateTimeLetter.getMonth() + 1),
      Title: '',
      ReciverLetter: '',
      SenderLetter: '',
      RespectText: 'با سلام',
      PhysicalAddress: '',
      Type: 1,
      Address: '',
      Transfer: 1,
      Description: '',
      menu: false,
      menuexpiretime: false,
      modal: false,
      menu2: false,
      headers: [
        { text: 'ردیف', value: 'radif' },
        { text: 'عنوان', value: 'Title' },
        { text: 'شماره نامه', value: 'LetterNumber' },
        { text: 'ارسال کننده', value: 'SenderLetter' },
        { text: 'دریافت کننده', value: 'ReciverLetter' },
        { text: 'نوع نامه', value: 'Type' },
        { text: 'متن', value: 'Description' },
        // { text: 'رونوشت', value: 'IsCopy' },
        { text: 'آدرس قفسه', value: 'PhysicalAddress' },
        { text: 'فعالیت', value: 'actions' },
        { text: 'وضعیت', value: 'Transfer' },
      ],
      editedIndex: -1,
      editedItem: {
        LetterNumber: '',
        IsActive: true,
        IsAttach: false,
        IsCopy: true,
        ReciverLetter: '',
        SenderLetter: '',
        IsExpirable: false,
        Transfer: 1,
        DateTimeLetter: new Date().toISOString().substr(0, 10),
        InsertDateTime: new Date().toISOString().substr(0, 10),
        // ExpireDateTime: this.DateTimeLetter.setMonth(this.DateTimeLetter.getMonth() + 1),
        Title: '',
        RespectText: 'با سلام',
        PhysicalAddress: '',
        Type: 1,
        Address: '',
        Description: '',
        menu: false,
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
        return this.editedIndex === -1 ? 'نامه جدید' : 'ویرایش نامه'
      },
      GetAllLetters () {
        return this.$store.getters.GetAllLetters
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
        this.$store.dispatch('GetAllLettersFromServer')
      },

      editItem (item) {
        const result = this.GetAllLetters.find(s => {
          return s.Id === item.Id
        })
        this.editedIndex = this.GetAllLetters.indexOf(item)
        this.editedItem = Object.assign({}, result)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.GetAllLetters.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.GetAllLetters.splice(this.editedIndex, 1)
        // const pofile = {
        // Password: this.editedItem.Password,
        // IsActive: this.editedItem.IsActive,
        // Id: this.Id,
        // FirstName: this.editedItem.FirstName,
        // LastName: this.editedItem.LastName,
        // FatherName: this.editedItem.FatherName,
        // Username: this.editedItem.NationalCode,
        // EmailAddress: this.editedItem.EmailAddress,
        // NationalCode: this.editedItem.NationalCode,
        // BirthCertificateId: this.editedItem.BirthCertificateId,
        // BirthDay: this.editedItem.BirthDay,
        // CellPhoneNumber: this.editedItem.CellPhoneNumber,
        // TellNumber: this.editedItem.TellNumber,
        // Job: this.editedItem.Job,
        // PostalCode: this.PostalCode,
        // Type: this.editedItem.Type,
        // Address: this.editedItem.Address,
        // Description: this.editedItem.Description,
        // }
        // this.editedItem = pofile
        this.$store.dispatch('DeleteLetterFromServer', this.editedItem.Id)
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
          this.$store.dispatch('UpdateLetterFromServer', this.editedItem)
          this.initialize()
          Object.assign(this.GetAllLetters[this.editedIndex], this.editedItem)
        } else {
          const pofile = {
            LetterNumber: this.editedItem.LetterNumber,
            IsAttach: this.editedItem.IsAttach,
            IsCopy: this.editedItem.IsCopy,
            IsExpirable: this.editedItem.IsExpirable,
            DateTimeLetter: this.editedItem.DateTimeLetter,
            InsertDateTime: this.editedItem.InsertDateTime,
            ExpireDateTime: this.editedItem.ExpireDateTime,
            Title: this.editedItem.Title,
            Transfer: this.editedItem.Transfer,
            ReciverLetter: this.editedItem.ReciverLetter,
            SenderLetter: this.editedItem.SenderLetter,
            RespectText: this.editedItem.RespectText,
            PhysicalAddress: this.editedItem.PhysicalAddress,
            IsActive: this.editedItem.IsActive,
            Type: this.editedItem.Type,
            Address: this.editedItem.Address,
            Description: this.editedItem.Description,
          }
          this.editedItem = pofile
          this.$store.dispatch('CreateLetterByForm', this.editedItem)
          this.initialize()
          this.GetAllLetters.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
