export const state = () => ({
  list: [],
  userChoice: [],
  downloads: 0,
  isFetchingPptx: false,
  isDownloads: false,
  currentRoute: null,
  tasksAlerts: [],
  taskList: [],
  

})

export const mutations = {
  updateList(state, payload) {
    state.list = payload
  },
  appendList(state, payload) {
    state.list.push(payload)
  },
  updateUserChoiceList(state, payload) {
    state.userChoice = payload
  },
  appendUserChoice(state, payload) {
    state.userChoice.push(payload)
  },
  deleteUserChoice(state, payload) {
    state.userChoice.splice(payload, 1)
  },
  deleteListItem(state, payload) {
    state.list.splice(payload, 1)
  },
  changeDownloadCount(state) {
    state.downloads++;
  },
  changeDownloadStatus(state) {
    state.isFetchingPptx = !state.isFetchingPptx
  },
  activateDownloads(state) {
    state.isDownloads = !state.isDownloads
  },
  changeCurrentRoute(state, payload) {
    state.currentRoute = payload
  },
  addTaskAlert(state, payload) {
    
    this._vm.$set(state.tasksAlerts, state.tasksAlerts.length, payload)
  },
  updateTask(state,payload){
    let status = payload.status
    let index = payload.index

    if (status == "SUCCESS"){
      state.taskList[index].status = "done"
    }
    else if (status == "FAILURE"){
      state.taskList[index].status = "failed"
    }
    else if (status == "RETRY"){
      state.taskList[index].status = "retry"
    }
  },
  deleteTaskAlert(state, payload) {
    state.tasksAlerts.splice(payload, 1);
  },
  addTask(state, payload) {
    var date = new Date()

    var container = {
      'taskID': payload.taskID,
      'sections':payload.sections,
      'status': 'started',
      'created': date.toLocaleDateString('en-GB', {
        timeZone: 'Europe/Brussels',
        hour:'numeric',
        minute:'numeric',
        hour12: false
      })
    };


    state.taskList.push(container);

  },


}

export const actions = {
  updateList: ({ commit }, payload) => {
    commit('updateList', payload);
  },
  appendList: ({ commit }, payload) => {
    commit('appendList', payload);
  },
  appendUserChoice: ({ commit }, payload) => {
    commit('appendUserChoice', payload);
  },
  updateUserChoiceList({ commit }, payload) {
    commit('updateUserChoiceList', payload);
  },
  deleteUserChoice({ commit }, payload) {
    commit('deleteUserChoice', payload);
  },
  updateTask({commit}, payload){
    commit('updateTask', payload)
  },
  deleteListItem({ commit }, payload) {
    commit('deleteListItem', payload);
  },
  async sendTask({ commit }) {

    let onBoardingDeck = JSON.stringify({ "sections": this.state.userChoice })
    commit('changeDownloadCount');



    var config = {


      headers: {
        'Content-Type': 'application/json',

      },

    };


    const send = await this.$axios.$post('/v1/pptxjob', onBoardingDeck, config)
      .then((res) => {

        commit('changeDownloadStatus');
        commit('addTaskAlert', res.taskID);
        commit('addTask', res)

      });


  }
}