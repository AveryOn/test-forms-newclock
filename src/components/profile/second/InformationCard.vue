<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<template>
  <v-card class="d-flex flex-column rounded-xl pa-2 card-text-text">
    <v-card-title class="pl-9 d-flex align-center justify-space-between"
      >Подробная информация
      <v-btn icon="mdi-close" size="small" elevation="0"></v-btn
    ></v-card-title>
    <v-card-text class="d-flex">
      <v-card-subtitle style="width: 200px">ID системы</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.id }}</v-card-subtitle>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-text class="d-flex" v-if="props.data?.birthdate">
      <v-card-subtitle style="width: 200px">День рождения</v-card-subtitle>
      <v-card-subtitle>{{
        new Date(props.data?.birthdate * 1000).toLocaleDateString()
      }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.location_id">
      <v-card-subtitle style="width: 200px">Город</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.location_id }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.birth_location_id">
      <v-card-subtitle style="width: 200px">Родной город</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.birth_location_id }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.tel">
      <v-card-subtitle style="width: 200px">Мобильный телефон</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.tel }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.tg">
      <v-card-subtitle style="width: 200px">Телеграм</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.tg }}</v-card-subtitle>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="d-flex" v-if="props.data?.description">
      <v-card-subtitle style="width: 200px">О себе</v-card-subtitle>
      <v-card-text class="pt-0">{{ props.data?.description }}</v-card-text>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.work">
      <v-card-subtitle style="width: 200px">Деятельность</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.work }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.interests">
      <v-card-subtitle style="width: 200px">Интересы</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.interests.join(", ") }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.favorite_music">
      <v-card-subtitle style="width: 200px">Любимая музыка</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.favorite_music }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.favorite_movies">
      <v-card-subtitle style="width: 200px">Любимые фильмы</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.favorite_movies }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.favorite_books">
      <v-card-subtitle style="width: 200px">Любимые книги</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.favorite_books }}</v-card-subtitle>
    </v-card-text>
    <v-card-text class="d-flex" v-if="props.data?.favorite_games">
      <v-card-subtitle style="width: 200px">Любимые игры</v-card-subtitle>
      <v-card-subtitle>{{ props.data?.favorite_games }}</v-card-subtitle>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  data: {
    type: Object,
  },
});

// const userData = ref(props.data);
</script>

