<template>
  <div class="select" v-click-outside="outside" @click="inside()">
    <div
      :class="[{ focus: showList }, { errors: $attrs.error }, 'multi-field']"
    >
      <slot @close="clickItem($event)" :value="value"></slot>
      <input
        v-model="setTextInput"
        ref="input"
        :class="[{ show: this.type === 'select' }, 'form__field']"
        type="text"
        @focus="onShowList()"
        @keyup.up="onKeyUp()"
        @keyup.down="onKeyDown()"
        @keyup.enter="onEnter()"
        @keyup.delete="onBackspace()"
      />
      <div class="select__icon" @click="closeIcon($event)">
        <i class="icon-arrow-top" :style="styleConfig"></i>
      </div>
      <slot name="label"></slot>
    </div>
    <Transition-Expand :time="0.5">
      <ul v-if="showList" ref="list" class="dropdown">
        <li
          class="select__item"
          v-for="(item, i) in search"
          :key="i"
          @click="clickItem(item)"
        >
          <slot
            name="list"
            :item="item"
            :params="{ isActive: isActive(i), isSelected: isSelected(item) }"
          ></slot>
        </li>
      </ul>
    </Transition-Expand>
  </div>
</template>

<script>
import TransitionExpand from "@/components/transition-expand";
export default {
  name: "field-select",

  inheritAttrs: false,

  provide: function() {
    return {
      clickItem: this.clickItem
    };
  },

  components: {
    TransitionExpand
  },

  props: {
    value: {
      default: () => [],
      type: [String, Array]
    },

    type: {
      default: "select",
      type: String
    },

    selectList: {
      default: () => [],
      type: Array
    },

    searchProp: {
      default: "",
      type: String
    },

    dropValue: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      showList: false,
      toggleBackspace: true,
      textInput: "",
      activeUser: null
    };
  },

  computed: {
    list() {
      return [
        (() => {
          if (this.dropValue) return this.$attrs.placeholder;
        })(),
        ...this.selectList
      ];
    },

    styleConfig() {
      return this.showList
        ? { transform: "translate(-50%, -50%) rotate(180deg)" }
        : {};
    },

    search() {
      if (this.searchProp) {
        return this.list.filter(item => {
          return item[this.searchProp]
            .toLowerCase()
            .includes(this.textInput.toLowerCase());
        });
      } else return this.list;
    },

    heightArrayElementList() {
      return Array.prototype.map.call(
        this.$refs.list.children,
        el => +window.getComputedStyle(el).height.slice(0, -2)
      );
    },

    heightElementList() {
      let marginAverage =
        (+window
          .getComputedStyle(this.$refs.list.children[0])
          ["marginTop"].slice(0, -2) +
          +window
            .getComputedStyle(this.$refs.list.children[0])
            ["marginBottom"].slice(0, -2)) /
        2;
      return this.heightArrayElementList
        .slice(0, this.activeUser ? this.activeUser - 1 : this.activeUser)
        .reduce((acc, el) => (acc += el + marginAverage), 0);
    },

    setTextInput: {
      get() {
        return this.textInput;
      },

      set(values) {
        this.textInput = values;
        this.toggleBackspace = false;
      }
    }
  },

  methods: {
    outside() {
      this.showList = false;
      this.$refs.input.blur();
      this.activeUser = null;
      this.textInput = "";
    },

    inside() {
      this.$refs.input.focus();
    },

    onShowList() {
      this.showList = true;
    },

    closeIcon(event) {
      if (this.showList) {
        event.stopPropagation();
        this.outside();
      }
    },

    onEnter() {
      if (this.activeUser !== null)
        this.clickItem(this.search[this.activeUser]);
    },

    onBackspace() {
      if (this.toggleBackspace && typeof this.value === "object") {
        this.$emit("input", this.value.slice(0, this.value.length - 1));
      }
      if (!this.textInput) this.toggleBackspace = true;
    },

    onKeyUp() {
      this.activeUser !== 0
        ? (this.activeUser -= 1)
        : (this.activeUser = this.search.length - 1);
      this.scrollUp();
    },

    onKeyDown() {
      this.activeUser !== this.search.length - 1
        ? (this.activeUser += 1)
        : (this.activeUser = 0);

      this.scrollUp();
    },

    scrollUp() {
      this.$refs.list.scrollTop = +this.heightElementList;
    },

    //TODO: переписать стукдуру users во Vuex на id или же придумать как прокидывать фк сюда

    clickItem(item) {
      switch (this.type) {
        case "select": {
          this.outside();
          if (item === this.$attrs.placeholder) {
            this.$emit("input", "");
            return;
          }
          this.$emit("input", item);
          break;
        }
        case "multiSelect": {
          const newValue = [...this.value];
          const isItem = newValue.indexOf(item);
          if (isItem !== -1) {
            newValue.splice(isItem, 1);
          } else {
            newValue.push(item);
          }
          this.$emit("input", newValue);
          break;
        }
        default:
          break;
      }
    },

    isSelected({ user_id }) {
      return Object.prototype.hasOwnProperty.call(this.value, user_id);
    },

    isActive(i) {
      return this.activeUser === i;
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  // .select__icon
  &__icon {
    position: relative;
    padding: 7px;
    font-size: 1.5rem;
    flex-shrink: 0;
    color: $text-dark;
    & i {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: 0.3s;
    }
  }

  //.select__item
  &__item {
    margin: 10px 0px 10px 5px;
  }
  //  'form__selected',
}

.show {
  position: absolute;
  left: -1000%;
  opacity: 0;
}
</style>
