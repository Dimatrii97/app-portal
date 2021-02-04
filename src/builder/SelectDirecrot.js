import SelectList from '@/components/fields/select/SelectList.vue'
import SelectListMulti from '@/components/fields/select/SelectListMulti'
import SelectBody from '@/components/fields/select/SelectBody'
import SelectBodyMulty from '@/components/fields/select/SelectMultiBody'

export default class SelectDirector {
  constructor(builder) {
    this.builder = builder
  }

  makeSelect() {
    return this.builder
      .withBody(SelectBody)
      .withList(SelectList)
      .setType('select')
      .build()
  }

  makeMultiSelect() {
    return this.builder
      .withBody(SelectBodyMulty)
      .withList(SelectListMulti)
      .setType('multiSelect')
      .build()
  }
}
