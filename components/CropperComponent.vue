<!-- <template>
  <div>
    <Cropper
      ref="cropper"
      :src="imageSrc"
      :options="cropperOptions"
      @ready="onCropperReady"
    ></Cropper>

    <button @click="cropImage">Crop Image</button>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  components: {
    Cropper,
  },
  data() {
    return {
      imageSrc: "/seki.png", // Your image source
      cropperOptions: {
        viewMode: 1,
        dragMode: "move",
        aspectRatio: 16 / 9,
      },
    };
  },
  methods: {
    onCropperReady() {
      // Handle the "ready" event
    },
    cropImage() {
      // Access the cropper instance and crop the image
      const cropper = this.$refs.cropper.getResult();
      if (cropper) {
        const croppedData = cropper.getCroppedCanvas();
        // Handle the cropped data as needed
      }
    },
  },
};
</script> -->
