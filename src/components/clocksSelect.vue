<template>
    <!-- Контейнер для формы -->
    <v-card color="background" elevation="0" class="d-flex align-start">

        <!-- Форма просмотра выбранных часов -->
        <v-card class="pa-4 w-50">

            <!-- Заголовок Формы -->
            <v-card-title class="pl-0">Основная информация</v-card-title>

            <!-- Подзаголовок "Имя проекта" -->
            <v-card-text class="pa-1">
                <div>Имя проекта</div>
                <v-text-field class="mt-1" variant="solo" v-model="projectData.name"></v-text-field>
            </v-card-text>

            <!-- Подзаголовок "Описание проекта" -->
            <v-card-text class="pa-1">
                <div>Описание проекта</div>
                <v-textarea rows="1" auto-grow="" class="mt-1" variant="solo"
                    v-model="projectData.description"></v-textarea>
            </v-card-text>

            <!-- Подзаголовок "Дата создания проекта" -->
            <v-card-text class="pa-1">
                <div>Стоимость проекта</div>
                <v-text-field class="mt-1" variant="solo" v-model="projectData.price"></v-text-field>
            </v-card-text>

            <!-- Кнопки ("Просмотр часов" / "Сохранить") -->
            <v-sheet class="clock-select__buttons">
                <v-btn color="primary" class="mr-2 text-none" width="45%" @click="showClock">Просмотр часов</v-btn>
                <v-btn color="primary" width="45%" @click="createNewProject">Сохранить</v-btn>
            </v-sheet>
        </v-card>

        <!-- Блок для записи видеоматериалов  -->
        <v-card class="pa-4 w-50 ml-5" v-show="true /* Тут был параметр id с маршрута */">
            <v-card-title class="pl-0">Видеозаписи</v-card-title>


            <!-- =================  ПЕРВАЯ ЦИФРА  ========================== -->
            <v-card-title>Первая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(first, index) in projectData.firstPosition" :key="index">
                    <clockInput 
                    v-model="projectData.firstPosition[index]" 
                    />
                </div>
            </v-card-text>

            <!-- =================  ВТОРАЯ ЦИФРА  ========================== -->
            <v-card-title>Вторая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.secondPosition" :key="index">
                    <clockInput v-model="projectData.secondPosition[index]" />
                </div>
            </v-card-text>


            <!-- =================  ТРЕТЯЯ ЦИФРА  ========================== -->
            <v-card-title>Третья цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.thirdPosition" :key="index">
                    <clockInput v-model="projectData.thirdPosition[index]" />
                </div>
            </v-card-text>

            <!-- =================  ЧЕТВЕРТАЯ ЦИФРА  ========================== -->
            <v-card-title>Четвертая цифра</v-card-title>
            <v-card-text class="pa-1 d-flex flex-wrap">
                <div class="mr-2" v-for="(second, index) in projectData.fourthPosition" :key="index">
                    <clockInput v-model="projectData.fourthPosition[index]" />
                </div>
            </v-card-text>

            <!-- Здесь был v-dialog для просмотра видеочасов -->
            <v-btn block class="text-none" color="primary" @click="addedVideos">Добавить видео</v-btn>
        </v-card>
    </v-card>
</template>
  
<script setup>
import clockInput from './clockInput.vue';
import { ref, watch, onBeforeMount } from 'vue';
import { createProject } from '@/api/clocks';

onBeforeMount(() => {

});
// TEST
// function showImage(data, index) {
//     try {
//         projectData.value.positionList[index] = data.video;
//     } catch (err) {
//         throw new Error(`components/clocksSelect:showImage => ${err}`);
//     }
// }

const clockDialog = ref(false);
const projectData = ref({
    name: null,
    description: null,
    price: null,
    isPublic: false,
    firstPosition: [null, null, null],
    secondPosition: [null, null, null, null, null, null, null, null, null, null],
    thirdPosition: [null, null, null, null, null, null],
    fourthPosition: [null, null, null, null, null, null, null, null, null, null],
});


watch(projectData.value, (newValue) => {
    console.log('watch: ', newValue);
}); 

// Создание проекта
async function createNewProject() {
    console.log('createNewProject');
    try {
        const response = await createProject(projectData.value);
        console.log(response);
    } catch (err) {
        throw new Error(`components/clocksSelect:createNewProject => ${err}`);
    }
}

// EXAMPLE::::::::
// function loadVideo (data, projectId, positionNumber, index ) {
//     let formData = new FormData
//     formData.append("new_video", data);
//     return axios.put(api + `/api/projects/${projectId}/positions/${positionNumber}/${index}/video/`, formData, paramsImg);
// }

// Заполнение проекта данными
function addedVideos() {
    // projectData.value.first_position.forEach((first, index) => {
    //     if (first) {
    //         loadVideo(first, route.params.id, "first", index);
    //     }
    // });

    // projectData.value.second_position.forEach((second, index) => {
    //     if (second) {
    //         loadVideo(second, route.params.id, "second", index);
    //     }
    // });

    // projectData.value.third_position.forEach((theard, index) => {
    //     if (theard) {
    //         loadVideo(theard, route.params.id, "third", index);
    //     }
    // });
    // projectData.value.fourth_position.forEach((four, index) => {
    //     if (four) {
    //         loadVideo(four, route.params.id, "fourth", index);
    //     }
    // });
}
function showClock() {
    clockDialog.value = true;
    console.log(projectData.value);
}
</script>

<style scoped>
.clock-select__buttons {
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
}
</style>