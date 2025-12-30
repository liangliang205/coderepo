
import GoodCard from './components/GoodCard'
import GoodDetail from './components/GoodDetail';
import SnagGoodCard from './components/SnagGoodCard';

import {data, snagData} from './data'

function App() {

  return (
    <div className="App">
      <GoodDetail data={data} />
      <GoodCard data={data} />
      <SnagGoodCard data={snagData} />
    </div>
  );
}

export default App;
