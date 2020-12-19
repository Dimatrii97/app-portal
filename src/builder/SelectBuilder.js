import FieldSelect from "@/components/fields/FieldSelect.vue";

export default class SelectBuilder {
  constructor(props) {
    this.props = { ...props };
  }
  withProvider(provider) {
    this.provider = provider;
    return this;
  }
  withBody(body) {
    this.body = body;
    return this;
  }
  withList(list) {
    this.list = list;
    return this;
  }
  setType(type) {
    this.props.type = type;
    return this;
  }
  build() {
    const body = this.body;
    const list = this.list;
    const props = this.props;

    return {
      render(h) {
        return h(
          FieldSelect,
          {
            props,
            on: { ...this.$listeners },
            attrs: { ...this.$attrs },
            scopedSlots: {
              default: props => h(body, { props }),
              list: props => h(list, { props }),
              ...this.$scopedSlots
            }
          },
          [body]
        );
      }
    };
  }
}
