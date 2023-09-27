<script setup>
  import {
    VDataTable,
  } from "vuetify/labs/VDataTable"

  import truckloadFieldList from '../router/featuresfieldjson/truckloadFieldList.json'
  // import truckloadSubFieldList from '../router/featuresfieldjson/truckloadSubFieldList.json'

  const desserts = [{
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,
      iron: '1%',
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4.3,
      iron: '1%',
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16,
      carbs: 23,
      protein: 6,
      iron: '7%',
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8%',
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16,
      carbs: 49,
      protein: 3.9,
      iron: '16%',
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0,
      carbs: 94,
      protein: 0,
      iron: '0%',
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2%',
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45%',
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25,
      carbs: 51,
      protein: 4.9,
      iron: '22%',
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26,
      carbs: 65,
      protein: 7,
      iron: '6%',
    },
  ]
  const headers = [{
      title: 'Carton Serial#',
      align: 'start',
      sortable: false,
      key: 'name',
    },
    {
      title: 'DT#',
      align: 'end',
      key: 'calories',
    },
    {
      title: 'Style Desc',
      align: 'end',
      key: 'fat'
    },

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
      headers: [{
          text: 'ID',
          value: 'id'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Email',
          value: 'email'
        },
      ],
      items: [{
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com'
        },
        {
          id: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com'
        },
        // Add more data items as needed
      ],
      checkbox: false,
      columns: [{
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [{
          id: 1,
          name: "John",
          age: 20,
          createdAt: '',
          score: 0.03343
        },
        {
          id: 2,
          name: "Jane",
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343
        },
        {
          id: 3,
          name: "Susan",
          age: 16,
          createdAt: '2011-10-30',
          score: 0.03343
        },
        {
          id: 4,
          name: "Chris",
          age: 55,
          createdAt: '2011-10-11',
          score: 0.03343
        },
        {
          id: 5,
          name: "Dan",
          age: 40,
          createdAt: '2011-10-21',
          score: 0.03343
        },
        {
          id: 6,
          name: "John",
          age: 20,
          createdAt: '2011-10-31',
          score: 0.03343
        },
      ],
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
        <v-card-title text="Truckload Scan" class="textincreasesize">
          Truckload Scan
        </v-card-title>
      </div>
      <div v-for="fieldData in truckloadFieldList.fieldList" :key="fieldData.fieldId">
        <v-text-field v-if="fieldData.vueFieldType === 'text'" :label="fieldData.vueFieldLabel" :id="fieldData.fieldId"
          required></v-text-field>

        <v-select v-else-if="fieldData.vueType === 'select'" :items="items" :label="fieldData.vueFieldLabel"
          :id="fieldData.fieldId" required></v-select>

        <v-checkbox v-else-if="fieldData.vueType === 'checkbox'" :model-value="true" :label="fieldData.vueFieldLabel"
          :id="fieldData.fieldId"></v-checkbox>

        <input v-else-if="fieldData.vueFieldType === 'datetime-local'" v-model="fieldData.vueFieldType"
          type="datetime-local" class="form-control" :id="fieldData.fieldId" :required="fieldData.isRequired">
      </div>

      <v-data-table items-per-page="5" :headers="headers" :items="desserts" item-value="name">
      </v-data-table>

      <v-btn class="cust-cssbtn-size">
        <h5 class="mb-0">
          Scan
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