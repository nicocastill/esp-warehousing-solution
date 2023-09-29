<script setup>
import { ref, defineEmits} from 'vue';
import Swal from 'sweetalert2';
import axios from 'axios';


const result = ref('');
const bd = ref(null);
const isPaused = ref(false);
const mediaStream = ref(null);
const someData = ref('new value');
const data = ref({});
const response = ref(null);
const scannedBarcode = ref('');
const asnNumber = ref('');
//const features = ref(features);
const suiteletMainUrl = ref('https://6819513-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=460&deploy=1&compid=6819513_SB1&h=f0d5cdea3d8764c68ab9');
const showScanRec = ref(false); // Flag to show Scanner Receiving
const showRecExc = ref(false); // Flag to show the receiving exceptions
const disableRecExcBtn = ref(true); // Flag to show the receiving exceptions
const scanReceiverElement = ref({
  startElement: 'start',
  videoElement: 'video',
  resultElement: 'result',
});
const videoElement = ref(null);



const isCapturing = ref(false);

const isStopped = ref(false);
//const scannerReceiverFields = ref(scannerReceiverFields);
const currentDateTime = ref(new Date().toISOString().slice(0, 16));
const scannedDataAsn = ref({});

const emit = defineEmits();

const notifyParent = () => {
  // Emit an event with the new data when the button is clicked
  emit('child-changed', scannedBarcode.value);
};

const notifyParentAsnChange = () => {
  // Emit an event with the new data when the button is clicked
  emit('updateAsnNumber', asnNumber.value);
};

async function startCapture() {
  try {
    result.value = 'Initializing...';
    //const videoElement = ref(null); // Define the video element ref. Ensure you bind it in the template.


      bd.value = new BarcodeDetector({
        formats: ['code_128', 'code_93', 'ean_13'],
      });

    const media = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment',
      },
    });

    mediaStream.value = media;

    if (!isPaused.value) {
      videoElement.value.srcObject = media;
      videoElement.value.autoplay = true;

      videoElement.value.addEventListener('play', () => capture());
    }
  } catch (err) {
    console.error(err);
  }
}

const capture = async () => {
  try {
    if (!bd.value || isPaused.value) return;

    //const {videoElement} = $refs;

    const barcodes = await bd.value.detect(videoElement.value);
    if (barcodes.length > 0) {
      const log = barcodes.map(({rawValue}) => `{"barcodeValue":"${rawValue}"}`);
      if (log) {
        result.value = log;
        const firstBarcodeValue = JSON.parse(log[0]).barcodeValue;

        const barcode = firstBarcodeValue;
        scannedBarcode.value = firstBarcodeValue;

        console.log(`Get first scanned BC: ${log[0]}`);
        notifyParent()
        //console.log(this.$refs);
        //this.$refs.custrecord_esp_mwm_rp_barcode.value = barcode;
        //setScannerFieldValue('custrecord_esp_mwm_rp_barcode', barcode);
        await retrieveAsnFromBarcode(barcode);
        isPaused.value = true; // Pause after successful scan
      }
    }

    requestAnimationFrame(() => capture());
  } catch (err) {
    console.error(err);
  }
}




const getDataFromMainSL = async ({ actionType, buildUrl }) => {
  try {
    const resp = await axios.get(buildUrl);
    response.value = resp.data;
    console.log(`Get ${actionType} Success: ${JSON.stringify(response.value)}`);
    scannedDataAsn.value = response.value;
    console.log(`before Returning data ${JSON.stringify(scannedDataAsn.value)}`);
    return response.value;
  } catch (error) {
    response.value = `Error sending get request: ${error.message}`;
    console.log(response.value);
    scannedDataAsn.value = {};
    console.error(error);
    throw error;
  }
};
const setScannerFieldValue = (field, value) => {
  // Implementation of this function
};
const getCurrentDate = () => {
  // Implementation of this function
};

const retrieveAsnFromBarcode = async (barcode) => {
  console.log("Barcode in retrieveasn: " + barcode);
  const actionType = 'retrieveAsnFromBarcode';
  const finalUrlToProcess = suiteletMainUrl.value;
  const buildUrl = `${finalUrlToProcess}&actionType=${actionType}&barcode=${barcode}`;
  console.log("Built URL: " + buildUrl);
  const asnShip = await getDataFromMainSL({ actionType, buildUrl })
      .then((returnData) => {
        if (returnData.isSuccessful === true) {
          const { asnShipNumber } = returnData.getAllAsnData;
          Swal.fire(`ASN Number Exists: ${asnShipNumber}`)
              .then((result) => {
                console.log("ASN ok", JSON.stringify(result))
                isPaused.value = false;
                capture();
              });
          asnNumber.value = asnShipNumber;
          notifyParentAsnChange();
          disableRecExcBtn.value = true;
          console.log(JSON.stringify(data.value));
          return asnShipNumber;
        }
        Swal.fire('ASN Number Does not exist').then((result) => {
          console.log("ASN NOT ok", JSON.stringify(result))
          isPaused.value = false;
          capture();
        });
        disableRecExcBtn.value = false; // Note the .value here
        return '';
      })
      .catch((error) => {
        Swal.fire(error.message);
      });

  console.log(`ASN SHIP: ${asnShip}`);
  //setScannerFieldValue('custrecord_esp_mwm_rp_asn', asnShip);
  //setScannerFieldValue('custrecord_esp_mwm_rp_rec_time', getCurrentDate());
  return asnShip;
};



</script>

<template>
  <div class="center-button">
    <a href="#"  @click="startCapture" class="button-link">
      <img class="button-resize" src="https://6819513-sb1.app.netsuite.com/core/media/media.nl?id=17889&c=6819513_SB1&h=gUe7O6WgQ8hel1MqCd6T264w3pgDorTiQPas2NCR0Epw0fue" alt="Scan QR">
    </a>
  </div>
  <video  ref="videoElement"></video>
</template>

<script>

</script>


<style scoped>
.center-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-resize {
  height: 40px;
  width: 40px;
}
</style>
