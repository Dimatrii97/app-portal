<template>
  <article class="conteiner">
    <div class="admin__title main-title">
      Создать нового пользователя
    </div>
    <form class="ad-form substrate">
      <v-input
        v-model.trim="$v.fields.login.$model"
        :config="{ name: 'login', placeholder: 'Логин' }"
        :error="$v.fields.login.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('login')">
            Поле не должно быть пустым.
          </div>
          <div class="error" v-if="!$v.fields.login.email">
            Корректный емайл
          </div>
        </template>
      </v-input>
      <!-- pass -->
      <v-input
        v-model.trim="$v.fields.password.$model"
        :config="{ name: 'password', placeholder: 'Пароль' }"
        :error="$v.fields.password.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('password')">
            Поле не должно быть пустым.
          </div>
        </template>
      </v-input>
      <!-- firstname -->
      <v-input
        v-model.trim="$v.fields.firstname.$model"
        :config="{ name: 'firstname', placeholder: 'Имя' }"
        :error="$v.fields.firstname.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('firstname')">
            Поле не должно быть пустым.
          </div>
        </template>
      </v-input>
      <!-- lastname -->
      <v-input
        v-model.trim="$v.fields.lastname.$model"
        :config="{ name: 'lastname', placeholder: 'Фамлия' }"
        :error="$v.fields.lastname.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('lastname')">
            Поле не должно быть пустым.
          </div>
        </template>
      </v-input>
      <!-- email -->
      <v-input
        v-model.trim="$v.fields.email.$model"
        :config="{ name: 'email', placeholder: 'Майл' }"
        :error="$v.fields.email.$error"
      >
        <template #errors>
          <div class="error" v-if="!$v.fields.email.email">
            Корректный емайл
          </div>
        </template>
      </v-input>

      <!-- age -->
      <v-input
        v-model.trim="$v.fields.age.$model"
        :config="{ name: 'age', placeholder: 'Дата рождения' }"
        :error="$v.fields.age.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('age')">
            Поле не должно быть пустым.
          </div>
        </template>
      </v-input>
      <!-- phone -->
      <v-input
        v-model.trim="$v.fields.phone.$model"
        :config="{ name: 'phone', placeholder: 'Телефон' }"
        :error="$v.fields.phone.$error"
      >
        <template #errors>
          <div class="error" v-if="requiredDirty('phone')">
            Поле не должно быть пустым.
          </div>
        </template>
      </v-input>
      <my-select v-model="setDepartment" ref="sl1">
        <template #errors>
          <div class="error" v-if="requiredDirty('department')">
            Поле не должно быть пустым
          </div>
        </template>
      </my-select>
      <my-select :wait="isDepartment" v-model="setPosition" ref="sl2">
        <template #errors>
          <div class="error" v-if="requiredDirty('position')">
            Поле не должно быть пустым
          </div>
        </template>
      </my-select>
      <div class="button-left">
        <button
          @click.prevent="submit()"
          type="button"
          :disabled="$v.fields.$invalid"
          class="btn btn-primary"
        >
          Создать пользователя
        </button>
      </div>
    </form>
  </article>
</template>

<script>
import VInput from '../fields/FieldInput.vue'
import mySelect from '@/components/fields/FieldSelect.vue'

import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
export default {
  components: {
    mySelect,
    VInput
  },
  data() {
    return {
      fields: {
        login: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        age: '',
        phone: '',
        department: '',
        position: ''
      }
    }
  },

  computed: {
    ...mapGetters('admin', {
      department: 'getDepartment',
      position: 'getPosition'
    }),
    setDepartment: {
      get() {
        return this.department
      },
      set(department) {
        this.$store.dispatch('admin/getSocketAllPosition', department)
        this.fields.department = department
        this.$refs.sl2.clearEl()
      }
    },
    setPosition: {
      get() {
        return this.position
      },
      set(position) {
        this.fields.position = position
      }
    },
    isDepartment() {
      return !!this.fields.department
    }
  },
  validations: {
    fields: {
      login: {
        required,
        email
      },
      password: {
        required
      },
      firstname: {
        required
      },
      lastname: {
        required
      },
      email: {
        email
      },
      age: {
        required
      },
      phone: {
        required
      },
      department: {
        required
      },
      position: {
        required
      }
    }
  },

  created() {
    this.$store.dispatch('admin/getSocketAllDepartaments')
  },
  methods: {
    submit() {
      if (!this.$v.fields.$invalid) {
        this.$store.dispatch('admin/addUser', this.fields)
        for (const key in this.fields) {
          this.fields[key] = ''
        }
        for (const key in this.$refs) {
          this.$refs[key].clearEl()
        }
      }
      this.$v.$reset()
    },
    requiredDirty(name) {
      return this.$v.fields[name].$dirty && !this.$v.fields[name].required
    }
  }
}
</script>
<style lang="scss">
.ad-form__select {
  padding: 15px 0 0;
  margin-top: 10px;
}
</style>
