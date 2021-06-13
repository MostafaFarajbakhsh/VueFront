import Vue from 'vue'
import { router } from '../../main'

const state = {
  OghafCosts: [],
  OghafCost: {},
}
const getters = {
  GetAllOghafCosts (state) {
    return state.OghafCosts
  },
  GetOghafCost (state) {
    return state.OghafCost
  },
}
const mutations = {
  SetAllOghafCosts (state, OghafCosts) {
    state.OghafCosts = OghafCosts
  },
  SetOghafCost (state, OghafCost) {
    state.OghafCost = OghafCost
  },
}
const actions = {
  CreateOghafCostByForm (context, OghafCost) {
    Vue.http.post('OghafCost', OghafCost)
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
  GetAllOghafCostsFromServer (context) {
    Vue.http
      .get('OghafCost')
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
        context.commit('SetAllOghafCosts', data)
      })
  },
  UpdateOghafCostFromServer (Context, UpdateOghafCost) {
    console.log(UpdateOghafCost)
    Vue.http.patch('OghafCost', UpdateOghafCost)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
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
  GetOghafCostFromServer (context, OghafCostname) {
    Vue.http
    .get('OghafCosts/GetOghafCost', OghafCostname)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then(data => {
      context.commit('SetOghafCost', data)
    })
  },
  DeleteOghafCostFromServer (context, Id) {
    Vue.http.post('OghafCosts/' + Id)
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
        router.push('/Dashboard/OghafCosts')
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
  OpenOghafCostFromServer (context, OghafCost) {
    Vue.http.post('OghafCosts/OpenFolder', OghafCost)
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
