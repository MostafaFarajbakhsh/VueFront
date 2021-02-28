import Vue from 'vue'
import { router } from '../../main'

const state = {
  Users: [],
}
const getters = {
  GetAllUsers (state) {
    return state.Users
  },
}
const mutations = {
  SetAllUsers (state, Users) {
    state.Users = Users
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
    console.log(User)
    Vue.http.post('Users/Login', User).then(
      response => {
        if (
          response.status === 200 &&
          response.body.Username === User.UserName
        ) {
          if (response.body.Type === 900) {
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
}

export default {
  state,
  getters,
  mutations,
  actions,
}
