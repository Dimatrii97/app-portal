<template>
  <form class="form-factory " @submit.prevent="submit">
    <template>
      <FormGroup v-for="field in fieldsWithDefaults" :key="field.name">
        <Component
          v-model="data[field.name]"
          :is="field.component"
          v-bind="{
            ...field.options.props,
            ...field.options.attrs,
            error: $v.data[field.name].$error
          }"
          :id="field.name"
          @input="delayTouch($v.data[field.name])"
        >
          <template #label>
            <FormLabel
              :for="field.name"
              :class="{ empty: isEmpty(data[field.name]) }"
            >
              {{ field.label }}
              <template v-if="field.validation.required">*</template>
            </FormLabel>
          </template>
        </Component>
        <FormInlineMessage v-if="$v.data[field.name].$error"
          >Введите корректные данные.</FormInlineMessage
        >
      </FormGroup>
      <slot name="button" v-bind="{ valid: $v.data.$invalid }"> </slot>
    </template>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";

import FormGroup from "./FormGroup.vue";
import FormInlineMessage from "./FormInlineMessage.vue";
import FormLabel from "./FormLabel.vue";

const touchMap = new WeakMap();

const defaultField = {
  component: null,
  label: "",
  name: "",
  options: {},
  validation: {}
};

export default {
  name: "FormFactory",
  mixins: [validationMixin],
  components: {
    FormGroup,
    FormInlineMessage,
    FormLabel
  },
  props: {
    fields: {
      default: () => [],
      type: Array
    },
    id: {
      default: null,
      type: [Number, String]
    }
  },
  data() {
    return {
      data: {},
      success: false
    };
  },
  computed: {
    fieldsWithDefaults() {
      return this.fields.map(x => ({ ...defaultField, ...x }));
    }
  },
  created() {
    this.$props.fields.forEach(field => {
      this.$set(this.data, field.name, field.options.defaultValue || "");
    });
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.$emit("input", this.data);
    },
    isEmpty(options) {
      let type = typeof options;
      switch (type) {
        case "string": {
          return !options;
        }
        case "object": {
          if (Array.isArray(options)) {
            return !options.length;
          }
          return !Object.keys(options).length;
        }

        default:
          return true;
      }
    },
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    }
  },

  validations() {
    const data = this.fieldsWithDefaults
      .filter(x => x.validation)
      .reduce(
        (prev, field) => ({
          ...prev,
          [field.name]: field.validation
        }),
        {}
      );
    return { data };
  }
};
</script>
<style lang="scss">
.form-factory {
  padding: 20px;
}
</style>
