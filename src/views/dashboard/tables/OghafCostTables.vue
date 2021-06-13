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
      title='مدریت تعرفه اوقاف '
      class='px-2 py-2'
      >
    <template>
  <v-data-table
    :headers="headers"
    :items="GetAllOghafCosts"
    :search='search'
    sort-by="calories"
    class="elevation-1"
    :loading = !GetAllOghafCosts.length
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
            mdi-wallet-plus
            </v-icon>
              تعرفه جدید
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
                  label="عنوان تعرفه *"
                  v-model="editedItem.Title"
                ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label=" معبر"
                      type="number"
                      v-model="editedItem.Crossing"
                      suffix="متری"
                    ></v-text-field>
                  </v-col>
                    <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-select
                  :items="[
                  { text: 'صنعتی', value: 1 } , { text: 'تجاری', value: 2 }, { text: 'کشاورزی ', value: 3 } , { text: 'مسکونی ', value: 4 } ]"
                  v-model="editedItem.OghafCostType"
                  label="نوع کاربری"
                ></v-select>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label=" ارزش معاملاتی"
                      v-model="editedItem.TradingValue"
                      suffix="  تومان  "
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="  مساحت"
                      v-model="editedItem.Area"
                      suffix="متر"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label=" مال الاجاره"
                      v-model="editedItem.RentProperty"
                      suffix="  تومان  "
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label=" تصویب"
                      type="number"
                      v-model="editedItem.ConfirmDate"
                      prefix="  سال  "
                    ></v-text-field>
                  </v-col>
                   <v-col
                cols="12"
                sm="4"
              >
              <v-switch
               color="blue"
              v-model="editedItem.IsActive"
              :label="`وضعیت تعرفه: ${editedItem.IsActive}`"
              ></v-switch>
              </v-col>
              <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          name="input-2-1"
          label="توضیحات"
          v-model="editedItem.Description"
          value=""
        ></v-textarea>
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
            <v-card-title class="headline">آیا از حذف تعرفه {{ editItem.Title }} مطمئن هستید؟</v-card-title>
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
      dialogDelete: false,
      search: '',
      Crossing: '',
      IsActive: true,
      Title: '',
      Area: '',
      RentProperty: '',
      TradingValue: '',
      OghafCostType: 1,
      ConfirmDate: '',
      Description: '',
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        { text: 'ردیف', value: 'radif' },
        { text: 'عنوان', value: 'Title' },
        { text: 'معبر', value: 'Crossing' },
        { text: 'نوع کاربری', value: 'OghafCostType' },
        { text: 'سال تصویب ', value: 'ConfirmDate' },
        { text: 'ارزش معاملاتی ', value: 'TradingValue' },
        { text: 'مال الاجاره  ', value: 'RentProperty' },
        { text: 'تا مساحت ', value: 'Area' },
        { text: 'توضیحات', value: 'Description' },
        { text: 'فعالیت', value: 'actions' },
      ],
      editedIndex: -1,
      editedItem: {
        Crossing: '',
        IsActive: true,
        Title: '',
        OghafCostType: 1,
        ConfirmDate: '',
        Description: '',
        RentProperty: '',
        TradingValue: '',
        Area: '',
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
        return this.editedIndex === -1 ? 'تعرفه جدید' : 'ویرایش تعرفه'
      },
      GetAllOghafCosts () {
        return this.$store.getters.GetAllOghafCosts
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
        this.$store.dispatch('GetAllOghafCostsFromServer')
      },

      editItem (item) {
        const result = this.GetAllOghafCosts.find(s => {
          return s.Id === item.Id
        })
        this.editedIndex = this.GetAllOghafCosts.indexOf(item)
        this.editedItem = Object.assign({}, result)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.GetAllOghafCosts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.GetAllOghafCosts.splice(this.editedIndex, 1)
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
          const pofile = {
            Crossing: parseInt(this.editedItem.Crossing),
            Id: this.editedItem.Id,
            IsActive: this.editedItem.IsActive,
            Title: this.editedItem.Title,
            OghafCostType: this.editedItem.OghafCostType,
            ConfirmDate: parseInt(this.editedItem.ConfirmDate),
            Description: this.editedItem.Description,
            TradingValue: parseInt(this.editedItem.TradingValue),
            RentProperty: parseInt(this.editedItem.RentProperty),
            Area: this.editedItem.Area,
          }
          this.$store.dispatch('UpdateOghafCostFromServer', pofile)
          this.initialize()
          Object.assign(this.GetAllOghafCosts[this.editedIndex], this.editedItem)
        } else {
          const pofile = {
            Crossing: parseInt(this.editedItem.Crossing),
            IsActive: this.editedItem.IsActive,
            Title: this.editedItem.Title,
            OghafCostType: this.editedItem.OghafCostType,
            ConfirmDate: parseInt(this.editedItem.ConfirmDate),
            Description: this.editedItem.Description,
            TradingValue: parseInt(this.editedItem.TradingValue),
            RentProperty: parseInt(this.editedItem.RentProperty),
            Area: this.editedItem.Area,
          }
          this.editedItem = pofile
          this.$store.dispatch('CreateOghafCostByForm', pofile)
          this.initialize()
          // this.GetAllOghafCosts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
