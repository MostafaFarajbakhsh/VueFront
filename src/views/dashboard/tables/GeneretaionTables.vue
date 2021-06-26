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
      title='خاندان سفیداری '
      class='px-2 py-2'
      >
    <template>
  <v-data-table
    :headers="headers"
    :items="GetAllGenerations"
    :search='search'
    sort-by="calories"
    class="elevation-1"
    :loading = !GetAllGenerations.length
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
            mdi-account-multiple-plus
            </v-icon>
              نسل جدید
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
                <v-autocomplete
                  :items="GetAllUsers"
                  v-model="editedItem.UserID"
                  item-text="FullName"
                  item-value="Id"
                  auto-select-first
                  clearable
                  label="نام و نام خانوادگی"
                ></v-autocomplete>
                  </v-col>
                    <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-autocomplete
                  :items="[
                  { text: 'موسس', value: 0 } , { text: 'نسل اول', value: 1 }, { text: 'نسل دوم ', value: 2 },
                  { text: 'نسل سوم', value: 3 }, { text: 'نسل چهارم ', value: 4 }, { text: 'نسل پنجم', value: 5 },
                  { text: 'نسل ششم ', value: 6 }, { text: 'نسل هفتم', value: 7 }, { text: 'نسل هشتم ', value: 8 },
                  { text: 'نسل نهم ', value: 9 }, { text: 'نسل دهم', value: 10 }]"
                  auto-select-first
                  v-model="editedItem.Gen"
                  clearable
                  label="نسل"
                ></v-autocomplete>
                  </v-col>
                          <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-autocomplete
                  :items="GetAllUsers"
                  v-model="editedItem.PreGenId"
                  item-text="FullName"
                  item-value="Id"
                  auto-select-first
                  clearable
                  label="فرزند"
                ></v-autocomplete>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="سهم"
                      v-model="editedItem.Quota"
                    ></v-text-field>
                  </v-col>
              <v-col
                cols="12"
                sm="4"
              >
              <v-switch
               color="blue"
              v-model="editedItem.IsDead"
              :label="` وضعیت حیات: ${editedItem.IsDead}`"
              ></v-switch>
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
              <v-switch
               color="blue"
              v-model="editedItem.IsActive"
              :label="` وضعیت : ${editedItem.IsActive}`"
              ></v-switch>
              </v-col>
              <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          name="input-7-1"
          label="توضیحات "
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
            <v-card-title class="headline">آیا از حذف نسل {{ editedItem.Description }} مطمئن هستید؟</v-card-title>
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
      <router-link
        :to="{
          name: 'مدیریت پرونده',
          params: { Id: item.Id },
        }"
      >
        <v-btn
      class="mx-2"
      fab
      small
      color="warning"
    >
      <v-icon dark>
        mdi-open-in-new
      </v-icon>
    </v-btn>
      </router-link>
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
      PreGenId: '',
      IsActive: true,
      IsDead: false,
      Gen: '',
      Quota: '',
      Description: '',
      menu: false,
      menuexpiretime: false,
      modal: false,
      menu2: false,
      headers: [
        { text: 'ردیف', value: 'radif' },
        { text: 'تعداد سهم', value: 'Quota' },
        { text: 'توضیحات', value: 'Description' },
        { text: 'وضعیت حیات', value: 'IsDead' },
        { text: 'فعالیت', value: 'actions' },
      ],
      editedIndex: -1,
      editedItem: {
        IsActive: true,
        PreGenId: '',
        IsDead: '',
        Quota: '',
        Gen: '',
        UserID: '',
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
        return this.editedIndex === -1 ? 'نسل جدید' : 'ویرایش نسل'
      },
      GetAllGenerations () {
        return this.$store.getters.GetAllGenerations
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
        this.$store.dispatch('GetAllGenerationsFromServer')
        this.$store.dispatch('GetAllUsersFromServer')
      },

      editItem (item) {
        const result = this.GetAllGenerations.find(s => {
          return s.Id === item.Id
        })
        this.editedIndex = this.GetAllGenerations.indexOf(item)
        this.editedItem = Object.assign({}, result)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.GetAllGenerations.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        this.GetAllGenerations.splice(this.editedIndex, 1)
        this.$store.dispatch('DeleteGenerationFromServer', this.editedItem.Id)
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
          this.$store.dispatch('UpdateGenerationFromServer', this.editedItem)
          this.initialize()
          Object.assign(this.GetAllGenerations[this.editedIndex], this.editedItem)
        } else {
          this.editedItem.Gen = parseInt(this.editedItem.Gen)
          this.$store.dispatch('CreateGenerationByForm', this.editedItem)
          this.initialize()
        }
        this.close()
      },
    },
  }
</script>
