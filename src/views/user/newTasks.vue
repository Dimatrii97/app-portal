<template>
  <section class="page">
    <h3 class="main-title">Создать новую задачу</h3>
    <article class="substrate">
      <FormFactory @input="inputValue($event)" :fields="field" ref="form">
        <template #button="propsFactory">
          <div class="button-left m110">
            <V-Btn :disabled="propsFactory.valid" class="btn btn-primary">
              Отправить
            </V-Btn>
          </div>
        </template>
      </FormFactory>
    </article>
  </section>
</template>

<script>
import FormInput from '@/components/fields/FieldInput'
import FormSelect from '@/components/fields/FieldSelect'
import FormMultyselect from '@/components/fields/FieldMultiselect'
import FormDatePicker from '@/components/fields/FieldDatePicker'
import FormTextarea from '@/components/fields/FieldTextarea'
import FormFactory from '@/components/fields/FormFactory'
import FormList from '@/components/fields/FieldList'
import { required, minLength } from 'vuelidate/lib/validators'
import * as authApi from '@/api/user'
import { emit } from '@/websocket/websocket.js'
export default {
  data() {
    return {
      users: []
    }
  },
  components: {
    FormFactory
  },
  async created() {
    this.users = await authApi.usersDepartment()
  },
  computed: {
    field() {
      return [
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
          component: FormMultyselect,
          label: 'Назначить сотрудников',
          name: 'executor',
          options: {
            attrs: { placeholder: 'Назначить сотрудников' },
            props: { options: this.users, searchProp: 'name' },
            defaultValue: []
          },
          validation: { required }
        },
        {
          component: FormSelect,
          label: 'Приоритет',
          name: 'type',
          options: {
            attrs: { placeholder: 'Приоритет' },
            props: { options: ['Высокий', 'Средний', 'Низкий'] }
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
    }
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
      let executor = e.executor.map(us => us.id)
      let subtitle = e.subtitle.replace(/\n/g, '<br/>')
      // console.log({ ...e, date, executor, subtitle })
      emit('setTask', { ...e, date, executor, subtitle })
      // this.$store.dispatch('tasks/setTask', { ...e, date, executor, subtitle })
      this.$refs.form.clear()
    }
  }
}
</script>
<style lang="scss" scoped></style>
