<template>
  <v-row class="pa-3">
    <template v-for="(n, index) in wishesArr">
      <v-col
        v-if="index <= 7"
        :key="index"
        class="d-flex flex-column"
        cols="3"
        @click="selecetWish(n)"
      >
        <v-img
          :src="
            n.cover ?? `https://cdn.vuetifyjs.com/images/cards/sunshine.jpg`
          "
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          aspect-ratio="1"
          cover
          class="bg-grey-lighten-2 rounded-xl"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey-lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div
          class="text-subtitle-2 pa-0"
          style="
            white-space: nowrap;
            max-width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          {{ n.title }}
        </div>
        <div class="text-subtitle-2 pa-0 text-sub">{{ n.price }} ₽</div>
      </v-col>
    </template>
  </v-row>

  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      variant="tonal"
      class="text-text text-none"
      @click="wishlistDialogActive = true"
      >Посмотреть все</v-btn
    >
    <v-btn variant="tonal" class="text-text text-none" @click="openDialogPhoto"
      >Добавить желание</v-btn
    >
  </v-card-actions>

  <v-dialog v-model="dialogWishSelect" width="1000">
    <WhishDialogSelect
      @close="closeDialogSelectWish"
      @update="updateDataPhotos"
      :dataWish="selectWishData"
      @openChangeDialogWish="openChangeDialogWish"
    />
  </v-dialog>

  <v-dialog v-model="dialogDataPhoto" width="500">
    <WhishDialog
      @close="closeDialogWish"
      @update="updateDataPhotos"
      @openSelectWishDialog="openSelectWishDialog"
      :wishlistList="wishlistArr"
      :selectWishDataClose="selectWishDataClose"
    />
  </v-dialog>

  <v-dialog width="100vw" v-model="wishlistDialogActive">
    <wishlistDialog
      @openSelectWish="openSelectWhishlist"
      @close="closeWishlistDialog"
    ></wishlistDialog>
  </v-dialog>
  <v-dialog width="100vw" v-model="selectWishlistDialogActive">
    <selectWishlistDialog
      :wishlistId="selectWhislistId"
      @close="closeSelectWishlistDialog"
    ></selectWishlistDialog>
  </v-dialog>
</template>

<script lang="ts" setup>
import { wishlistApi } from "@/api/wishlistApi";
import WhishDialogSelect from "../../wishlist/components/WhishDialogSelect.vue";
import WhishDialog from "../../wishlist/components/WhishDialog.vue";
import wishlistDialog from "@/components/Profile/Dialogs/wishlistDialog.vue";
import selectWishlistDialog from "@/components/Profile/Dialogs/selectWishlistDialog.vue";
const { getWishes, getWishlists } = wishlistApi();

const wishesArr = ref([]);
const updateDataPhotos = () => {
  getWishes().then((r) => {
    wishesArr.value = r.data.data;
  });
};

onMounted(() => {
  updateDataPhotos();
  updateDataWishlist();
});

const dialogWishSelect = ref(false);
const selectWishData = ref(null);
const selecetWish = (data) => {
  selectWishData.value = data;
  dialogWishSelect.value = true;
};
const closeDialogSelectWish = () => {
  dialogWishSelect.value = false;
};

const dialogDataWishlist = ref(false);
const openSelectWishDialog = (data) => {
  console.log(data);
  dialogDataPhoto.value = false;
  selecetWish(data);
};

const wishlistArr = ref([]);
const updateDataWishlist = () => {
  getWishlists().then((r) => {
    wishlistArr.value = r.data.data;
    wishlistArr.value.splice(0, 0, {
      id: 0,
      title: "Все желания",
      is_secret: true,
      cover:
        "https://fikiwiki.com/uploads/posts/2022-02/1644855639_6-fikiwiki-com-p-kartinki-khd-kachestva-6.jpg",
    });
  });
};

const selectWishDataClose = ref();

const dialogDataPhoto = ref(false);
const openChangeDialogWish = () => {
  dialogWishSelect.value = false;
  selectWishDataClose.value = selectWishData.value;
  dialogDataPhoto.value = true;
};
const openDialogPhoto = () => {
  dialogDataPhoto.value = true;
  selectWishDataClose.value = {};
};
const closeDialogWish = () => {
  dialogDataPhoto.value = false;
};

const wishlistDialogActive = ref(false);

const selectWishlistDialogActive = ref(false);

const selectWhislistId = ref(null);
const openSelectWhishlist = (id) => {
  wishlistDialogActive.value = false;
  selectWhislistId.value = id;
  selectWishlistDialogActive.value = true;
};

const closeWishlistDialog = () => {
  wishlistDialogActive.value = false;
};
const closeSelectWishlistDialog = () => {
  selectWishlistDialogActive.value = false;
  wishlistDialogActive.value = true;
};
</script>