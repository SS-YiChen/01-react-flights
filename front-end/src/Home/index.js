import Bar from '../components/Bar'
import './index.scss'

const Home = () => {
  return (
    <div className="home">
      <Bar
        style={{ width: '1000px', height: '400px' }}
        xData={['American Airline', 'Delta Airline', 'Envoy Airline', 'Hawaiian Airlines', 'Alaska Airline','Southwest Airline' ]}
        sData={[83, 91, 81, 84, 88, 86]}
        title='Customer Report' />

      <Bar
        style={{ width: '680px', height: '400px' }}
        xData={['Hawaiian Airline', 'Delta Airline', 'American Airline','Southwest Airline']}
        sData={[83, 82, 78, 75]}
        title='Punctuality Rate' />
    </div>
  )
}

export default Home