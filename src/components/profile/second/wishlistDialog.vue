<template>
  <v-card elevation="0" height="95vw">
    <v-card
      class="d-flex justify-space-between align-center"
      color="white"
      elevation="0"
    >
      <v-card-item class="pa-0 w-25">
        <v-card-title class="pa-4 text-h5">Желания пользователя </v-card-title>
      </v-card-item>
      <v-card-item class="pa-5 w-75 d-flex justify-end align-center">
        <v-btn
          icon="mdi-close"
          size=""
          flat="true"
          elevation="0"
          @click="closeThisDialog"
        ></v-btn>
      </v-card-item>
    </v-card>
    <v-card color="white" elevation="0">
      <v-card-title class="text-subtitle-1 pb-0">Вишлисты</v-card-title>
      <v-sheet color="white" class="pa-4 pt-0 d-flex flex-wrap">
        <v-card
          class="mr-2 mt-2"
          max-width="248"
          max-height="168"
          v-for="whish in wishlistArr"
          @click="routerAlbum(whish.id)"
        >
          <!--  @click="openAlbum(album)" -->
          <v-sheet class="d-flex pa-2 pb-0">
            <v-img
              class="rounded-lg"
              :src="
                whish.cover ??
                `https://cdn.vuetifyjs.com/images/cards/sunshine.jpg`
              "
              height="100px"
              width="232"
              cover
            >
              <div class="d-flex justify-end pa-2" v-if="whish.is_secret">
                <v-btn icon="mdi-lock" size="x-small"></v-btn>
              </div>
            </v-img>
          </v-sheet>

          <v-sheet class="d-flex justify-space-between align-center">
            <v-sheet>
              <v-card-title class="pa-2 pt-0 pb-0 text-subtitle-1" v>
                {{ whish.title }}
              </v-card-title>
            </v-sheet>
            <v-sheet>
              <v-card-actions>
                <v-menu
                  v-if="whish.id != 0"
                  v-model="whish.active"
                  location="end"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon="mdi-dots-vertical"
                      density="compact"
                      size="small"
                      v-bind="props"
                    >
                    </v-btn>
                  </template>

                  <v-card min-width="230">
                    <v-list class="d-flex flex-column align-start">
                      <v-btn
                        class="text-none d-flex justify-start flex-grow-1 w-100"
                        elevation="0"
                        prepend-icon="mdi-pencil"
                        text="Изменить"
                        @click="selectWishlist(whish)"
                      >
                      </v-btn>
                      <v-btn
                        class="text-none d-flex justify-start flex-grow-1 w-100"
                        elevation="0"
                        prepend-icon="mdi-share-outline"
                        text="Поделиться"
                        @click="selectAlbum(whish)"
                      >
                      </v-btn>
                      <v-btn
                        block
                        class="text-none d-flex justify-start flex-grow-1 w-100"
                        elevation="0"
                        prepend-icon="mdi-delete"
                        text="Удалить"
                        @click="dropWishlist(whish.id)"
                      >
                      </v-btn>
                    </v-list>

                    <v-divider></v-divider>
                  </v-card>
                </v-menu>
              </v-card-actions>
            </v-sheet>
          </v-sheet>
        </v-card>
      </v-sheet>
    </v-card>

    <v-card color="white" elevation="0">
      <v-card-title class="text-subtitle-1 pb-0">Все желания</v-card-title>
      <v-card class="pa-4 pt-0 d-flex flex-wrap align-start" flat color="white">
        <v-card-item
          v-for="whish in wishArr"
          class="pa-0 mt-2 mr-2 pointer"
          @click="selecetWish(whish)"
          style="width: 186px !important"
        >
          <v-img
            class="rounded-lg"
            :width="186"
            cover
            :aspect-ratio="1"
            :src="
              whish.cover ??
              'https://cdn.vuetifyjs.com/images/parallax/material.jpg'
            "
          ></v-img>
          <v-card-tilte class="text-subtitle-2 pb-0">
            {{ whish.title }}
          </v-card-tilte>
          <v-card-subtitle class="text-subtitle-2 pt-0">
            {{ whish.price ? whish.price + `₽` : "0 ₽" }}
          </v-card-subtitle>
        </v-card-item>
      </v-card>
    </v-card>
  </v-card>
  <v-dialog v-model="dialogDataWishlist" width="500">
    <WishlistDialog
      @close="closeDialogWishlist"
      @update="updateDataWishlist"
      :dataWishlist="selectWishlistData"
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

  <v-dialog v-model="dialogWishSelect" width="1000">
    <WhishDialogSelect
      @close="closeDialogSelectWish"
      @update="updateDataPhotos"
      @openChangeDialogWish="openChangeDialogWish"
      :dataWish="selectWishData"
    />
  </v-dialog>
</template>
  
<script setup lang="ts">
import router from "@/router";
import { wishlistApi } from "@/api/wishlistApi";
import WishlistDialog from "@/views/wishlist/components/WishlistDialog.vue";
import WhishDialog from "@/views/wishlist/components/WhishDialog.vue";
import WhishDialogSelect from "@/views/wishlist/components/WhishDialogSelect.vue";
const { getWishlists, changeAlbum, deleteWishlist, getWishes } = wishlistApi();

const emit = defineEmits(["close", "openSelectWish"]);

const dialog = ref(false);
const dialogAlbum = ref(false);
const changeArea = ref(false);
const dialogDataWishlist = ref(false);

const dialogDataPhoto = ref(false);

const openDialogPhoto = () => {
  dialogDataPhoto.value = true;
  selectWishDataClose.value = {};
};

const wishlistArr = ref([]);
const wishArr = ref([]);

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

const updateDataPhotos = () => {
  getWishes().then((r) => {
    wishArr.value = r.data.data;
  });
};

const dialogWishSelect = ref(false);
const selectWishData = ref(null);
const selecetWish = (data) => {
  dialogWishSelect.value = true;
  selectWishData.value = data;
};

const selectWishlistData = ref();
const selectWishlist = (wish) => {
  selectWishlistData.value = { ...wish };
  dialogDataWishlist.value = true;
};

onMounted(() => {
  updateDataWishlist();
  updateDataPhotos();
});

const dropWishlist = (id) => {
  deleteWishlist(id).then(() => {
    updateDataPhotos();
    var index = wishlistArr.value
      .map((x) => {
        return x.id;
      })
      .indexOf(id);

    wishlistArr.value.splice(index, 1);
  });
};

const selectWishDataClose = ref();
const openChangeDialogWish = () => {
  dialogWishSelect.value = false;
  selectWishDataClose.value = selectWishData.value;
  dialogDataPhoto.value = true;
};

const openSelectWishDialog = (data) => {
  dialogDataPhoto.value = false;
  selecetWish(data);
};

const routerAlbum = (id) => {
  emit("openSelectWish", id);
};

const closeThisDialog = () => {
  emit("close");
};

const closeDialogSelectWish = () => {
  dialogWishSelect.value = false;
};
const closeDialogWishlist = () => {
  dialogDataWishlist.value = false;
};
const closeDialogWish = () => {
  dialogDataPhoto.value = false;
};
</script>