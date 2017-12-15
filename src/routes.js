import Welcome from './components/Welcome.vue'
import GetFile from './components/data-sources/GetFileData.vue'
import DataSource from './components/data-sources/DataSource.vue'
import CSVSource from './components/data-sources/CSVSource.vue'
import FirebaseSource from './components/data-sources/FirebaseSource.vue'


export default [
  {path:'/', component:Welcome},
  {path:'/get', component:GetFile},
  {path:'/data', component:DataSource},
  {path:'/csv', component:CSVSource},
  {path:'/fb', component:FirebaseSource}
]