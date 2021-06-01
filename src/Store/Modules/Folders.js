import Vue from 'vue'
import { router } from '../../main'

const state = {
  Folders: [],
  Folder: {},
}
const getters = {
  GetAllFolders (state) {
    return state.Folders
  },
  GetFolder (state) {
    return state.Folder
  },
}
const mutations = {
  SetAllFolders (state, Folders) {
    state.Folders = Folders
  },
  SetFolder (state, Folder) {
    state.Folder = Folder.Data
  },
}
const actions = {
  CreateFolderByForm (context, Folder) {
    Vue.http.post('Folders', Folder)
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
        router.push('/Dashboard/Folders')
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
  GetAllFoldersFromServer (context) {
    Vue.http.get('Folders')
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
        context.commit('SetAllFolders', data)
      })
  },
  UpdateFolderFromServer (Context, UpdateFolder) {
    Vue.http.patch('Folders', UpdateFolder)
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
      }
    })
  },
  GetFolderFromServer (context, Id) {
    Vue.http.get('Folders/' + Id.Id)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
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
        context.commit('SetFolder', data)
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
  DeleteFolderFromServer (context, Id) {
    Vue.http.delete('Folders/' + Id)
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
        router.push('/dashboard/folders')
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
  OpenFolderFromServer (context, Folder) {
    Vue.http.post('Folders/OpenFolder', Folder)
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
