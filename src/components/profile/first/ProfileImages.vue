<template>
  <v-row class="pa-3">
    <template v-for="(n, index) in photosArr">
      <v-col v-if="index <= 7" :key="index" class="d-flex child-flex" cols="3">
        <v-img
          :src="n.url"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          aspect-ratio="1"
          cover
          class="bg-grey-lighten-2 pointer"
          @click="previewImg(n)"
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
      </v-col>
    </template>
  </v-row>

  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      variant="tonal"
      class="text-text text-none"
      @click="albumsUserDialog = true"
      >Посмотреть все</v-btn
    >
    <v-btn
      variant="tonal"
      class="text-text text-none"
      @click="dialogDataPhoto = true"
      >Загрузить фото</v-btn
    >
  </v-card-actions>

  <v-dialog v-model="dialogDataPhoto" width="1000">
    <PhotoDialog
      @close="closeDialogDataPhoto"
      :albumsList="albumsArr"
      @update="updateDataAlbum"
    />
  </v-dialog>

  <v-dialog
    v-model="imgOverlay"
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex align-center justify-center w-100"
    width="1000"
  >
    <v-card>
      <v-card
        class="pa-3 d-flex align-start justify-space-between"
        rounded="0"
        color="#3C3C3C"
      >
        <div class="d-flex">
          <v-card-text class="pa-0 pr-2 text-white">Фото</v-card-text>
          <v-card-text class="pa-0 pr-2 text-white">{{
            img.address
          }}</v-card-text>
          <v-card-text class="pa-0 text-white">{{
            img.happened
              ? new Date(img.happened * 1000).toLocaleDateString()
              : new Date(img.created * 1000).toLocaleDateString()
          }}</v-card-text>
        </div>
        <v-spacer></v-spacer>
        <v-btn
          class="pa-0 text-white"
          variant="text"
          density="compact"
          @click="deleteSelectPhoto"
          >Удалить</v-btn
        >
      </v-card>
      <v-img
        :src="img.url"
        class="d-flex flex-column flex-center justify-center"
      >
      </v-img>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="albumsUserDialog"
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex align-center justify-center w-100"
    width="100vw"
    height="vw"
  >
    <albumsUser
      @selectAlbum="selectAlbumInDialog"
      @close="closeAlbumsDialog"
    ></albumsUser>
  </v-dialog>
  <v-dialog
    v-model="albumsSelectUserDialog"
    location-strategy="connected"
    scroll-strategy="none"
    class="d-flex align-center justify-center w-100"
    width="100vw"
    height="vw"
  >
    <selectAlbumsUser
      :idAlbum="selectAlbumId"
      @close="closeAlbumsSelectDialog"
    ></selectAlbumsUser>
  </v-dialog>
</template>

<script setup lang="ts">
import { mediaApi } from "../../../api/mediaApi.js";
import PhotoDialog from "../../../views/media/components/PhotoDialog.vue";
import albumsUser from "@/components/Profile/Dialogs/albumsUser.vue";
import selectAlbumsUser from "@/components/Profile/Dialogs/selectAlbumsUser.vue";
const { getPhotos, getAlbums, deletePhotos } = mediaApi();
const photosArr = ref();
const albumsArr = ref();
const dialogDataPhoto = ref(false);

const deleteSelectPhoto = () => {
  deletePhotos(img.value.id).then(() => {
    updateDataPhotos();
    imgOverlay.value = false;
  });
};
const albumsSelectUserDialog = ref(false);
const closeAlbumsSelectDialog = () => {
  albumsSelectUserDialog.value = false;
  albumsUserDialog.value = true;
};
const albumsUserDialog = ref(false);
const closeAlbumsDialog = () => {
  albumsUserDialog.value = false;
};

const selectAlbumId = ref(null);
const selectAlbumInDialog = (album_id) => {
  closeAlbumsDialog();
  selectAlbumId.value = album_id;
  albumsSelectUserDialog.value = true;
};

const img = ref(null);
const previewImg = (item) => {
  img.value = item;
  imgOverlay.value = true;
};

const closeDialogDataPhoto = () => {
  dialogDataPhoto.value = false;
};

const imgOverlay = ref(false);

const updateDataAlbum = () => {
  getAlbums().then((r) => {
    albumsArr.value = r.data.data;
    albumsArr.value.splice(0, 0, { id: 0, name: "Все фото" });
  });
};

const updateDataPhotos = () => {
  getPhotos().then((r) => {
    photosArr.value = r.data.data;
  });
};

onMounted(() => {
  updateDataPhotos();
  updateDataAlbum();
});
</script>