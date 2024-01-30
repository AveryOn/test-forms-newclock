<template>
  <v-card elevation="0" height="95vw" color="white">
    <v-card
      class="d-flex justify-space-between align-center"
      color="white"
      elevation="0"
    >
      <v-card-item class="pa-0 w-25">
        <v-card-title class="pa-4 text-h5">Фото пользователя </v-card-title>
      </v-card-item>
      <v-card-item class="pa-5 w-75 d-flex justify-end align-center">
        <v-btn
          icon="mdi-close"
          size=""
          flat="true"
          elevation="0"
          @click="closeDialog"
        ></v-btn>
      </v-card-item>
    </v-card>
    <v-card color="white" elevation="0" class="pa-4">
      <v-card-title>Альбомы</v-card-title>
      <v-sheet color="white" class="pa-4 pt-0 d-flex flex-wrap">
        <v-card
          class="mr-2 mt-2"
          max-width="248"
          max-height="168"
          v-for="album in albumsArr"
          @click="routerAlbum(album.id)"
        >
          <!--  @click="openAlbum(album)" -->
          <v-sheet class="d-flex pa-2 pb-0">
            <v-img
              class="rounded-lg"
              :src="
                album.cover ??
                'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
              "
              height="100px"
              width="232"
              cover
            >
              <div class="d-flex justify-end pa-2" v-if="album.is_private">
                <v-btn icon="mdi-lock" size="x-small"></v-btn>
              </div>
            </v-img>
          </v-sheet>

          <v-sheet class="d-flex justify-space-between">
            <v-sheet>
              <v-card-title class="pa-2 pt-0 pb-0 text-subtitle-1" v>
                {{ album.name }}
              </v-card-title>
              <v-card-subtitle class="pa-2 pt-0" v-if="album.id > 0">{{
                album.custom_date
                  ? new Date(album.custom_date * 1000).toLocaleDateString()
                  : new Date(album.created * 1000).toLocaleDateString()
              }}</v-card-subtitle>
            </v-sheet>
            <v-sheet>
              <v-card-actions>
                <v-menu
                  v-model="album.active"
                  location="end"
                  v-if="album.id > 0"
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
                        :prepend-icon="
                          !album.is_favorite ? 'mdi-star-outline' : 'mdi-star'
                        "
                        :text="
                          !album.is_favorite
                            ? 'Добавить в избранное'
                            : 'Убрать из избранного'
                        "
                        @click="acceptFavorite(album)"
                      >
                      </v-btn>
                      <v-btn
                        class="text-none d-flex justify-start flex-grow-1 w-100"
                        elevation="0"
                        prepend-icon="mdi-pencil"
                        text="Переименовать"
                        @click="selectAlbum(album)"
                      >
                      </v-btn>
                      <v-btn
                        class="text-none d-flex justify-start flex-grow-1 w-100"
                        elevation="0"
                        prepend-icon="mdi-download"
                        text="Скачать"
                      >
                      </v-btn>
                      <v-btn
                        block
                        class="text-none d-flex justify-start flex-grow-1 w-100"
                        elevation="0"
                        prepend-icon="mdi-delete"
                        text="Удалить"
                        @click="dropAlbum(album.id)"
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

    <v-card color="white" elevation="0" class="pa-4 pt-0">
      <v-card-title>Все файлы</v-card-title>
      <v-card class="pa-4 pt-0" elevation="0" color="white">
        <MasonryDialog @update="updateDataPhotos" :photos="photosArr" />
      </v-card>
    </v-card>
  </v-card>
  <v-dialog v-model="dialog" width="500">
    <v-card color="white" elevation="0" flat>
      <v-form v-model="isFormValid" ref="refAlbumForm" lazy-validation>
        <v-card-title class="pa-6"> Переименовать </v-card-title>
        <v-card-text class="pb-0 pt-0">
          <v-text-field
            v-model="selectAlbumData.name"
            :rules="rulesNull"
            ref="refName"
            validateOn="blur"
            :hide-details="false"
            :error="error"
            :error-messages="errorMessages"
            name="name"
            @change="resetErrors"
          ></v-text-field>
        </v-card-text>
        <v-card-text class="d-flex justify-end pb-5">
          <v-btn variant="text" @click="dialog = false">Отмена</v-btn>
          <v-btn color="primary" class="ml-4" @click="renameAlbum"
            >Сохранить</v-btn
          >
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogAlbum" width="500">
    <v-form v-model="isFormValid" ref="refAlbumForm" lazy-validation>
      <v-card color="white">
        <v-card-title class="pa-6">
          <span>Описание альбома</span> <v-spacer></v-spacer>
          <v-btn
            icon="mdi-close"
            size="x-small"
            flat="true"
            elevation="0"
            @click="dialogAlbum = false"
          ></v-btn>
        </v-card-title>
        <v-card-text class="pb-0 pt-0">
          <v-card-subtitle class="pa-0 pb-1 d-flex align-center"
            ><span>Описание</span> <v-spacer></v-spacer
            ><v-btn
              elevation="0"
              flat="true"
              size="small"
              icon="mdi-pen"
              @click="changeArea = true"
              v-if="!changeArea"
            ></v-btn
          ></v-card-subtitle>
          <v-textarea
            auto-grow
            :variant="!changeArea ? 'underlined' : 'outlined'"
            flat="true"
            :disabled="!changeArea ? true : false"
            rows="1"
            :rules="rules"
            ref="refEmail"
            v-model="selectAlbumData.description"
            :hide-details="false"
            required
            density="compact"
            bg-color="reverse_background"
            color="primary"
            persistent-counter="true"
            :counter="150"
            :counter-value="150"
          ></v-textarea>
          <v-card-subtitle class="pa-0">Владелец</v-card-subtitle>
          <v-card-title class="pa-0 text-subtitle-1">Я</v-card-title>

          <v-card-subtitle class="pa-0 pt-2">Дата</v-card-subtitle>
          <v-card-title class="pa-0 text-subtitle-1">
            {{
              selectAlbumData.custom_date
                ? new Date(
                    selectAlbumData.custom_date * 1000
                  ).toLocaleDateString()
                : new Date(selectAlbumData.created * 1000).toLocaleDateString()
            }}
          </v-card-title>

          <v-checkbox
            label="Приватный альбом"
            color="primary"
            density="compact"
            v-model="selectAlbumData.is_private"
            :disabled="!changeArea ? true : false"
          ></v-checkbox>
        </v-card-text>
        <v-card-text class="d-flex justify-end pb-5" v-if="changeArea">
          <v-btn variant="text" @click="changeArea = false">Отмена</v-btn>
          <v-btn color="primary" class="ml-4" @click="updateAlbum"
            >Сохранить</v-btn
          >
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>

  <v-dialog v-model="dialogDataAlbum" width="500">
    <AlbumDialog @update="updateDataAlbum" />
  </v-dialog>

  <v-dialog v-model="dialogDataPhoto" width="1000">
    <PhotoDialog
      @close="closeDialogDataPhoto"
      :albumsList="albumsArr"
      @update="updateDataAlbum"
    />
  </v-dialog>
