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
  CreateLetterByForm (context, Letter) {
    Vue.http.post('Letters', Letter)
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
    Vue.http.patch('Letters', UpdateLetter)
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
        router.push('/Dashboard/letters')
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
  DeleteLetterFromServer (context, Id) {
    Vue.http.post('Letters/' + Id)
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
        router.push('/Dashboard/letters')
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
  OpenLetterFromServer (context, Letter) {
    Vue.http.post('Letters/OpenFolder', Letter)
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
