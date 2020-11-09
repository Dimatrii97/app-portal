<template>
  <section class="login-page">
    <article class="login">
      <div class="login__img">
        <figure class="img__wrap">
          <img
            src="@/assets/img/img-01.png"
            alt="img-login"
            class="img__login"
          />
        </figure>
      </div>
      <form @submit.prevent action="" class="login__form">
        <div class="form-row">
          <h3 class="login__form__title">Войти</h3>
        </div>
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
              Введите корректный логин
            </div>
          </template>
        </v-input>
        <v-input
          v-model.trim="$v.fields.password.$model"
          :config="{
            name: 'password',
            type: 'password',
            placeholder: 'Пароль'
          }"
          :error="$v.fields.password.$error"
        >
          <template #errors>
            <div class="error" v-if="requiredDirty('password')">
              Поле не должно быть пустым.
            </div>
            <div class="error" v-if="!$v.fields.password.minLength">
              Поле должно содержать больше
              {{ $v.fields.password.$params.minLength.min }} симвлов.
            </div>
          </template>
        </v-input>

        <div class="button-left">
          <button
            :disabled="$v.fields.$invalid"
            @click="login()"
            class="btn-primary"
          >
            Вход
          </button>
        </div>
        <div v-if="errorText" class="error global">{{ errorText }}</div>
      </form>
    </article>
    <div class="prompt">
      <div>
        Пользователи
        <p>
          Логины:
          <span class="text-big">exemple[1-15]@mail.ru</span>
        </p>
        <p>Пароли: <span class="text-big">123456</span></p>
      </div>
      <div>
        Пример
        <p>
          Логин:
          <span class="text-big">exemple1@mail.ru</span>
        </p>
        <p>Пароль: <span class="text-big">123456</span></p>
      </div>
      <span class="small"
        >*возможность постановки задачи зависит от роли пользователя 1-15</span
      >
    </div>
  </section>
</template>

<script>
import VInput from "@/components/fields/v-input.vue";
import { required, minLength, email } from "vuelidate/lib/validators";
// import { setTokens } from "@/store/utils/JWT";
export default {
  components: { VInput },

  data() {
    return {
      fields: {
        login: "",
        password: ""
      },
      errorText: ""
    };
  },
  validations: {
    fields: {
      login: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(2)
      }
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", {
          login: this.fields.login,
          password: this.fields.password
        })
        .catch(err => {
          this.fields.login = "";
          this.fields.password = "";
          this.$v.$reset();
          this.errorText = err.body.message;
        });
    },
    requiredDirty(name) {
      return this.$v.fields[name].$dirty && !this.$v.fields[name].required;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 960px;
  background-color: #fff;
  padding: 82px 56px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &__img {
    @include _979 {
      margin: 0 auto;
    }
  }
  &__form {
    flex-grow: 1;
    padding: 20px;
    position: relative;
    &__title {
      font-weight: 600;
      color: $blue;
      font-size: 1.6rem;
    }
  }
}
.login-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.global.error {
  bottom: 0;
}
.prompt {
  position: fixed;
  bottom: 10px;
  right: 20px;
  padding: 11px 20px;
  background-color: rgba(0, 0, 0, 0.78);
  color: #fff;
  border-radius: 10px;
  font-size: 1.2rem;
}
.small {
  font-size: 0.8rem;
  color: red;
}
</style>
