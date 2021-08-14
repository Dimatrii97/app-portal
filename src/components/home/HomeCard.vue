<template functional>
  <div class="card">
    <figure
      class="card__img"
      :style="`background-image:url(${props.news.urlToImage});`"
    ></figure>
    <div class="card__info">
      <h3 class="card__title">{{ props.news.title }}</h3>
      <p class="card__text">
        {{ props.news.description }}
      </p>
    </div>
    <div class="wrap-gray">
      <a class="card__link card__info" :href="props.news.url"
        >Перейти к новости</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'V-Card',
  props: {
    news: Object
  }
}
</script>
