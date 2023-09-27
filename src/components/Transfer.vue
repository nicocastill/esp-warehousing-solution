<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref} from 'vue';

const scanLocations = ref(false);

const toggleCbx = () => {
  scanLocations.value = !scanLocations.value
}

</script>

<template>
  <v-container>
    <v-row class="mb-5">
      <v-col cols="12">
        <h1>Scanner Transfer</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
            label="Company Code"
            :items="companyCodes"
            outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-select
            label="Warehouse"
            :items="warehouses"
            outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-row align="center" class="mt-4">
      <v-col cols="auto">
        <v-checkbox v-model="scanLocations"></v-checkbox>
      </v-col>
      <v-col cols="auto">
        Scan Locations After Carton
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12">
        <v-data-table
            :headers="tableHeaders"
            :items="tableData"
            hide-default-footer
        ></v-data-table>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col>
        <v-btn large color="primary" class="mr-4" width="300" @click="toggleCbx">Transfer</v-btn>
        <v-btn large color="secondary" disabled>View Exceptions</v-btn>
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
</template>

<script>
export default {
  data() {
    return {
      companyCodes: ['Code1', 'Code2', 'Code3'],
      warehouses: ['Warehouse1', 'Warehouse2', 'Warehouse3'],
      //scanLocations: false,
      tableHeaders: [
        { title: 'Locations', key: 'location' },
        { title: 'Carton Serial #', key: 'cartonSerial' }
      ],
      tableData: [
        { location: 'Location1', cartonSerial: '123456' },
        { location: 'Location2', cartonSerial: '789012' },
        { location: 'Location3', cartonSerial: '345678' },
        { location: 'Location4', cartonSerial: '901234' },
        { location: 'Location5', cartonSerial: '567890' },
      ],
    };
  },
  methods: {
    cancelAction() {
      this.$router.push('/');
    },
  },
};
</script>
