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
    state.User = user.Data
  },
}
const actions = {
  SignUpUserByForm (context, User) {
    Vue.http.post('Users', User)
    .then(response => {
      return response.json()
    })
    .then(data => {
    if (data.IsSuccessful === true) {
      if (data.InformationMessages !== null) {
        data.InformationMessages.forEach(element => {
          this._vm.$toast.success(
            element,
            {
              position: 'bottom-right',
            },
          )
        })
      }
      router.push('/dashboard/users')
    } else {
      if (data.ErrorMessages !== null) {
        data.ErrorMessages.forEach(element => {
          this._vm.$toast.error(element, {
            position: 'bottom-right',
          })
        })
      }
      if (data.AddInformationMessage !== null) {
        data.AddInformationMessage.forEach(element => {
          this._vm.$toast.warning(element, {
            position: 'bottom-right',
          })
        })
      }
    }
  })
  },
  LoginByForm (context, User) {
    Vue.http
      .post('Users/Login', User)
      .then(response => {
        return response.json()
      })
      .then(data => {
        context.commit('SetUser', data)
      if (data.IsSuccessful === true) {
        if (data.InformationMessages !== null) {
          data.InformationMessages.forEach(element => {
            this._vm.$toast.success(
              element,
              {
                position: 'bottom-right',
              },
            )
          })
        }
        router.push('/dashboard')
      } else {
        if (data.ErrorMessages !== null) {
          data.ErrorMessages.forEach(element => {
            this._vm.$toast.error(element, {
              position: 'bottom-right',
            })
          })
        }
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
        if (response.status === 0) {
          this._vm.$toast.error('شما به اینترنت دسترسی ندارید', {
            position: 'bottom-right',
          })
        }
      })
      .then(data => {
        context.commit('SetAllUsers', data)
      })
  },
  UpdateUserFromServer (Context, UpdateUser) {
    Vue.http.patch('Users', UpdateUser)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.IsSuccessful === true) {
        if (data.InformationMessages !== null) {
          data.InformationMessages.forEach(element => {
            this._vm.$toast.success(
              element,
              {
                position: 'bottom-right',
              },
            )
          })
        }
        router.push('/dashboard/users')
      } else {
        if (data.ErrorMessages !== null) {
          data.ErrorMessages.forEach(element => {
            this._vm.$toast.error(element, {
              position: 'bottom-right',
            })
          })
        }
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
  DeleteUserFromServer (context, user) {
    Vue.http.delete('Users/' + user.Id)
    .then(response => {
      return response.json()
    })
    .then(data => {
    if (data.IsSuccessful === true) {
      if (data.InformationMessages !== null) {
        data.InformationMessages.forEach(element => {
          this._vm.$toast.success(
            element,
            {
              position: 'bottom-right',
            },
          )
        })
      }
      router.push('/dashboard/users')
    } else {
      if (data.ErrorMessages !== null) {
        data.ErrorMessages.forEach(element => {
          this._vm.$toast.error(element, {
            position: 'bottom-right',
          })
        })
      }
    }
  })
  },
  OpenUserFolderFromServer (context, User) {
    Vue.http.post('Users/OpenFolder', User)
    .then(response => {
      return response.json()
    })
    .then(data => {
      if (data.IsSuccessful === true) {
        if (data.InformationMessages !== null) {
          data.InformationMessages.forEach(element => {
            this._vm.$toast.success(
              element,
              {
                position: 'bottom-right',
              },
            )
          })
        }
      } else {
        if (data.ErrorMessages !== null) {
          data.ErrorMessages.forEach(element => {
            this._vm.$toast.error(element, {
              position: 'bottom-right',
            })
          })
        }
        if (data.WarningMessages !== null) {
          data.WarningMessages.forEach(element => {
            this._vm.$toast.warning(element, {
              position: 'bottom-right',
            })
          })
        }
      }
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
