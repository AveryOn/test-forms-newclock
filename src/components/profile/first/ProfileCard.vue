<template>
    <v-card class="profile-card__container" color="background" elevation="0">
        <v-card class="profile-card">

            <!-- Компонент для загрузки или создания аватарки -->
            <v-card v-if="false" class="pa-0" flat elevation="0" >
                <ImageInputBaseCircle @loadPhoto="loadingPhoto"/>
            </v-card>

            <!-- Шаблон отображает аватарку или заглушку в случае если аватарки нет -->
            <template v-else>
                <v-avatar v-if="props.data?.avatar" :image="props.data.avatar" size="152"></v-avatar>
                <img v-else class="avatar-stab" src="@/assets/base/empty-user.svg" alt="avatar-stab"  />
            </template>

            <!-- Блок взаимодействия с карточкой пользователя -->
            <v-card class="block-actions">

                <!-- Полное имя пользователя -->
                <v-card-title class="profile-card__fullname">
                    {{ props.data?.fullName }}
                </v-card-title>

                <!-- Кнопки `Подробнее` -->
                <v-card-actions class="d-flex align-center">

                    <!-- Кнопка Подробнее (о местоположении) -->
                    <v-btn variant="text" class="text-subtitle-2 ml-2">
                        <v-icon class="mr-2">
                            mdi-google-maps
                        </v-icon>
                        Подробнее
                    </v-btn>
                    <!-- Кнопка Подробнее (о аккаунте пользователя) -->
                    <v-btn @click="dialog = !dialog" variant="text" class="text-subtitle-2 ml-2">
                        <v-icon class="mr-2">
                            mdi-information-outline
                        </v-icon>
                        Подробнее
                    </v-btn>
                </v-card-actions>

                <v-card-actions>
                    <!-- Кнопка Редактировать профиль -->
                    <v-btn class="edit-btn text-text text-subtitle-1" variant="tonal">
                        Редактировать профиль
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

        <!-- Диалоговое окно для просмотра информации о пользователе -->
        <v-dialog class="profile-card__information-dialog" v-model="dialog">
            <InformationCard :data="props.data" @close="close" />
        </v-dialog>
    </v-card>
</template>

<script setup>
import InformationCard from "../second/InformationCard.vue";
import ImageInputBaseCircle from "../second/imageInputBaseCircle.vue";
import { ref, defineProps } from "vue";
// import { profileApi } from "@/api/profileApi";
// import { useRoute } from "vue-router";
// const route = useRoute();
// const { changeAvatarUser } = profileApi();

// Приходит объект с данными пользователя
const props = defineProps({
    data: Object,
});
// const userData = ref({});
const dialog = ref(false);

function loadingPhoto(photo) {
    // changeAvatarUser(userData.value.avatar);
    console.log(photo);
}
function close() {
    dialog.value = false;
}
</script>

<style scoped>
.profile-card__container {
    font-family: "Nunito Sans", sans-serif !important;
    padding: 2px;
}
.profile-card {
    display: flex !important;
    padding: 16px 16px 16px 40px !important;
    border-radius: 8px !important;
}
.block-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: none !important;
    padding: 12px !important;
}
.avatar-stab {
    width: 152px;
}
.edit-btn {
    font-family: "Nunito Sans", sans-serif !important;
}
.profile-card__information-dialog {
    width: 650px;
}
</style>