import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [year, setYear] = useState(0);
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [subgenre, setSubgenre] = useState('');

  const newRecord = () => {
    Axios.post('http://localhost:54436/add', {
      year,
      album,
      artist,
      genre,
      subgenre,
    });
  };

  return (
    <div className="App">
      <div className="new_record">
        <label>Year of release: </label>
        <input
          type="number"
          onChange={event => {
            setYear(event.target.value);
          }}
        />
        <label>Album Name: </label>
        <input
          type="text"
          onChange={event => {
            setAlbum(event.target.value);
          }}
        />
        <label>Artist name: </label>
        <input
          type="text"
          onChange={event => {
            setArtist(event.target.value);
          }}
        />
        <label>Genre: </label>
        <input
          type="text"
          onChange={event => {
            setGenre(event.target.value);
          }}
        />
        <label>Subgenre: </label>
        <input
          type="text"
          onChange={event => {
            setSubgenre(event.target.value);
          }}
        />
        <button onClick={newRecord}>Add new record</button>
      </div>
    </div>
  );
}

export default App;
