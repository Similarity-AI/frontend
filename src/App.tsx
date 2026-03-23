import { useState } from 'react'
import { searchSimilarity } from "../api/index"
import { type ApiType } from "../types/ApiType"
import './App.css'

function App() {
  const [inputValueSearch, setInputValueSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataAPI, setDataAPI] = useState<ApiType>()

  async function getApi() {
    try {
      setLoading(true)
      if (inputValueSearch.trim() === "") {
        alert("Insira um texto no input")
      }

      setDataAPI(await searchSimilarity(inputValueSearch));
      setInputValueSearch("")
    } catch (error) {

    } finally {
      setLoading(false)
    }
    console.log("console: ", dataAPI)
  }

  return (
    <>
      <h1>API de Similaridade</h1>
      <section className='inputSection'>
        <label for="searchInput" className='searchLabel'>Insira uma pergunta ou texto:</label>
        <input id='searchInput' value={inputValueSearch} onChange={(e) => setInputValueSearch((e.target as HTMLInputElement).value)} className='input' />
        <button onClick={getApi} className='button' disabled={loading}>Enviar</button>
      </section>

      <section className='sectionResult'>
        {!dataAPI ? <h1 className='titleInsertInput'>Faça uma busca de similaridade através do input</h1> : <>
          <h1 className='titleResult'>Query pesquisada: {dataAPI.query}</h1>
          {dataAPI.results?.map((data, index) => (
            <div key={`divData${index}`} className='divMapResult'>
              <p className='rankText'>Rank: {data.rank}°</p>
              <p className='titleSimilarity'>Similaridade: <span className={data.similarity > 0 ? "positive" : "negative"}>{data.similarity}</span></p>
              <p className='textResult'>Texto base: {data.text}</p>
            </div>
          ))}
        </>}
      </section>

    </>
  )
}

export default App
