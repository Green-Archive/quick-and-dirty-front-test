<!-- <template>
  <v-dialog v-model="dialog" max-width="600px" @click:outside="closeDialog">
    <v-card>
      <v-card-title> Image Viewer </v-card-title>
      <cropper
        ref="cropper"
        stencil-component="circle-stencil"
        class="upload-example-cropper ma-10"
        :stencil-props="{
          aspectRatio: 1 / 1,
        }"
        :src="src"
      />
      <v-card-actions>
        <v-btn block color="green" @click="cropAndClose"
          >Set new proflie picture</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      image: null,
    };
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
    src: {
      type: String,
      default: "/seki.png",
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },

    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image
      this.image = canvas.toDataURL();
    },

    cropAndClose() {
      // Call the crop method to get the cropped image
      this.crop();

      // Close the dialog
      this.closeDialog();

      // Emit the cropped image to the parent component
      this.$emit("cropped", this.image);
    },
  },
};
</script> -->
