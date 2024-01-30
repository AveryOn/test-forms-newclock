<template>
  <v-card color="white">
    <v-card-title class="pa-6">
      <span>Создание вишлиста</span> <v-spacer></v-spacer>
      <v-btn
        icon="mdi-close"
        size="x-small"
        flat="true"
        elevation="0"
        @click="closeDialog"
      ></v-btn>
    </v-card-title>
    <v-card-text>
      <v-form v-model="isFormValid" ref="refAlbumForm" lazy-validation>
        <v-card-subtitle class="pa-0 pb-2">Название</v-card-subtitle>
        <v-text-field
          ref="refName"
          validateOn="blur"
          :hide-details="false"
          v-model="wishlistData.title"
          required
          density="default"
          bg-color="reverse_background"
          :rules="rulesNull"
          :error="error"
          :error-messages="errorMessages"
          name="name"
          @change="resetErrors"
        ></v-text-field>

        <v-checkbox
          color="primary"
          hide-details=""
          class="pa-0 ma-0"
          density="compact"
          label="Отображать вишлист только семье"
          v-model="wishlistData.is_secret"
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-text class="d-flex justify-end pb-5">
      <v-btn variant="text" @click="closeDialog">Отмена</v-btn>
      <v-btn color="primary" class="ml-4" @click="addedetWishlist"
        >Сохранить</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { wishlistApi } from "../../../api/wishlistApi";
import { watch } from "vue";

const emit = defineEmits(["update"]);
const props = defineProps({
  dataWishlist: {
    type: Object,
    default: () => ({
      id: null,
      title: null,
      is_secret: false,
      author_ids: [],
    }),
  },
});

const { createWishlist, changeWishlist } = wishlistApi();

const refAlbumForm = ref();

const isFormValid = ref(true);

const addedetWishlist = async () => {
  const { valid } = await refAlbumForm.value.validate();
  if (valid) {
    if (!wishlistData.value.id) {
      createWishlist(wishlistData.value).then(() => {
        emit("update");
      });
    } else {
      delete wishlistData.value.wishes;
      delete wishlistData.value.created;
      delete wishlistData.value.active;
      delete wishlistData.value.cover;
      changeWishlist(wishlistData.value, wishlistData.value.id).then(() => {
        emit("update");
      });
    }
  }
};

const wishlistData = ref({
  title: null,
  is_secret: false,
  author_ids: [],
});

const updateBirthtime = (date, assignObject) => {
  assignObject.custom_date = date;
};

const rules = ref([
  (v: string) =>
    (v && v.length <= 150) || "Максимальная длина описания 150 символов",
]);

const rulesNull = ref([
  (v: string) => (v && v.length > 0) || "Это обязательное поле",
]);

const error = ref(false);
const errorMessages = ref("");
const resetErrors = () => {
  error.value = false;
  errorMessages.value = "";
};

const closeDialog = () => {
  emit("close");
};

watch(() => {
  if (props.dataWishlist.id) {
    wishlistData.value = props.dataWishlist;
  }
});
</script>