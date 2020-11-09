<template>
  <section class="page">
    <h3 class="main-title">Создать новую задачу</h3>
    <!-- <pre>
      {{ $v.fields }}
    </pre> -->
    <article class="substrate">
      <form
        class="ad-form"
        @submit.prevent=""
        @keyup.enter.prevent=""
        action=""
      >
        <v-input
          v-model.trim="$v.fields.title.$model"
          :config="{ name: 'title', placeholder: 'Описание задачи' }"
          :error="$v.fields.title.$error"
        >
          <template #errors>
            <div class="error" v-if="requiredDirty('title')">
              Поле не должно быть пустым.
            </div>
            <div class="error" v-if="!$v.fields.title.minLength">
              Поле должно содержать больше
              {{ $v.fields.title.$params.minLength.min }} симвлов.
            </div>
          </template>
        </v-input>
        <v-textarea
          v-model.trim="$v.fields.subtitle.$model"
          :config="{ name: 'subtitle', placeholder: 'Описание задачи' }"
          :error="$v.fields.subtitle.$error"
          ref="textarea"
        >
          <template #errors>
            <div class="error" v-if="requiredDirty('subtitle')">
              Поле не должно быть пустым
            </div>
            <div class="error" v-if="!$v.fields.subtitle.minLength">
              Поле должно содержать больше
              {{ $v.fields.subtitle.$params.minLength.min }} симвлов.
            </div>
          </template>
        </v-textarea>
        <date-picker v-model="fields.date" ref="date-picker">
          <template #errors>
            <div class="error" v-if="requiredDirty('date')">
              Поле не должно быть пустым
            </div>
          </template>
        </date-picker>
        <autocomplete
          v-model="setUsers"
          :users="users"
          :error="$v.fields.executor.$error"
          ref="autocomplit"
        >
          <template #errors>
            <div class="error" v-if="requiredDirty('executor')">
              Поле не должно быть пустым
            </div>
          </template>
        </autocomplete>
        <v-select
          v-model="setType"
          :recovery="true"
          :error="$v.fields.type.$error"
          ref="select"
          placeholder="Выбирите приоритет"
        >
          <template #errors>
            <div class="error" v-if="requiredDirty('type')">
              Поле не должно быть пустым
            </div>
          </template>
        </v-select>
        <sub-tasks v-model="setSubTasks"></sub-tasks>
        <div class="button-left">
          <button
            @click.prevent="submit()"
            type="button"
            :disabled="$v.fields.$invalid"
            class="btn-primary"
          >
            Отправить
          </button>
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import VTextarea from "../../components/fields/v-textarea.vue";
import VInput from "@/components/fields/v-input.vue";
import SubTasks from "@/components/fields/subTasks.vue";
import VSelect from "@/components/fields/v-select.vue";
import DatePicker from "@/components/calendar/datePicker.vue";
import autocomplete from "@/components/fields/autocomplitform.vue";
import { required, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  components: {
    DatePicker,
    autocomplete,
    VSelect,
    SubTasks,
    VInput,
    VTextarea
  },
  data() {
    return {
      fields: {
        title: "",
        subtitle: "",
        date: "",
        executor: [],
        type: "",
        subtasks: []
      },
      type: ["Высокий", "Средний", "Низкий"]
    };
  },
  computed: {
    ...mapGetters("users", { users: "getRangeLevelUsers" }),
    setType: {
      get() {
        return this.type;
      },
      set(value) {
        this.$v.fields.type.$touch();
        this.fields.type = value;
      }
    },
    setUsers: {
      get() {
        return this.users;
      },
      set(value) {
        this.$v.fields.executor.$touch();
        this.fields.executor = value;
      }
    },
    setSubTasks: {
      get() {
        return this.fields.subtasks;
      },
      set(value) {
        switch (value.type) {
          case "add":
            this.fields.subtasks.push({ title: value.title });
            break;
          case "change":
            this.fields.subtasks[value.id].title = value.title;
            break;
          case "delete":
            this.fields.subtasks.splice(value.id, 1);
            break;
          case "clear":
            this.fields.subtasks = [];
            break;
        }
      }
    }
  },
  created() {
    this.$store.dispatch("users/getUsersDepartment");
  },

  validations: {
    fields: {
      title: {
        required,
        minLength: minLength(10)
      },
      subtitle: {
        required,
        minLength: minLength(10)
      },
      date: {
        required
      },
      executor: {
        required
      },
      type: {
        required
      },
      subtasks: {}
    }
  },

  methods: {
    submit() {
      if (!this.$v.fields.$invalid) {
        this.fields.subtitle = this.fields.subtitle.replace(/\n/g, "<br/>");
        this.$store.dispatch("tasks/setTask", this.fields);
        this.fields.title = "";
        this.fields.subtitle = "";
        this.$refs.textarea.clearResizeTextarea();
        this.$refs["date-picker"].clearEl();
        this.$refs.autocomplit.clearEl();
        this.$refs.select.clearEl();
        this.fields.subtasks = [];
        this.$v.$reset();
      }
    },
    setTouch(name) {
      this.$v.fields[name].$touch();
    },

    requiredDirty(name) {
      return this.$v.fields[name].$dirty && !this.$v.fields[name].required;
    }
  }
};
</script>
