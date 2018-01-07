import Welcome from './components/Welcome.vue'
import ReadCSV from './components/data-sources/csv/ReadCSV.vue'
import DataSource from './components/data-sources/DataSource.vue'
import CSVSource from './components/data-sources/csv/CSVSource.vue'
import FirebaseSource from './components/data-sources/firebase/FirebaseSource.vue'
import ChooseViz from './components/viz/ChooseVizType.vue'
import Pareto from './components/viz/pareto/Pareto.vue'
import ParetoViz from './components/viz/pareto/ParetoViz.vue'

export default [
  {path:'/', component:Welcome},
  {path:'/get', component:ReadCSV},
  {path:'/data', component:DataSource},
  {path:'/data/csv', component:CSVSource},
  {path:'/data/fb', component:FirebaseSource},
  {path:'/viz', component:ChooseViz},
  {path:'/viz/pareto', component:Pareto},
  {path:'/viz/pareto/viz', component:ParetoViz}  
]