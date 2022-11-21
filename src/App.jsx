import axios from 'axios';
import './App.css';
import { useForm } from './hooks/useForm';

function App() {

  // const url = `${process.env.REACT_APP_API_ENDPOINT_LOCAL}/api/pdf`

  const url = `http://localhost/api/pdf`

  const initialForm = {
    format: '',
    pdf: null
  };

  const [formValues, handleInputChange, reset] = useForm(initialForm);

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formValues);

    axios.post(url, formValues)
      .then(res => console.log(res))
      .catch(e => console.log(e))


    // axios.get(url)
    //   .then(res => console.log(res))
    //   .catch(e => console.log(e))
  }


  return (
    <div className="App container-fluid">
      <header className="App-header row">
        <form action="" method="post" className='form'>
          <div className="row">
            <div className="col-md-12">
              <select name="format" defaultValue={'DEFAULT'} onChange={handleInputChange} className='form-select' aria-label="Default select example" required>
                <option value="DEFAULT" disabled>Seleccione formato de audio...</option>
                <option value="mp3">MP3</option>
                <option value="flac">FLAC</option>
                <option value="aac">AAC</option>
                <option value="ogg">OGG</option>
                <option value="wav">WAV</option>
                <option value="wma">WMA</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <input type="file" name="pdf" onChange={handleInputChange} className='form-control mt-4' required />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <button
                className='form-control btn btn-primary mt-4'
                onClick={onSubmit}
              >
                Convertir
              </button>
            </div>
            <div className="col-md-4">
              <button type="reset" onClick={reset} className="btn btn-secondary form-control mt-4" >Limpiar</button>
            </div>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
