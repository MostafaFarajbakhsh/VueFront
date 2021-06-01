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
      title='مدریت پرونده ها '
      class='px-2 py-2'
      >
    <template>
  <v-data-table
    :headers="headers"
    :items="GetAllFolders"
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
            mdi-folder-plus
            </v-icon>
              تشکیل پرونده
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
                  label="عنوان پوشه *"
                  v-model="editedItem.Title"
                ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      label="شماره پرونده*"
                      v-model="editedItem.Number"
                       hint="لطفا شماره  پرونده  را وارد کنید"
                    ></v-text-field>
                  </v-col>
              <v-col
                cols="12"
                sm="4"
              >
              <v-switch
               color="blue"
              v-model="editedItem.IsActive"
              :label="`وضعیت پوشه: ${editedItem.IsActive}`"
              ></v-switch>
              </v-col>
              <v-col
        cols="12"
        md="12"
      >
        <v-textarea
          name="input-7-1"
          label="توضیحات پرونده "
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
    <v-btn
      class="mx-2"
      fab
      small
      @click="OpenFolderItem(item)"
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
      Number: '',
      IsActive: true,
      // InsertDateTime: new Date().toISOString().substr(0, 10),
      Title: '',
      PhysicalAddress: '',
      Description: '',
      menu: false,
      menuexpiretime: false,
      modal: false,
      menu2: false,
      headers: [
        { text: 'ردیف', value: 'radif' },
        { text: ' عنوان پوشه', value: 'Title' },
        { text: 'شماره پرونده', value: 'Number' },
        { text: 'توضیحات', value: 'Description' },
        { text: 'آدرس قفسه', value: 'PhysicalAddress' },
        { text: 'فعالیت', value: 'actions' },
      ],
      editedIndex: -1,
      editedItem: {
        Number: '',
        IsActive: true,
        // InsertDateTime: new Date().toISOString().substr(0, 10),
        Title: '',
        PhysicalAddress: '',
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
        return this.editedIndex === -1 ? 'تشکیل پرونده' : 'ویرایش پرونده'
      },
      GetAllFolders () {
        return this.$store.getters.GetAllFolders
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
        this.$store.dispatch('GetAllFoldersFromServer')
      },

      editItem (item) {
        const result = this.GetAllFolders.find(s => {
          return s.Id === item.Id
        })
        this.editedIndex = this.GetAllFolders.indexOf(item)
        this.editedItem = Object.assign({}, result)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.GetAllFolders.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      OpenFolderItem (item) {
        this.$store.dispatch('OpenFolderFromServer', item)
      },
      // FolderDetail (item) {
      //   this.$store.dispatch('OpenFolderFromServer', item)
      // },
      deleteItemConfirm () {
        this.GetAllFolders.splice(this.editedIndex, 1)
        this.$store.dispatch('DeleteFolderFromServer', this.editedItem.Id)
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
          this.$store.dispatch('UpdateFolderFromServer', this.editedItem)
          this.initialize()
          Object.assign(this.GetAllFolders[this.editedIndex], this.editedItem)
        } else {
          const folder = {
            Number: this.editedItem.Number,
            InsertDateTime: this.editedItem.InsertDateTime,
            Title: this.editedItem.Title,
            PhysicalAddress: this.editedItem.PhysicalAddress,
            IsActive: this.editedItem.IsActive,
            Description: this.editedItem.Description,
          }
          this.editedItem = folder
          this.$store.dispatch('CreateFolderByForm', this.editedItem)
          this.initialize()
          this.GetAllFolders.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
