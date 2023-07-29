
<template>
  <v-container fluid class="pa-0">

    <v-row class="mt-12" justify="center">
      <v-col cols="3">
        <v-card>
          <v-card-title class="headline"> Kitsanapong Warit </v-card-title>

          <v-card-text>
            <p>6431503002</p>

            <p>
              <v-icon style="margin-right: 5px">mdi-github</v-icon>
              <a
                href="https://github.com/k1tsanapong"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </p>

            <p>
              <v-icon style="margin-right: 5px">mdi-gitlab</v-icon>
              <a
                href="https://gitlab.com/6431503002"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </p>

            <p>
              <v-icon style="margin-right: 5px">mdi-facebook</v-icon>
              <a
                href="https://gitlab.com/6431503002"
                target="_blank"
                rel="noopener noreferrer"
              >
                Page Facebook
              </a>
            </p>
          </v-card-text>
        </v-card>
        
      </v-col>

      <v-col cols="3">
        <iframe
          width="100%"
          height="230"
          src="https://www.youtube-nocookie.com/embed/z4k9fPvw_LQ?controls=0&start=77"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>

    </v-row>
  </v-container>
</template>
    
    
    
    
  <script>
export default {
  layout: 'default',
  data() {
    return {
        loggedIn: false, 

    };
  },

  created(){
    this.loggedIn = this.$auth.loggedIn;
  },

  methods: {
    async logout() {
      await this.$auth.logout();
      window.location.reload(true);
    },
  },
};
</script>