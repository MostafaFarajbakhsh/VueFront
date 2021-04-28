import Vue from 'vue'
import { router } from '../../main'

const state = {
  Letters: [],
  Letter: {},
}
const getters = {
  GetAllLetters (state) {
    return state.Letters
  },
  GetLetter (state) {
    return state.Letter
  },
}
const mutations = {
  SetAllLetters (state, Letters) {
    state.Letters = Letters
  },
  SetLetter (state, Letter) {
    state.Letter = Letter
  },
}
const actions = {
  SignUpLetterByForm (context, Letter) {
    console.log(Letter)
    Vue.http.post('Letters', Letter).then(
      response => {
        if (
          response.status === 200 &&
          response.body.Lettername === Letter.NationalCode
        ) {
          this._vm.$toast.success(' اطلاعات ' + Letter.FirstName + ' ' + Letter.LastName + ' با موفقیت ثبت شد ', {
            position: 'bottom-right',
          })
          router.push('/dashboard/Letters')
        } else {
          this._vm.$toast.error(response.body, {
            position: 'bottom-right',
          })
        }
      },
      data => {
        console.log(data)
      },
    )
  },
  LoginByForm (context, Letter) {
    Vue.http
      .post('Letters/Login', Letter)
      // .then(response => {
      //   if (
      //     response.status === 200 &&
      //     response.body.Lettername === Letter.LetterName
      //   ) {
      //     // context.commit('SetLetter', response.body)
      //     if (response.body.Type === 900) {
      //       this._vm.$toast.success(
      //         'شما به عنوان برنامه نویس وارد سیستم شدید',
      //         {
      //           position: 'bottom-right',
      //         },
      //       )
      //     } else {
      //       this._vm.$toast.success('شما به عنوان مدیر وارد سیستم شدید', {
      //         position: 'bottom-right',
      //       })
      //     }
      //     router.push('/Dashboard')
      //   } else {
      //     this._vm.$toast.error(response.body, {
      //       position: 'bottom-right',
      //     })
      //   }
      // },
      // )
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.Lettername === Letter.LetterName) {
          context.commit('SetLetter', data)
          console.log(data)
          if (data.Type === 900) {
            this._vm.$toast.success(
                  'شما به عنوان برنامه نویس وارد سیستم شدید',
                  {
                    position: 'bottom-right',
                  },
                )
          } else {
                  this._vm.$toast.success('شما به عنوان مدیر وارد سیستم شدید', {
                    position: 'bottom-right',
                  })
                }
                router.push('/Dashboard')
        } else {
          this._vm.$toast.error(data, {
                  position: 'bottom-right',
                })
        }
      })
  },
  GetAllLettersFromServer (context) {
    Vue.http
      .get('Letters')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
        if (response.status === 0) {
          this._vm.$toast.error('شما به اینترنت دسترسی ندارید', {
            position: 'bottom-right',
          })
        }
      })
      .then(data => {
        context.commit('SetAllLetters', data)
      })
  },
  UpdateLetterFromServer (Context, UpdateLetter) {
    console.log(UpdateLetter)
    Vue.http.patch('Letters', UpdateLetter)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.Id === UpdateLetter.Id) {
        this._vm.$toast.success(
          'اطلاعات شماره نامه' + UpdateLetter.LetterNumber + ' با موفقیت ثبت شد ',
          {
            position: 'bottom-right',
          },
          router.push('/Dashboard/Letters'),
        )
      } else {
        this._vm.$toast.error(
          data,
          {
            position: 'bottom-right',
          },
        )
      }
    })
  },
  GetLetterFromServer (context, Lettername) {
    Vue.http
    .get('Letters/GetLetter', Lettername)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then(data => {
      context.commit('SetLetter', data)
    })
  },
  DeleteLetterFromServer (context, Letter) {
    console.log(Letter.Id)
    Vue.http.delete('Letters/' + Letter.Id)
    .then(response => {
      return response.json()
    })
    // .then(data => {
    //   if (data.Lettername === DeleteLetter.Lettername) {
    //     this._vm.$toast.success(
    //       ' اطلاعات ' + DeleteLetter.FirstName + ' ' + DeleteLetter.LastName + ' با موفقیت حذف شد ',
    //       {
    //         position: 'bottom-right',
    //       },
    //       router.push('/Dashboard/Letters'),
    //     )
    //   } else {
    //     this._vm.$toast.error(
    //       'اطلاعات شما حذف نشد',
    //       {
    //         position: 'bottom-right',
    //       },
    //     )
    //   }
    // })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
