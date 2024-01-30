<template>
    <v-card class="profile-card" color="background" elevation="0">
        <v-card class="d-flex pa-4 rounded-lg">
            <v-card class="pa-0" flat elevation="0" v-if="false">
                <ImageInputBaseCircle @loadPhoto="loadingPhoto" />
            </v-card>
            <template v-else>
                <v-avatar v-if="props.data?.avatar" :image="props.data.avatar" size="152"></v-avatar>
                <img v-else class="avatar-stab" src="@/assets/base/empty-user.svg" alt="avatar-stab"  />
            </template>
            <v-card class="block-actions">
                <v-card-title class="pa-1">{{
                    (props.data?.first_name ?? "") + " " + (props.data?.last_name ?? "")
                }}</v-card-title>
                <v-card-actions class="d-flex align-center">
                    <v-text><v-icon class="mr-2">mdi-google-maps</v-icon>Подробнее</v-text>
                    <v-btn @click="dialog = !dialog" variant="text" class="text-subtitle-2 ml-2"><v-icon
                            class="mr-2">mdi-information-outline</v-icon>Подробнее</v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn variant="tonal" class="edit-btn text-text text-subtitle-1" :to="'change'">Редактировать профиль</v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

        <v-dialog v-model="dialog" width="650">
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
.profile-card {
    font-family: "Nunito Sans", sans-serif !important;
    padding: 2px;
}
.block-actions {
    box-shadow: none !important;
    padding: 12px !important;
}
.avatar-stab {
    width: 152px;
}
.edit-btn {
    font-family: "Nunito Sans", sans-serif !important;
}
</style>