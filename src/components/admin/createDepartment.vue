<template>
  <article class="conteiner">
    <div class="main-title">
      Создать депортамент
    </div>
    <form class="ad-form substrate ">
      <v-input
        v-model.trim="$v.fields.department.$model"
        :config="{ name: 'department', placeholder: 'Отдел' }"
        :error="$v.fields.department.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('department')">
            Поле не должно быть пустым.
          </div>
          <div class="error" v-if="!$v.fields.department.minLength">
            Поле должно содержать больше
            {{ $v.fields.department.$params.minLength.min }} симвлов.
          </div>
        </template>
      </v-input>
      <v-input
        v-model.trim="$v.fields.position.$model"
        :config="{ name: 'position', placeholder: 'Специальность' }"
        :error="$v.fields.position.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('position')">
            Поле не должно быть пустым.
          </div>
        </template>
      </v-input>
      <v-input
        v-model.trim="$v.fields.range.$model"
        :config="{ name: 'range', placeholder: 'Уровень' }"
        :error="$v.fields.range.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('range')">
            Поле не должно быть пустым.
          </div>
          <div class="error" v-if="!$v.fields.range.numeric">
            Поле принимает только числа
          </div>
          <div
            class="error"
            v-if="!$v.fields.range.between && $v.fields.range.numeric"
          >
            Уровень может быть от {{ $v.fields.range.$params.between.min }} до
            {{ $v.fields.range.$params.between.max }}
          </div>
        </template>
      </v-input>
      <div class="button-left">
        <button
          @click.prevent="submit()"
          type="button"
          :disabled="$v.fields.$invalid"
          class="btn btn-primary"
        >
          Создать
        </button>
      </div>
    </form>
  </article>
</template>

<script>
import VInput from "../fields/FieldInput.vue";
import {
  required,
  numeric,
  minLength,
  between
} from "vuelidate/lib/validators";
export default {
  components: { VInput },

  data() {
    return {
      fields: {
        department: "",
        position: "",
        range: ""
      }
    };
  },
  validations: {
    fields: {
      department: {
        required,
        minLength: minLength(5)
      },
      position: {
        required
      },
      range: {
        required,
        numeric,
        between: between(1, 5)
      }
    }
  },
  methods: {
    submit() {
      if (!this.$v.fields.$invalid) {
        this.$store.dispatch("admin/addDepartment", this.fields);
        this.fields.department = "";
        this.fields.position = "";
        this.fields.range = "";
        this.$v.$reset();
      }
    },
    requiredDirty(name) {
      return this.$v.fields[name].$dirty && !this.$v.fields[name].required;
    }
  }
};
</script>
<style scoped></style>
