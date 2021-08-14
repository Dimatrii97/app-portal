import FormFactory from '@/components/fields/FormFactory.vue'

export default class FormBuilder {
  constructor() {
    this.props = {
      fields: []
    }
  }
  addField(field) {
    this.props.fields.push(field)
    return this
  }
  build() {
    const props = this.props

    return {
      methods: {
        clear() {
          this.$refs.FormFactory.clear()
        }
      },
      render(h) {
        return h(FormFactory, {
          props,
          on: { ...this.$listeners },
          ref: 'FormFactory',
          scopedSlots: { ...this.$scopedSlots }
        })
      }
    }
  }
}
