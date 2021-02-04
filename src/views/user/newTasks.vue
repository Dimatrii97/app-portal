<template>
  <section class="page">
    <h3 class="main-title">Создать новую задачу</h3>
    <article class="substrate">
      <FormFactory @input="inputValue($event)" :fields="fields" ref="form">
        <template #button="propsFactory">
          <div class="button-left m110">
            <button :disabled="propsFactory.valid" class="btn btn-primary">
              Отправить
            </button>
          </div>
        </template>
      </FormFactory>
      <div class="test"></div>
    </article>
  </section>
</template>

<script>
// Select || FormFactory experimental component

import FormInput from '@/components/fields/FieldInput'
import SelectBuilder from '@/builder/SelectBuilder'
import SelectDirector from '@/builder/SelectDirecrot'
import FormDatePicker from '@/components/fields/FieldDatePicker'
import FormTextarea from '@/components/fields/FieldTextarea'
import FormFactory from '@/components/fields/FormFactory'
import FormList from '@/components/fields/FieldList'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      field: [],
      users: []
    }
  },
  components: {
    FormFactory
  },
  created() {
    this.$store.dispatch('users/getUsersDepartment')
    this.fields = [
      {
        component: FormInput,
        label: 'Заголовок',
        name: 'title',
        options: { attrs: { placeholder: 'Заголовок' } },
        validation: { required, minLength: minLength(10) }
      },
      {
        component: FormTextarea,
        label: 'Описание',
        name: 'subtitle',
        options: { attrs: { placeholder: 'Описание' } },
        validation: { required, minLength: minLength(10) }
      },
      {
        component: FormDatePicker,
        label: 'Сроки выполнения',
        name: 'date',
        options: { attrs: { placeholder: 'Сроки выполнения' } },
        validation: { required }
      },
      {
        component: new SelectDirector(new SelectBuilder()).makeMultiSelect(),
        label: 'Назначить сотрудников',
        name: 'executor',
        options: {
          attrs: { placeholder: 'Назначить сотрудников' },
          props: { selectList: this.users, searchProp: 'name' },
          defaultValue: []
        },
        validation: { required }
      },
      {
        component: new SelectDirector(new SelectBuilder()).makeSelect(),
        label: 'Приоритет',
        name: 'type',
        options: {
          attrs: { placeholder: 'Приоритет' },
          props: { selectList: ['Высокий', 'Средний', 'Низкий'] }
        },
        validation: { required }
      },
      {
        component: FormList,
        label: 'Структура выполнения',
        name: 'subtasks',
        options: {
          attrs: { placeholder: 'Структура выполнения' },
          defaultValue: []
        },
        validation: {}
      }
    ]
  },
  computed: {
    ...mapGetters('users', { getUsers: 'getRangeLevelUsers' })
  },
  watch: {
    getUsers(newValue) {
      this.users.push(...newValue)
    }
  },
  methods: {
    inputValue(e) {
      let [start, end] = e.date.split('/')
      let date = { start, end }
      let executor = e.executor.map(us => us.user_id)
      let subtitle = e.subtitle.replace(/\n/g, '<br/>')
      this.$store.dispatch('tasks/setTask', { ...e, date, executor, subtitle })
      this.$refs.form.clear()
    }
  }
}
</script>
