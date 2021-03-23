import Vue from 'vue'
import { router } from '../../main'

const state = {
  Users: [],
  User: {},
}
const getters = {
  GetAllUsers (state) {
    return state.Users
  },
  GetUser (state) {
    return state.User
  },
}
const mutations = {
  SetAllUsers (state, Users) {
    state.Users = Users
  },
  SetUser (state, user) {
    state.User = user
  },
}
const actions = {
  SignUpUserByForm (context, User) {
    Vue.http.post('Users', User).then(
      response => {
        if (
          response.status === 200 &&
          response.body.Username === User.NationalCode
        ) {
          this._vm.$toast.success('ثبت نام با موفقیت انجام شد ', {
            position: 'bottom-right',
          })
          router.push('/dashboard/users')
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
  LoginByForm (context, User) {
    Vue.http
      .post('Users/Login', User)
      // .then(response => {
      //   if (
      //     response.status === 200 &&
      //     response.body.Username === User.UserName
      //   ) {
      //     // context.commit('SetUser', response.body)
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
        if (data.Username === User.UserName) {
          context.commit('SetUser', data)
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
  GetAllUsersFromServer (context) {
    Vue.http
      .get('Users')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then(data => {
        context.commit('SetAllUsers', data)
      })
  },
  UpdateUserFromServer (Context, UpdateUser) {
    Vue.http.put('Users', UpdateUser)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.Username === UpdateUser.Username) {
        this._vm.$toast.success(
          'اطلاعات شما با موفقیت ویرایش شد',
          {
            position: 'bottom-right',
          },
        )
      } else {
        this._vm.$toast.error(
          'اطلاعات شما ویرایش نشد',
          {
            position: 'bottom-right',
          },
        )
      }
    })
  },
  GetUserFromServer (context, Username) {
    Vue.http
    .get('Users/GetUser', Username)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then(data => {
      context.commit('SetUser', data)
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
