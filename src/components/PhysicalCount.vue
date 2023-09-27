<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
</script>

<template>
  <v-container>
    <v-row class="mb-5">
      <v-col cols="12">
        <h1>Physical Count</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-select :items="companies" label="Company"></v-select>
      </v-col>
    </v-row>
      <v-row>
      <v-col cols="12" md="6">
        <v-select :items="ticketNumbers" label="Ticket Number"></v-select>
      </v-col>
      </v-row>
        <v-row>
      <v-col cols="12" md="6">
        <v-select :items="loadGroups" label="Load Group"></v-select>
      </v-col>
        </v-row>
          <v-row>
      <v-col cols="12" md="6">
        <v-select :items="transferLocations" label="Transfer to Location"></v-select>
      </v-col>
    </v-row>

    <v-row class="mt-4 ">
      <v-col cols="10">
        <v-data-table
            :headers="tableHeaders"
            :items="tableData"
            hide-default-footer
        ></v-data-table>
      </v-col>
    </v-row>

    <v-row class="mt-4 justify-center">
      <v-col cols="auto">
        <v-btn large color="primary" class="ml-16" width="300">Scan</v-btn>
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
      companies: ["Company A", "Company B", "Company C"],
      ticketNumbers: ["Ticket 1", "Ticket 2", "Ticket 3"],
      loadGroups: ["Group A", "Group B", "Group C"],
      transferLocations: ["Location A", "Location B", "Location C"],
      tableHeaders: [
        { title: "Location", key: "location" },
        { title: "Serial Number", key: "serial" }
      ],
      tableData: [
        { serial: "12345678", location: "DT001"},
        { serial: "23456789", location: "DT002"},
        { serial: "34567890", location: "DT003"},
        { serial: "45678901", location: "DT004"},
        { serial: "56789012", location: "DT005"},
        { serial: "67890123", location: "DT006"},
        { serial: "78901234", location: "DT007"},
        { serial: "89012345", location: "DT008"}
      ]

    };
  },
  methods: {
    cancelAction() {
      this.$router.push('/');
    },
  },
};
</script>
