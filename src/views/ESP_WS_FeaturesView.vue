<script setup>
  import {
    RouterView
  } from 'vue-router'
  import featuresJson from '../router/featuresJson.json'
</script>

<template>
  <header>

    <div class="wrapper">
      <div>
        <v-card-title text="Scanning Options" class="textincreasesize">
          Scanning Options
        </v-card-title>
      </div>
      <div class="row">
        <div class="md-button" >
          <v-btn class="cust-cssbtn-size" v-for="(feature, key) in featuresJson" :key="key"
          :to="feature.routepath">
            {{ feature.featureTitle }} 
          </v-btn>
        </div>
      </div>


    </div>
  </header>

  <RouterView />
</template>