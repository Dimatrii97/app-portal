<template>
  <div class="radio-bnt">
    <label v-for="(name, i) in value" :key="i" :for="name" class="wrap-btn">
      <input
        v-model="setValue"
        :id="name"
        :value="name"
        class="radio"
        type="radio"
        name="radio"
      />
      <span class="cr"></span>
      <span class="text">{{ name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'FieldRadio',
  props: {
    value: Array
  },
  data() {
    return {
      active: ''
    }
  },
  computed: {
    setValue: {
      get() {
        return this.active
      },
      set(value) {
        this.active = value
        this.$emit('input', value)
      }
    }
  },
  mounted() {
    this.active = this.value[0]
  }
}
</script>

<style lang="scss" scoped>
.wrap-btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin: 12px 0;
  cursor: pointer;
  position: relative;
}
.radio {
  z-index: -1;
  position: absolute;
  opacity: 0;
}
/* .cr */
.cr {
  width: 16px;
  height: 16px;
  border: 1px solid #333;
  border-radius: 100%;
  margin-right: 16px;
  position: relative;
}

.cr::before,
.cr::after {
  content: '';
  display: block;
  border-radius: inherit;
  position: absolute;
  transform: scale(0);
  transform-origin: center center;
}

.cr:before {
  background: $blue;
  opacity: 0;
  transition: 0.3s;
}

.cr::after {
  background: $blue;
  opacity: 0.4;
  transition: 0.6s;
}

.text {
  font-size: 1.3rem;
  white-space: nowrap;
}

input:checked + .cr::before {
  width: 10px;
  height: 10px;
  opacity: 1;
  left: 50%;
  top: 50%;
  transform: scale(1) translate(-50%, -50%);
}

/* other states */
input:hover + .cr,
input:focus + .cr {
  border: 1px solid rgb(93, 70, 172);
}
</style>
