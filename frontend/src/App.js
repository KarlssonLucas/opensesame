import './css/App.css';
import GenerateCodes from './components/GenerateCodes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

const alertGen = () => {
    toast.success('🦄 Copied to clipboard!', {
        position: "bottom-right",
        theme: 'dark',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });
}

  return (
    <div className="App">
      <GenerateCodes alertGen={alertGen}/>
      <ToastContainer />
    </div>
  )
}

export default App;
