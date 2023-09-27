import { createRouter, createWebHistory } from 'vue-router'
import ESP_WS_FeaturesView from '../views/ESP_WS_FeaturesView.vue'
import ReceiveView from '../views/ReceiveView.vue'
import ReceivingException from '../views/ReceiveExceptionsView.vue'
import TruckloadScan from '../views/TruckloadScanView.vue'
import PhysicalCount from '../views/PhysicalCountView.vue'
import TransferView from '../views/TransferView.vue'
//import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ESP_WS_FeaturesView
    },
    {
      path: '/receive',
      name: 'receive',
      component: ReceiveView
    },
    {
      path: '/receiveexception',
      name: 'receiveexception',
      component: ReceivingException
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: TransferView
    },
      {
      path: '/truckloadscan',
      name: 'truckloadscan',
      component: TruckloadScan
    }
    ,
    {
      path: '/physicalcount',
      name: 'physicalcount',
      component: PhysicalCount
    }
  ]
})

export default router
