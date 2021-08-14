<template>
  <div class="tasks-list">
    <div class="header">
      <h2 class="main-title">Менеджмент</h2>
      <div class="views">
        <span class="sub-title">
          Список отоброжений:
        </span>
        <div class="btn-group small">
          <button class="btn">
            <span class="icon-">k</span>
          </button>
          <button class="btn">
            <span class="icon-">b</span>
          </button>
          <button class="btn">
            <span class="icon-">n</span>
          </button>
          <button class="btn">
            <span class="icon-">f</span>
          </button>
        </div>
      </div>
    </div>
    <component :is="componentId"></component>
  </div>
</template>

<script>
const componentMap = {
  b: 'b',
  k: 'k'
}

export default {
  name: 'TasksList',
  data() {
    return {
      viewState: ''
    }
  },
  computed: {
    componentId() {
      return componentMap[this.viewState]
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.header {
}
.main-title {
  font-size: 1.5em;
}
.tasks-list {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    //color: red;
  }
  .sub-title {
    font-size: 14px;
    font-weight: 600;
    color: #212529b9;
  }

  .views {
    display: flex;
    align-items: center;
    .btn-group {
      margin-left: 1em;
    }
  }
  .btn-group {
    border: 1.5px solid rgb(202, 202, 202);
    border-radius: 0.5em;
    .btn + .btn {
      border-left: 1px solid rgb(202, 202, 202);
    }
  }
  .small {
  }
  .btn {
    display: inline-block;
    //line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.2em 0.5em;
    font-size: 1em;
  }
  .icon- {
  }
}
</style>
