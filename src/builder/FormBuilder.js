import FormFactory from "@/components/fields/FormFactory.vue";

export default class FormBuilder {
  constructor() {
    this.props = {
      fields: []
    };
  }
  addField(field) {
    this.props.fields.push(field);
    return this;
  }
  build() {
    const props = this.props;

    return {
      render(h) {
        return h(FormFactory, {
          props,
          on: { ...this.$listeners },
          ref: "gg",
          scopedSlots: { ...this.$scopedSlots }
        });
      }
    };
  }
}
