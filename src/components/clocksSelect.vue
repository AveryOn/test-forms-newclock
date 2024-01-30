<template>
    <v-card color="background" elevation="0" class="d-flex align-start">
        <v-card class="pa-4 w-50">
            <v-card-title class="pl-0">Основная информация</v-card-title>
            <v-card-text class="pa-1">
                <div>Имя проекта</div>
                <v-text-field class="mt-1" variant="solo" v-model="projectData.name"></v-text-field>
            </v-card-text>
            <v-card-text class="pa-1">
                <div>Описание проекта</div>
                <v-textarea rows="1" auto-grow="" class="mt-1" variant="solo"
                    v-model="projectData.description"></v-textarea>
            </v-card-text>
            <v-card-text class="pa-1">
                <div>Стоимость проекта</div>
                <v-text-field class="mt-1" variant="solo" v-model="projectData.price"></v-text-field>
            </v-card-text>
            <v-card-text class="pr-1 d-flex justify-end">
                <v-btn color="primary" class="mr-2 text-none" width="250" @click="showClock">Просмотр часов</v-btn>
                <v-btn color="primary" width="250" @click="createNewProject">Сохранить</v-btn>
            </v-card-text>
        </v-card>

        <v-card class="pa-4 w-50 ml-5" v-show="true /* Тут был параметр id получаемый с маршрута */">
            <v-card-title class="pl-0">Видеозаписи</v-card-title>
            <v-card-title>Первая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(first, index) in projectData.first_position" :key="index">
                    <clocksCreateForm v-model="projectData.first_position[index]" />
                </div>
            </v-card-text>

            <v-card-title>Вторая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.second_position" :key="index">
                    <clocksCreateForm v-model="projectData.second_position[index]" />
                </div>
            </v-card-text>

            <v-card-title>Третья цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.third_position" :key="index">
                    <clocksCreateForm v-model="projectData.third_position[index]" />
                </div>
            </v-card-text>

            <v-card-title>Четвертая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.fourth_position" :key="index">
                    <clocksCreateForm v-model="projectData.fourth_position[index]" />
                </div>
            </v-card-text>

            <!-- Здесь был v-dialog -->
            <v-btn block class="text-none" color="primary" @click="addedVideos">Добавить видео</v-btn>
        </v-card>
    </v-card>
</template>
  
<script setup>
import clocksCreateForm from './UI/clocksCreateForm.vue';
import { ref } from 'vue';

const clockDialog = ref(false);
const projectData = ref({
    name: null,
    description: null,
    price: null,
    is_public: false,
    first_position: [null, null, null],
    second_position: [null, null, null, null, null, null, null, null, null, null],
    third_position: [null, null, null, null, null, null],
    fourth_position: [null, null, null, null, null, null, null, null, null, null],
});

function createNewProject() {
    console.log('createNewProject');
}
function addedVideos() {
    console.log('addedVideos');
}
function showClock() {
    clockDialog.value = true;
}
</script>