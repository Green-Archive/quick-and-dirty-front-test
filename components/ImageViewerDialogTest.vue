<template>
  <v-dialog v-model="dialog" max-width="600px" @click:outside="closeDialog">
    <v-card>
      <v-card-title> Image Viewer </v-card-title>
      <!-- <v-img
        style="border-radius: 50%; border: 5px solid #89c7bc; cursor: pointer"
        alt="seki"
        :src="image"
      /> -->
      <cropper ref="cropper" class="upload-example-cropper" :src="image" />
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    coordinates: {
      type: Object,
      default() {
        return {};
      },
    },
    image: {
      type: String,
      default: "/seki.png",
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>


<!-- <template>
  <v-container fluid class="pa-0">
    <v-row class="mt-12" justify="center">
      <v-col cols="3">
        <!-- <vue-cropper ref="cropper" src="/seki.png" alt="Source Image">
        </vue-cropper> -->

        <!-- <cropper ref="cropper" src="/seki.png" @change="change" /> -->

        <!-- <div>
          <v-img
            style="
              border-radius: 50%;
              border: 5px solid #89c7bc;
              cursor: pointer;
            "
            :src="placeholderImage"
            @click="openDialog"
            alt="seki"
          />
         
        </div> -->

        <!-- <cropper
          ref="cropper"
          class="upload-example-cropper"
          :src="image.src"
        /> -->

        <image-viewer-dialog
          :coordinates="coordinates"
          :src="image.src"
          :dialog="dialog"
          @close="closeDialog"
        />

        <div>
          <v-menu v-model="menu" :close-on-content-click="false" offset-y>
            <template v-slot:activator="{ on }">
              <v-img
                style="
                  border-radius: 50%;
                  border: 5px solid #89c7bc;
                  cursor: pointer;
                "
                :src="defaultImage"
                alt="seki"
                v-on="on"
              />
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="$refs.file.click()"
                  >Upload a Photo</v-list-item-title
                >

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
        </div>
      </v-col>

      <v-col cols="3">
        <v-row>
          <!-- <v-col cols="1"
            ><v-card color="red">
              <v-btn @click="crop">kim</v-btn>
            </v-card>
          </v-col> -->
        </v-row>
      </v-col>

      <v-col cols="3">
        <!-- <results :coordinates="coordinates" :image="image" /> -->
      </v-col>
    </v-row>
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
      menu: false,
      selectedImageSrc: "/seki.png",
      defaultImage: "/seki.png",
      dialog: false,
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      image: {
        src: null,
        type: null,
      },

      croppedImage: null,

      loggedIn: false,
    };
  },

  created() {
    this.loggedIn = this.$auth.loggedIn;
  },

  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.reset();
    },
    handleImageError() {
      // This function is called when the image fails to load
      // You can set a default image source or handle the error as needed
      this.editedItem.profileImg = this.defaultImage; // Replace with your default image path
    },
    async logout() {
      await this.$auth.logout();
      window.location.reload(true);
    },

    crop() {
      const { canvas } = this.$refs.cropper.getResult();
      canvas.toBlob((blob) => {
        // Do something with blob: upload to a server, download and etc.
      }, this.image.type);
    },
    reset() {
      this.image = {
        src: null,
        type: null,
      };
    },
    loadImage(event) {
      // Reference to the DOM input element
      const { files } = event.target;
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0]);

        // 3. The steps below are designated to determine a file mime type to use it during the
        // getting of a cropped image from the canvas. You can replace it them by the following string,
        // but the type will be derived from the extension and it can lead to an incorrect result:
        //
        // this.image = {
        //    src: blob;
        //    type: files[0].type
        // }

        // Create a new FileReader to read this image binary data
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.image" refers to the image of Vue component
          this.image = {
            // Set the image source (it will look like blob:http://example.com/2c5270a5-18b5-406e-a4fb-07427f5e7b94)
            src: blob,
            // Determine the image type to preserve it during the extracting the image from canvas:
            type: getMimeType(e.target.result, files[0].type),
          };

          this.menu = false;
          this.openDialog();
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsArrayBuffer(files[0]);
      }
    },
  },
  destroyed() {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
  },
};
</script> -->
