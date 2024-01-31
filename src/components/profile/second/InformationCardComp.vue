<!-- Блок информации о себе -->
<template>
    <v-card class="d-flex flex-column rounded-xl pa-2 card-text-text">
        <v-card-title class="pl-9 d-flex align-center justify-space-between">Подробная информация
            <v-btn icon="mdi-close" size="small" elevation="0"></v-btn></v-card-title>

        <!-- ID Системы -->
        <v-card-text class="d-flex">
            <v-card-subtitle style="width: 200px">ID системы</v-card-subtitle>
            <v-card-subtitle>123</v-card-subtitle>
        </v-card-text>

        <v-divider></v-divider>
        <!-- День рождения -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">День рождения</v-card-subtitle>
            <v-card-subtitle>01.01.1996</v-card-subtitle>
        </v-card-text>

        <!-- Город -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Город</v-card-subtitle>
            <v-card-subtitle>Москва</v-card-subtitle>
        </v-card-text>

        <!-- Родной город -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Родной город</v-card-subtitle>
            <v-card-subtitle>Москва</v-card-subtitle>
        </v-card-text>

        <!-- Мобильный телефон -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Мобильный телефон</v-card-subtitle>
            <v-card-subtitle>{{ props.data?.tel }}</v-card-subtitle>
        </v-card-text>

        <!-- Телеграм -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Телеграм</v-card-subtitle>
            <v-card-subtitle>@example123</v-card-subtitle>
        </v-card-text>
        <v-divider></v-divider>

        <!-- О себе -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">О себе</v-card-subtitle>
            <v-card-text class="pt-0">Пример описания о себе</v-card-text>
        </v-card-text>

        <!-- Деятельность -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Деятельность</v-card-subtitle>
            <v-card-subtitle>Веб-разработчик</v-card-subtitle>
        </v-card-text>

        <!-- Интересы -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Интересы</v-card-subtitle>
            <v-card-subtitle>Примерные интересы</v-card-subtitle>
        </v-card-text>

        <!-- Любимая музыка -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Любимая музыка</v-card-subtitle>
            <v-card-subtitle>Альтернатива</v-card-subtitle>
        </v-card-text>

        <!-- Любимые фильмы -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Любимые фильмы</v-card-subtitle>
            <v-card-subtitle>Пример фильмов которые нравятся</v-card-subtitle>
        </v-card-text>

        <!-- Любимые книги -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Любимые книги</v-card-subtitle>
            <v-card-subtitle>Пример книг которые нравятся</v-card-subtitle>
        </v-card-text>

        <!-- Любимые игры -->
        <v-card-text class="d-flex" v-if="true">
            <v-card-subtitle style="width: 200px">Любимые игры</v-card-subtitle>
            <v-card-subtitle>Пример игр которые нравятся</v-card-subtitle>
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

