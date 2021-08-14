<template>
  <section class="login-page">
    <article class="login">
      <template v-if="showLogins">
        <div class="login__img">
          <V-Img :src="imgLogin" class="img__wrap" alt="img-login" />
        </div>

        <FormFactory @input="login($event)" class="login__form" ref="form">
          <template #button="propsFactory">
            <div class="button-left">
              <V-Btn :disabled="propsFactory.valid" class="btn btn-primary">
                Войти
              </V-Btn>
            </div>
          </template>
        </FormFactory>
      </template>

      <!-- <form @submit.prevent action="" class="login__form">
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
            class="btn btn-primary"
          >
            Вход
          </button>
        </div>
        <div v-if="errorText" class="error global">{{ errorText }}</div>
      </form> -->

      <div v-else class="account-key">
        <ul class="account-key__list">
          <li class="account-key__item" v-for="n in 15" :key="n">
            <div class="account-key__name account-key__name_num">{{ n }}.</div>
            <div class="account-key__content">
              <div>
                <span class="account-key__name"> Логин: </span
                >{{ `exemple${n}@mail.ru` }}
              </div>
              <div><span class="account-key__name">Пароль: </span> 123456</div>
            </div>
          </li>
        </ul>
      </div>

      <div class="btn-get">
        <V-Btn
          @click="showLogins = !showLogins"
          type="button"
          class="btn btn-primary "
        >
          {{ showLogins ? 'Получить логин && пароль' : 'Вернуться' }}
        </V-Btn>
      </div>
    </article>
  </section>
</template>

<script>
import VImg from '@/components/base/base-img'
// TODO: можно удалить
import FormBuilder from '@/components/fields/builder/FormBuilder'
import FormInput from '@/components/fields/FieldInput'
import imgLogin from '@/assets/img/img-01.png'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  components: {
    VImg,
    FormFactory: new FormBuilder()
      .addField({
        component: FormInput,
        label: 'Логин',
        name: 'login',
        options: {
          attrs: {
            placeholder: 'Логин'
          },
          defaultValue: 'exemple1@mail.ru'
        },
        validation: {
          required,
          email
        }
      })
      .addField({
        component: FormInput,
        label: 'Пароль',
        name: 'password',
        options: {
          attrs: {
            placeholder: 'Пароль',
            type: 'password'
          },
          defaultValue: '123456'
        },
        validation: {
          required,
          minLength: minLength(2)
        }
      })
      .build()
  },
  data() {
    return {
      showLogins: true,
      imgLogin
    }
  },

  methods: {
    async login(event) {
      const ok = await this.$store.dispatch('user/login', event)
      if (ok) {
        console.log('1')
        this.$router.push('/home')
      }
    },
    requiredDirty(name) {
      return this.$v.fields[name].$dirty && !this.$v.fields[name].required
    }
  }
}
</script>

<style lang="scss">
.login {
  width: 960px;
  background-color: #fff;
  padding: 80px 55px 40px;
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
    & .button-left {
      margin-top: 50px;
    }
    & .form__group {
      margin-top: 25px;
    }
  }
  @include _480 {
    padding: 50px 25px 30px;
    .btn-get {
      margin-top: 20px;
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

.btn-get {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  & .btn {
    font-size: 1rem;
  }
}
.account-key {
  width: 100%;
  &__item {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  &__list {
    display: flex;
    flex-direction: column;
    max-height: 280px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__name {
    font-size: 1.2rem;
    margin-left: 5px;
    &_num {
      color: $blue;
    }
  }
  @include _979 {
    &__list {
      max-height: 440px;
    }
  }
  @include _600 {
    &__list {
      flex-wrap: nowrap;
      overflow: auto;
    }
  }
}
</style>
