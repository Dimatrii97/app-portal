<template>
  <div @blur.capture="handleBlur($event)" class="select">
    <button
      :class="classList"
      @click="toggleOptions()"
      @keyup.up.down.prevent="showOptions()"
      @focus="isFocus = true"
      @blur="isFocus = false"
      type="button"
    >
      <slot name="selected" :value="value">
        <p v-if="value == null || value.length" class="select__header">
          {{ value }}
        </p>
      </slot>
      <input
        v-model="textInput"
        ref="input"
        :class="['form__field']"
        :readonly="type === 'select'"
        @keyup.up.prevent="onKeyUp"
        @keyup.down.prevent="onKeyDown"
        @keydown.up.down.prevent
        @keydown.enter.esc.prevent="onEnter()"
        @keyup.space.prevent=""
        type="text"
        tabindex="-1"
      />
      <div class="select__icon">
        <i :style="styleConfig" class="icon-arrow-top"></i>
      </div>
      <slot name="label"></slot>
    </button>
    <Transition-Expand :time="0.5">
      <ul
        v-show="optionsVisible"
        ref="options"
        @keyup.up.prevent="onKeyUp"
        @keyup.down.prevent="onKeyDown"
        @keydown.enter.esc.prevent="onEnter()"
        class="dropdown"
        tabindex="-1"
      >
        <li
          v-for="(item, i) in searchOptions"
          :key="i"
          @click="clickItem(item)"
          class="select__item"
        >
          <slot name="list" :item="item" :params="getSlotParams(i, item)">
            <div
              :class="[
                'dropdown__item',
                { active: isActive(i) },
                { selected: isSelected(item) }
              ]"
            >
              {{ item }}
            </div>
          </slot>
        </li>
      </ul>
    </Transition-Expand>
  </div>
</template>

<script>
import TransitionExpand from '@/components/transition-expand'
export default {
  name: 'FieldSelect',

  inheritAttrs: false,

  components: {
    TransitionExpand
  },

  props: {
    value: {
      type: [String, Array, Number],
      default: null
    },
    error: Boolean,
    search: [Boolean, Object],
    dropValue: Boolean,
    noClose: Boolean,
    options: {
      default: () => [],
      type: Array
    },
    type: {
      default: 'select',
      type: String
    }
  },

  data() {
    return {
      optionsVisible: false,
      toggleBackspace: true,
      isFocus: false,
      activeIndexOptions: null,
      searchPatern: ''
    }
  },

  computed: {
    addDropValue() {
      if (this.dropValue) {
        let copySelectList = [...this.options]
        copySelectList.unshift(this.$attrs.placeholder)
        return copySelectList
      }
      return this.options
    },

    searchOptions() {
      if (this.search) {
        if (typeof this.search === 'object') {
          return this.addDropValue.filter(item => {
            return item[this.search.property]
              .toLowerCase()
              .includes(this.searchPatern.toLowerCase())
          })
        }
        return this.addDropValue.filter(item => {
          return item.toLowerCase().includes(this.searchPatern.toLowerCase())
        })
      } else return this.addDropValue
    },

    heightArrayElementList() {
      return Array.prototype.map.call(
        this.$refs.options.children,
        el => +window.getComputedStyle(el).height.slice(0, -2)
      )
    },

    heightElementList() {
      let marginAverage =
        (+window
          .getComputedStyle(this.$refs.options.children[0])
          ['marginTop'].slice(0, -2) +
          +window
            .getComputedStyle(this.$refs.options.children[0])
            ['marginBottom'].slice(0, -2)) /
        2
      return this.heightArrayElementList
        .slice(
          0,
          this.activeIndexOptions
            ? this.activeIndexOptions - 1
            : this.activeIndexOptions
        )
        .reduce((acc, el) => (acc += el + marginAverage), 0)
    },

    styleConfig() {
      return this.optionsVisible
        ? { transform: 'translate(-50%, -50%) rotate(180deg)' }
        : {}
    },
    focus() {
      return this.optionsVisible || this.isFocus
    },

    classList() {
      return [{ focus: this.focus }, { errors: this.error }, 'multi-field']
    },

    textInput: {
      get() {
        return this.searchPatern
      },

      set(values) {
        this.searchPatern = values
        this.toggleBackspace = false
      }
    }
  },

  methods: {
    handleBlur(e) {
      if (this.$el.contains(e.relatedTarget)) return
      this.hideOptions()
    },

    toggleOptions() {
      this.optionsVisible ? this.hideOptions() : this.showOptions()
    },
    async showOptions() {
      this.optionsVisible = true
      await this.$nextTick()
      this.$refs.input.focus()
    },
    hideOptions() {
      this.optionsVisible = false
      this.searchPatern = ''
      this.activeIndexOptions = null
    },

    onEnter() {
      if (this.activeIndexOptions !== null)
        this.clickItem(this.searchOptions[this.activeIndexOptions])
    },

    onBackspace() {
      if (this.toggleBackspace && typeof this.value === 'object') {
        this.$emit('input', this.value.slice(0, this.value.length - 1))
      }
      if (!this.searchPatern) this.toggleBackspace = true
    },

    onKeyUp() {
      this.activeIndexOptions !== 0
        ? (this.activeIndexOptions -= 1)
        : (this.activeIndexOptions = this.searchOptions.length - 1)
      this.scrollUp()
    },

    onKeyDown() {
      this.activeIndexOptions !== this.searchOptions.length - 1
        ? (this.activeIndexOptions += 1)
        : (this.activeIndexOptions = 0)

      this.scrollUp()
    },

    scrollUp() {
      this.$refs.options.scrollTop = +this.heightElementList
    },

    //TODO: переписать стукдуру users во Vuex на id или же придумать как прокидывать фк сюда

    clickItem(item) {
      if (this.type === 'select') {
        if (item.value === this.$attrs.placeholder) {
          this.$emit('input', '')
          return
        }
        this.$emit('input', item)
      } else {
        const newValue = [...this.value]
        const isItem = newValue.indexOf(item)
        if (isItem !== -1) {
          newValue.splice(isItem, 1)
        } else {
          newValue.push(item)
        }
        this.$emit('input', newValue)
      }
      if (!this.noClose) {
        this.hideOptions()
      }
    },

    isSelected(item) {
      if (Array.isArray(this.value)) {
        return this.value.includes(item)
      } else {
        return this.value == item
      }
    },

    isActive(i) {
      return this.activeIndexOptions === i
    },

    getSlotParams(i, item) {
      return { isActive: this.isActive(i), isSelected: this.isSelected(item) }
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  // .select__icon
  &__icon {
    position: absolute;
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
</style>
