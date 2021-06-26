import Vue from 'vue'
// import { router } from '../../main'

const state = {
  FolderAndUsers: [],
  // Folder: {},
  UsersByFolderId: [],
  UserByFolderId: {},
}
const getters = {
  GetAllFolderAndUsers (state) {
    return state.FolderAndUsers
  },
  // GetFolder (state) {
  //   return state.Folder
  // },
  GetUsersByFolderId (state) {
    return state.UsersByFolderId
  },
  GetUserByFolderId (state) {
    return state.UserByFolderId
  },
}
const mutations = {
  SetAllFolderAndUsers (state, FolderAndUsers) {
    state.FolderAndUsers = FolderAndUsers
  },
  // SetFolder (state, Folder) {
  //   state.Folder = Folder.Data
  // },
  SetUsersByFolderId (state, UsersByFolderId) {
    state.UsersByFolderId = UsersByFolderId
  },
  SetUserByFolderId (state, UserByFolderId) {
    state.UserByFolderId = UserByFolderId
  },
}
const actions = {
  AddUserToFolder (context, Motasaref) {
    Vue.http.post('FolderAndUser', Motasaref)
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
  GetAllFolderAndUsersFromServer (context) {
    Vue.http.get('FolderAndUser')
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
      if (response.status === 200) {
        this._vm.$toast.success('متصرفان پرونده با موفقیت باز یابی شد', {
          position: 'bottom-right',
        })
      }
    })
    .then(data => {
      console.log(data)
      context.commit('SetAllFolderAndUsers', data)
    })
  },
  GeUsersByFolderIdFromServer (context, Id) {
    Vue.http.get('FolderAndUser/GetUsersByFolderId/' + Id)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
      if (response.status === 200) {
        this._vm.$toast.success('متصرفان پرونده با موفقیت باز یابی شد', {
          position: 'bottom-right',
        })
      }
    })
    .then(data => {
      context.commit('SetUsersByFolderId', data)
    })
  },
  DeleteUserFromFolder (context, UserAndFolder) {
    Vue.http.delete('FolderAndUser/RemoveUser/' + UserAndFolder.FolderId + '/' + UserAndFolder.UserID)
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
