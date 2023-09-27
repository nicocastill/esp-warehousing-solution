<script setup>
  import receiveExceptionList from '../router/featuresfieldjson/receiveExceptionList.json'
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ];
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
  <v-sheet width="300" class="mx-auto">

    <v-form ref="form">
      <div>
        <v-card-title text="Scanning Options" class="textincreasesize">
          View Exceptions
        </v-card-title>
      </div>




      <div v-for="fieldData in receiveExceptionList.fieldList" :key="fieldData.fieldId">


        <v-text-field v-if="fieldData.vueFieldType === 'text'" :label="fieldData.vueFieldLabel" :id="fieldData.fieldId"
          required></v-text-field>

        <v-select v-else-if="fieldData.vueType === 'select'" :items="items" :label="fieldData.vueFieldLabel"
          :id="fieldData.fieldId" required></v-select>

        <v-checkbox v-else-if="fieldData.vueType === 'checkbox'" :model-value="true" :label="fieldData.vueFieldLabel"
          :id="fieldData.fieldId"></v-checkbox>

        <input v-else-if="fieldData.vueFieldType === 'datetime-local'" v-model="fieldData.vueFieldType"
          type="datetime-local" class="form-control" :id="fieldData.fieldId" :required="fieldData.isRequired">

      </div>
      <v-btn class="cust-cssbtn-size">
        <h5 class="mb-0">
          Unexpected
        </h5>
      </v-btn>

      <v-btn class="cust-cssbtn-size">
        <h5 class="mb-0">
          Stock
        </h5>
      </v-btn>

      <v-btn class="cust-cssbtn-size">
        <h5 class="mb-0">
          Missing
        </h5>
      </v-btn>
      <v-btn class="cust-cssbtn-size">
        <h5 class="mb-0">
          Direct Ship
        </h5>
      </v-btn>




    </v-form>
  </v-sheet>
  <v-container>
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