<template>
  <v-card color="white">
    <v-card class="d-flex" flat>
      <v-card-text class="w-50 pr-0">
        <v-img
          class="rounded-lg"
          width="464"
          :src="
            whishData.cover ??
            'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
          "
        ></v-img>
        <v-btn
          flat
          variant="text"
          color="primary"
          class="bg-background mt-2 text-none"
          prepend-icon="mdi-link"
          ><a
            style="
              white-space: nowrap;
              max-width: 400px;
              overflow: hidden;
              text-overflow: ellipsis;
            "
            target="_blank"
            :href="whishData.link"
            >{{ whishData.link }}</a
          ></v-btn
        >
      </v-card-text>
      <v-card-text class="w-50 pa-0 pl-0">
        <v-card-text class="pl-0 pt-2 d-flex justify-space-between">
          <v-sheet class="pl-0">
            <v-btn flat size="1" icon="mdi-share-variant-outline"></v-btn>
            <!--  <v-btn flat size="1" icon="mdi-dots-vertical" class="ml-10"></v-btn> -->
            <v-menu v-model="whishData.active" location="end">
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-dots-vertical"
                  density="compact"
                  size="1"
                  v-bind="props"
                  flat
                  class="ml-9"
                >
                </v-btn>
              </template>

              <v-card min-width="230" class="ml-4">
                <v-list class="d-flex flex-column align-start">
                  <v-btn
                    class="text-none d-flex justify-start flex-grow-1 w-100"
                    elevation="0"
                    prepend-icon="mdi-pencil"
                    text="Изменить"
                    @click="openChange"
                  >
                  </v-btn>
                  <v-btn
                    block
                    class="text-none d-flex justify-start flex-grow-1 w-100"
                    elevation="0"
                    prepend-icon="mdi-delete"
                    text="Удалить"
                    @click="dropWish(whishData.id)"
                  >
                  </v-btn>
                </v-list>

                <v-divider></v-divider>
              </v-card>
            </v-menu>
          </v-sheet>
          <v-btn
            icon="mdi-close"
            size="1"
            flat="true"
            elevation="0"
            class="mt-3 mr-4"
            @click="closeDialog"
          ></v-btn>
        </v-card-text>
        <v-card-subtitle class="pa-0 mt-9">{{
          whishData.wishlist?.title ?? "Все желания"
        }}</v-card-subtitle>
        <v-card-title class="pa-0 mt-1">{{ whishData.title }}</v-card-title>
        <v-card-subtitle class="pa-0 mt-10">Комментарий</v-card-subtitle>
        <v-card-text class="pa-0 mt-1" style="width: 400px">{{
          whishData.description
        }}</v-card-text>
        <v-card-subtitle class="pa-0 mt-10">Цена</v-card-subtitle>
        <v-card-title class="pa-0">{{ whishData.price }} ₽</v-card-title>
      </v-card-text>
    </v-card>
    <v-card class="d-flex" flat>
      <v-card-text class="w-50">
        <v-btn color="primary">Забронировать</v-btn>
        <v-card-text>Забронировано</v-card-text>
        <v-btn color="primary">Подарили</v-btn>
        <v-card-text>Подарено</v-card-text>
      </v-card-text>
      <v-card-text class="d-flex align-start w-50">
        <v-avatar
          class="text-white"
          size="52"
          image="https://рукодер.рф/wp-content/uploads/2021/10/9720e7b938b7e47320c9b8e0b3130dfe.jpg"
        >
        </v-avatar>
        <v-sheet class="ml-4">
          <v-card-title class="pa-0">Алла Смирнова</v-card-title>
          <v-card-subtitle class="pa-0">23.08.2023 10:30</v-card-subtitle>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import { wishlistApi } from "../../../api/wishlistApi";

const props = defineProps({
  dataWish: {
    type: Object,
  },
});
const emit = defineEmits(["update", "openChangeDialogWish", "close"]);

const dropWish = (id) => {
  deleteWish(id).then(() => {
    emit("update");
  });
};

const { deleteWish } = wishlistApi();

const whishData = ref({
  cover: null,
  created: null,
  description: null,
  id: null,
  is_fulfilled: null,
  link: null,
  price: null,
  title: null,
  user: null,
  wishlist_id: null,
});

const openChange = () => {
  emit("openChangeDialogWish");
};

const closeDialog = () => {
  emit("close");
};

watch(() => {
  whishData.value = props.dataWish;
});
</script>