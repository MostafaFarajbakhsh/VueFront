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
      v-for="Letterr in FilterSerach"
      :key="Letterr.Id"
      >
        <v-card
          class="mx-2"
          max-width="1200"
          elevation="2"
          color="grey lighten-4"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
                عنوان: {{Letterr.Title}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               شماره نامه:  {{Letterr.LetterNumber}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               ارسال کننده نامه:  {{Letterr.SenderLetter}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               دریافت کننده نامه:  {{Letterr.ReciverLetter}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               نوع نامه:  {{Letterr.Type}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               نوع ارسال نامه:  {{Letterr.Transfer}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               ضمیمه  نامه:  {{Letterr.IsAttach}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
                رونوشت نامه:  {{Letterr.IsCopy}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
                وضعیت نامه:  {{Letterr.IsActive}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               زمان نامه:  {{Letterr.DateTimeLetter}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
                آدرس  نامه:  {{Letterr.Address}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               تاریخ انقضای  نامه:  {{Letterr.ExpireDateTime}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               زمان ویرایش نامه:  {{Letterr.UpdateDateTime}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               زمان ایجاد نامه:  {{Letterr.InsertDateTime}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               آدرس قفسه:  {{Letterr.PhysicalAddress}}
              </p>
              </v-col>
              <v-col
                cols="3"
                sm="3"
                class="py-2"
              >
              <p>
               توضیحات:  {{Letterr.Description}}
              </p>
              </v-col>
            </v-list-item-content>
            <!-- <v-list-item-avatar
              tile
              size="80"
              color="grey"
            ></v-list-item-avatar> -->
          </v-list-item>
          <!-- <v-card-actions>
            <v-btn
              outlined
              rounded
              text
            >
              Button
            </v-btn>
          </v-card-actions> -->
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
      GetAllLetters () {
        return this.$store.getters.GetAllLetters
      },
      FilterSerach () {
        return this.GetAllLetters.filter((letter) => {
          return letter.Title.match(this.search)
        })
      },
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      initialize () {
        this.$store.dispatch('GetAllLettersFromServer')
      },
    },
  }
</script>
