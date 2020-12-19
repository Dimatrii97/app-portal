export default {
  namespaced: true,
  state: {
    navlist: {
      root: {
        ruName: "Главная",
        to: "/home",
        icon: "graph"
      },
      taskList: {
        ruName: "Список задач",
        to: "/calendar",
        icon: "calendar"
      },
      messages: {
        ruName: "Сообщения",
        to: "/chat",
        icon: "mail"
      },
      newTask: {
        ruName: "Поставить новую задачу",
        to: "/newTasks",
        icon: "new-tasks"
      },
      Docs: {
        ruName: "Документы",
        to: "/docs",
        icon: "file"
      }
    },
    additionalNavList: {
      user: {
        ruName: "Пользователь",
        to: "/profile",
        icon: "user"
      },
      output: {
        ruName: "Выйти",
        to: "",
        icon: "out",
        event: "outUser"
      }
    },
    mapDocumentTypeSort: {
      Устав: 0,
      Приказ: 1,
      Протокол: 2,
      Журнал: 3,
      Форма: 4,
      Акт: 5,
      Табель: 6,
      "": -1
    },
    mapTypeSort: {
      Exel: 0,
      Word: 1
    },
    theader: {
      name: {
        name: "Название",
        sort: "default"
      },
      documentType: {
        name: "Тип документа",
        sort: "default"
      },
      type: {
        name: "Файл",
        sort: "default"
      },
      date: {
        name: "Дата публикации",
        sort: "default"
      },
      update: {
        name: "Дата изменения",
        sort: "default"
      }
    }
  },
  getters: {
    getNavlist(state, _, __, getters) {
      let classNameMessage = getters["messages/getClassNameforNavList"];
      let countOfUnreadMessages = getters["messages/countOfUnreadMessages"];
      let classNameTasks = getters["tasks/getClassNameforNavList"];
      let getCountOfUnreadTasks = getters["tasks/getCountOfUnreadTasks"];
      state.navlist.messages.className = classNameMessage;
      state.navlist.taskList.className = classNameTasks;
      if (countOfUnreadMessages)
        state.navlist.messages.dataAttribute = countOfUnreadMessages;
      if (getCountOfUnreadTasks)
        state.navlist.taskList.dataAttribute = getCountOfUnreadTasks;
      if (!getters["isSizeDesktop"])
        return Object.values({ ...state.navlist, ...state.additionalNavList });
      return Object.values(state.navlist);
    },
    getMapTypeDocSort: state => state.mapTypeDocSort,
    getMapTypeSort: state => state.mapTypeSort
  }
};
