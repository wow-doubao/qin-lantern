import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'TableSlot',
  props: {
    name: {
      type: String,
      required: true,
    },
    scope: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const slots = inject<any>('tableSlots')
    return () => {
      const slot = slots?.[props.name]
      return slot ? slot(props.scope) : null
    }
  },
})
