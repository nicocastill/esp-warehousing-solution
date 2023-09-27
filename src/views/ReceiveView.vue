<script setup>
  import receiveList from '../router/featuresfieldjson/receiveList.json'
  import ScanComponent from '../components/Scan.vue'
  import { ref } from 'vue';
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ];
  const primeCartonVal = ref('');
  const asnNumberVal = ref('');

  const updatePrimeCarton = (newValue) => {
    primeCartonVal.value = newValue;
  };
  const setAsnNumber = (newValue) => {
    asnNumberVal.value = newValue;
  };
</script>

<script>
  export default {
    data: () => ({
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      select: null,
      warehouse: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),
    methods: {
      cancelAction() {
        this.$router.push('/');
      },
    },
  }
</script>

<template>
  <v-form ref="form">
    <v-sheet width="auto" class="mx-auto">
      <v-container>
        <div>
          <v-card-title text="Scanning Options" class="textincreasesize">
            Receiving
          </v-card-title>
        </div>
        <div v-for="fieldData in receiveList.fieldList" :key="fieldData.fieldId">
          <v-text-field v-if="fieldData.vueFieldType === 'text'" :ref="fieldData.fieldId"  :label="fieldData.vueFieldLabel"
            :id="fieldData.fieldId" required></v-text-field>

          <v-select v-else-if="fieldData.vueType === 'select'" :items="items" :label="fieldData.vueFieldLabel"
            :id="fieldData.fieldId" required></v-select>


          <v-container v-else-if="fieldData.vueType === 'checkbox'" fluid>
            <v-checkbox :model-value="true" :label="fieldData.vueFieldLabel" :id="fieldData.fieldId" class="black-label"
              color="red" value="false"></v-checkbox>
          </v-container>


          <input v-else-if="fieldData.vueFieldType === 'datetime-local'" v-model="fieldData.vueFieldType"
            type="datetime-local" class="form-control auto-pad-bottom" :id="fieldData.fieldId"
            :required="fieldData.isRequired">
        </div>

        <v-text-field label="Prime carton" id="primecarton" required v-model="primeCartonVal"></v-text-field>
        <v-text-field label="ASN Number" id="asnnumber" required v-model="asnNumberVal"></v-text-field>

        <!-- Include scanning part -->
       <ScanComponent @child-changed="updatePrimeCarton" @updateAsnNumber="setAsnNumber"/>


      </v-container>
    </v-sheet>


    <v-container>
      <v-row>
        <v-btn class="cust-cssbtn-size">
          <h5 class="mb-0">
            Receive
          </h5>
        </v-btn>
      </v-row>
      <v-row>
        <v-col>
          <v-btn class="cust-cssbtn-size">
            <h5 class="mb-0">
              View Exceptions
            </h5>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn class="cust-cssbtn-size">
            <h5 class="mb-0">
              Done
            </h5>
          </v-btn>
        </v-col>

      </v-row>

      <v-row class="mt-4">
        <v-col cols="auto">
          <v-btn icon @click="cancelAction">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn text @click="cancelAction">Cancel</v-btn>
        </v-col>
      </v-row>

    </v-container>






  </v-form>

</template>

<style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>