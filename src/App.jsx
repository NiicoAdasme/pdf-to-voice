import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import { useForm } from './hooks/useForm';

function App() {

  const url = `${process.env.REACT_APP_API_ENDPOINT}/api/pdf`

  // const url = `http://localhost/api/pdf`

  const initialForm = {
    format: '',
    pdf: null
  };

  const [formValues, handleInputChange, reset] = useForm(initialForm);

  const onInputFile = (e) => {
    console.log(e.target.file);
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const {pdf, format} = formValues

    const form = new FormData();
    form.append('pdf', pdf); // encapsula el archivo
    form.append('format', format);

    const config = {
      headers: { 
        'Content-Type': 'multipart/form-data'
      }
    }
    
    console.log(form);
    axios.post(url, form, config)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => console.log(e))

    

  }

  useEffect(() => {
    console.log(formValues);
  }, [formValues])
  

  return (
    <div className="App container-fluid">
      <header className="App-header row">
        <form action={url} method="POST" className='form' encType="multipart/form-data">
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
                // onClick={onSubmit}
                type='submit'
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