</template>
  
  <script setup lang="ts">
import MasonryDialog from "@/components/MasonryDialog.vue";
import AlbumDialog from "@/views/media/components/AlbumDialog.vue";
import PhotoDialog from "@/views/media/components/PhotoDialog.vue";
import router from "@/router";
import { mediaApi } from "@/api/mediaApi";
const { getAlbums, changeAlbum, deleteAlbum, getPhotos } = mediaApi();
const emit = defineEmits(["close", "selectAlbum"]);
const menu = ref(false);
const dialog = ref(false);
const dialogAlbum = ref(false);
const changeArea = ref(false);
const dialogDataAlbum = ref(false);

const dialogDataPhoto = ref(false);

const openDialogPhoto = () => {
  dialogDataPhoto.value = true;
};

const albumData = ref({
  body: null,
});

const albumsArr = ref([]);
const photosArr = ref([]);

const closeDialogDataPhoto = () => {
  dialogDataPhoto.value = false;
};

const closeDialog = () => {
  emit("close");
};

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

const selectAlbumData = ref();
const parentData = ref();
const selectAlbum = (album) => {
  parentData.value = album;
  selectAlbumData.value = { ...parentData.value };
  dialog.value = true;
};

const openAlbum = (album) => {
  parentData.value = album;
  selectAlbumData.value = { ...parentData.value };
  dialogAlbum.value = true;
};

const acceptFavorite = (data) => {
  changeAlbum({ is_favorite: !data.is_favorite }, data.id).then(() => {
    data.is_favorite = !data.is_favorite;
  });
};

onMounted(() => {
  updateDataAlbum();
  updateDataPhotos();
});

const updateAlbum = async () => {
  const { valid } = await refAlbumForm.value.validate();
  if (valid) {
    changeAlbum(selectAlbumData.value, selectAlbumData.value.id).then(() => {
      parentData.value.description = selectAlbumData.value.description;
      parentData.value.is_private = selectAlbumData.value.is_private;
      dialogAlbum.value = false;
      changeArea.value = false;
    });
  }
};

const renameAlbum = async () => {
  const { valid } = await refAlbumForm.value.validate();
  if (valid) {
    changeAlbum(
      { name: selectAlbumData.value.name },
      selectAlbumData.value.id
    ).then(() => {
      parentData.value.name = selectAlbumData.value.name;
      dialog.value = false;
    });
  }
};

const dropAlbum = (id) => {
  deleteAlbum(id).then(() => {
    var index = albumsArr.value
      .map((x) => {
        return x.id;
      })
      .indexOf(id);

    albumsArr.value.splice(index, 1);
  });
};

const refAlbumForm = ref();

const isFormValid = ref(true);

const rules = ref([
  (v: string) => v.length <= 150 || "Максимальная длина описания 150 символов",
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

const routerAlbum = (id) => {
  emit("selectAlbum", id);
};
</script>