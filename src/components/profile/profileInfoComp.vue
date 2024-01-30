<template>
    <v-card elevation="0" color="background" class="d-flex justify-center">
        <v-card elevation="0" class="w-50">

            <!-- ProfileCard -->
            <ProfileCard v-if="userData" :data="userData" />

            <!-- Вкладки для выбора Фото и Списка желаний(Вишлист) -->
            <v-card color="background" elevation="0" class="pa-2">
                <v-card class="pl-4 pr-4 rounded-lg">
                    <v-tabs color="primary" density="compact" v-model="tab">
                        <v-tab class="tab" :value="1">Фото</v-tab>
                        <v-tab class="tab" :value="2">Вишлист</v-tab>
                    </v-tabs>
                    <v-divider></v-divider>
                    <v-window v-model="tab">
                        <v-window-item :value="1" class="pa-2">
                            <ProfileImages />
                        </v-window-item>
                        <v-window-item :value="2">
                            <!-- <ProfileWishlist /> -->
                            ProfileWishlist
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-card>
            <!-- <WhatIsNew /> -->
        </v-card>
        <v-card elevation="0" color="background" class="w-20">
            <!-- <LogsProfile /> -->
            <!-- <FamilyCard /> -->
        </v-card>
    </v-card>
</template>
  
<script setup>
import { ref, reactive, onMounted } from "vue";
import ProfileCard from "./first/ProfileCard.vue";
  import ProfileImages from "./first/ProfileImages.vue";
//   import ProfileWishlist from "./components/ProfileWishlist.vue";
//   import WhatIsNew from "@/components/WhatIsNew.vue";
//   import LogsProfile from "@/components/LogsProfile.vue";
//   import FamilyCard from "@/components/FamilyCard.vue";
//   import { profileApi } from "../../api/profileApi";
// const { getUser } = profileApi();

const userData = reactive({
    email: null,
    tel: null,
    fullName: null,
    id: null,
    created: null,
    lastActivity: null,
});
onMounted(() => {
    // getUser().then((r) => {
    //   userData.value = r.data.data;
    //   console.log(r.data.data);
    // });
    userData.created = 1706600361105;
    userData.lastActivity = 1706600361105;
    userData.email = 'user@example.com';
    userData.fullName = 'John Doe';
    userData.id = 1;
    userData.tel = '+79997214215';
});
const tab = ref(null);
</script>

<style scoped>
.tab {
    font-family: "Nunito Sans", sans-serif !important;
    font-size: 12px !important;
}
</style>