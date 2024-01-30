<template>
  <v-card color="white">
    <v-card-title class="pa-6 pb-0">
      <span>Новое желание</span> <v-spacer></v-spacer>
      <v-btn
        icon="mdi-close"
        size="x-small"
        flat="true"
        elevation="0"
        @click="closeDialog"
      ></v-btn>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-form ref="formWish" v-model="formWish">
        <div class="mt-2 d-flex">
          <ImageInputBase removable class="ml-2" v-model="wishData.cover" />
        </div>
        <v-text-field
          class="mt-6"
          ref="refTitle"
          :hide-details="false"
          v-model="wishData.title"
          required
          :error="error"
          density="default"
          bg-color="reverse_background"
          :rules="titleRules"
          name="title"
          validateOn="blur"
          @change="resetErrors"
          placeholder="Название"
        ></v-text-field>

        <v-textarea
          auto-grow
          variant="outlined"
          flat="true"
          rows="1"
          ref="refEmail"
          v-model="wishData.description"
          :hide-details="false"
          required
          placeholder="Описание"
          bg-color="reverse_background"
          color="primary"
          persistent-counter="true"
        ></v-textarea>

        <v-text-field
          ref="refTitle"
          :hide-details="false"
          v-model="wishData.price"
          required
          density="default"
          bg-color="reverse_background"
          name="price"
          validateOn="blur"
          placeholder="Цена, ₽"
        ></v-text-field>

        <v-text-field
          ref="refTitle"
          :hide-details="false"
          v-model="wishData.link"
          required
          density="default"
          bg-color="reverse_background"
          name="link"
          validateOn="blur"
          placeholder="Добавить ссылку"
        ></v-text-field>

        <v-select
          v-if="!route.params?.id"
          ref="refPatronymic"
          required
          validateOn="blur"
          v-model="wishData.wishlist_id"
          :hide-details="false"
          density="default"
          bg-color="reverse_background"
          name="wishlist_id"
          placeholder="Вишлист"
          :items="props.wishlistList"
          item-title="title"
          item-value="id"
          variant="outlined"
        ></v-select>

        <!-- <v-btn
          v-if="!route.params?.id"
          variant="text"
          density="compact"
          class="text-none text-primary font-weight-bold"
          >Создать новый вишлист</v-btn
        > -->
      </v-form>
    </v-card-text>
    <v-card-text class="d-flex pb-5">
      <v-spacer></v-spacer>
      <v-btn variant="text" @click="closeDialog">Отмена</v-btn>
      <v-btn
        v-if="!wishData.id"
        color="primary"
        class="ml-4 text-none"
        @click="addedetWhish"
        >Создать</v-btn
      >
      <v-btn
        v-else
        color="primary"
        class="ml-4 text-none"
        @click="changeWishData"
        >Сохранить</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { wishlistApi } from "../../../api/wishlistApi";
import ImageInputBase from "../../../components/ImageInputs/ImageInputBase.vue";
import { useRoute } from "vue-router";
const { createWish, changeWishImage, changeWish } = wishlistApi();
const route = useRoute();
const emit = defineEmits(["update", "openSelectWishDialog", "close"]);
const props = defineProps({
  wishlistList: {
    type: Array,
    default: () => [{ id: null, name: "Все альбомы" }],
  },
  selectWishDataClose: {
    type: Object,
    default: () => ({
      cover: null,
      title: null,
      description: null,
      price: null,
      link: null,
      wishlist_id: null,
    }),
  },
});

const wishData = ref({
  cover: null,
  title: null,
  description: null,
  price: null,
  link: null,
  wishlist_id: null,
});

watch(() => {
  if (props.selectWishDataClose) {
    wishData.value = { ...props.selectWishDataClose };
    wishData.value.wishlist_id = wishData.value?.wishlist?.id;
  }
});

const changeWishData = async () => {
  const { valid } = await formWish.value.validate();
  if (valid) {
    if (!route.params?.id) {
      if (wishData.value.wishlist_id == 0) wishData.value.wishlist_id = null;
      changeWish(wishData.value, wishData.value.id).then((r) => {
        changeWishImage(wishData.value.cover, r.data.data.id).then((l) => {
          wishData.value = l.data.data;
          emit("update");
          openDialogSelect();
        });
      });
    } else {
      wishData.value.wishlist_id = route.params.id;
      if (wishData.value.wishlist_id == 0) wishData.value.wishlist_id = null;
      changeWish(wishData.value, wishData.value.id).then((r) => {
        changeWishImage(wishData.value.cover, r.data.data.id).then((l) => {
          wishData.value = l.data.data;
          emit("update");
          openDialogSelect();
        });
      });
    }
  }
};

const addedetWhish = async () => {
  const { valid } = await formWish.value.validate();
  if (valid) {
    if (!route.params?.id) {
      if (wishData.value.wishlist_id == 0) wishData.value.wishlist_id = null;
      createWish(wishData.value).then((r) => {
        changeWishImage(wishData.value.cover, r.data.data.id).then((l) => {
          wishData.value = l.data.data;
          emit("update");
        });
      });
    } else {
      wishData.value.wishlist_id = route.params.id;
      if (wishData.value.wishlist_id == 0) wishData.value.wishlist_id = null;
      createWish(wishData.value).then((r) => {
        changeWishImage(wishData.value.cover, r.data.data.id).then((l) => {
          wishData.value = l.data.data;
          emit("update");
        });
      });
    }
  }
};

const openDialogSelect = () => {
  props.selectWishDataClose = {};
  console.log(props.selectWishDataClose);
  emit("openSelectWishDialog", wishData.value);
};

const titleRules = ref([(v: string) => !!v || "Обязательное поле"]);
const formWish = ref(null);
const error = ref(false);
const errorMessages = ref("");
const resetErrors = () => {
  error.value = false;
  errorMessages.value = "";
};

const closeDialog = () => {
  emit("close");
};
</script>