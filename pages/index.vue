<template>
  <v-container fluid class="pa-0">
    <v-row class="mt-12" justify="center">
      <v-col cols="3">
        <!-- <image-viewer-dialog
          :coordinates="coordinates"
          :src="image.src"
          :dialog="dialog"
          @close="closeDialog"
          @cropped="handleCroppedImage"
        /> -->
        <a class="btn" @click="toggleShow">set avatar</a>
        <vue-cropper
          field="img"
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          :width="300"
          :height="300"
          url="/upload"
          :params="params"
          :headers="headers"
          img-format="png"
        ></vue-cropper>
        <img :src="imgDataUrl" />

        <!-- <vue-cropper ref="cropper" src="/seki.png" alt="Source Image">
        </vue-cropper> -->

        <!-- <div>
          <v-menu v-model="menu" :close-on-content-click="false" offset-y>
            <template v-slot:activator="{ on }">
              <v-img
                ref="cropper"
                style="
                  border-radius: 50%;
                  border: 5px solid #89c7bc;
                  cursor: pointer;
                "
                :src="croppedImage ?? defaultImage"
                alt="seki"
                v-on="on"
              />

              

            </template>
            <v-list>
              <v-list-item @click="$refs.file.click()">
                <v-list-item-title>Upload a Photo</v-list-item-title>

                <input
                  type="file"
                  ref="file"
                  @change="loadImage($event)"
                  accept="image/*"
                  style="display: none"
                />
              </v-list-item>
              <v-list-item @click="reset()">
                <v-list-item-title>Remove a Photo</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div> -->
      </v-col>
    </v-row>

    <!-- <v-row justify="center">
      <v-btn @click="this.$refs.cropper.rotate(45)">KIM</v-btn>
    </v-row> -->
  </v-container>
</template>

<script>
// This function is used to detect the actual image type,
function getMimeType(file, fallback = null) {
  const byteArray = new Uint8Array(file).subarray(0, 4);
  let header = "";
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16);
  }
  switch (header) {
    case "89504e47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      return "image/jpeg";
    default:
      return fallback;
  }
}

export default {
  layout: "default",

  data() {
    return {
      show: true,
      params: {
        token: "123456798",
        name: "avatar",
      },
      headers: {
        smail: "*_~",
      },
      imgDataUrl: "", // the datebase64 url of created image
    };
  },

  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
  },
};
</script>
