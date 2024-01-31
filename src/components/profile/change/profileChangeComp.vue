<template>
    <!-- Контейнер содержит форму для редактирования данных пользователя -->
    <v-card 
    class="profile-change__container" 
    elevation="0" 
    color="background"
    >
        <!-- Форма для редактирования данных пользователя -->
        <v-card 
        class="profile-change" 
        elevation="0" 
        color="background">
            <ProfileCardComp :data="userData" />
            <v-window v-model="tab">

                <!-- ОБЩИЕ ДАННЫЕ (имя, фамилия, д.рожд, пол и тд) -->
                <v-window-item :value="1">
                    <changePersonalComp @update="updateData" :data="userData" />
                </v-window-item>

                <!-- БИОГРАФИЯ / ИНТЕРЕСЫ -->
                <v-window-item :value="2">
                    <changeIntrestingComp @update="updateData" :data="userData" />
                </v-window-item>

                <!--  -->
                <v-window-item :value="3">
                    <changeFamilyComp @update="updateData" :data="userData" />
                </v-window-item>


                <v-window-item :value="4">
                    <changeContactsComp @update="updateData" :data="userData" />
                </v-window-item>
            </v-window>
        </v-card>

        <v-card class="w-20 mt-2" color="background" elevation="0">
            <v-card class="rounded-lg">
                <v-tabs hide-slider direction="vertical" v-model="tab" class="pa-3"
                    selected-class="active-settings-profile__tab">
                    <v-tab density="compact" :value="1">Личные данные</v-tab>
                    <v-tab class="mt-1" density="compact" :value="2">Интересы</v-tab>
                    <v-tab class="mt-1" density="compact" :value="3">Семья</v-tab>
                    <v-tab class="mt-1" density="compact" :value="4">Контакты</v-tab>
                </v-tabs>
            </v-card>
        </v-card>
    </v-card>
</template>

<script setup>
import ProfileCardComp from "../first/ProfileCardComp.vue";
import changePersonalComp from "./changePersonalComp.vue";
import changeIntrestingComp from "./changeIntrestingComp.vue";
import changeFamilyComp from "./changeFamilyComp.vue";
import changeContactsComp from "./changeContactsComp.vue";
// import { profileApi } from "../../api/profileApi";
import { ref, reactive, onMounted } from "vue";

// const { getUser } = profileApi();
const tab = ref(null);

const userData = reactive({
    email: null,
    tel: null,
    fullName: null,
    id: null,
    created: null,
    lastActivity: null,
});
onMounted(() => {
    userData.created = 1706600361105;
    userData.lastActivity = 1706600361105;
    userData.email = 'user@example.com';
    userData.fullName = 'John Doe';
    userData.id = 1;
    userData.tel = '+79997214215';
});
function updateData() {
    console.log('updateData');
}

</script>

<style scoped>
.profile-change__container {
    display: flex;
    justify-content: center;
}
.profile-change {
    width: 50%;
}
.active-settings-profile__tab {
    background: #edeff2;
    color: #415174;
    border: none !important;
}
</style>