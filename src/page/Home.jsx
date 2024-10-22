import React, { useContext, useEffect, useState } from 'react'
import JobCards from '../components/jobCards'
import { Context } from '../context/GlobalContext'
import Carrusel from '../components/Carrusel.jsx'
import '../styles/home.css'

const Home = () => {
  const { actions } = useContext(Context)
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)

  const [selectedTechnology, setSelectedTechnology] = useState({
    Python: false,
    JavaScript: false,
    Java: false,
    SQL: false,
    React: false,
    CSS: false,
    GO: false,
    NodeJS: false,
    Bootstrap: false,
  })

  const [selectedLanguage, setSelectedLanguage] = useState({
    Spanish: false,
    English: false,
    Korean: false
  })

  const [selectedRank, setSelectedRank] = useState({
    junior: false,
    semiSenior: false,
    senior: false,
  })

  const [filterData, setFilterData] = useState
  ([])


  const handleTechnologyChange = (e) => {
    setSelectedTechnology({
      ...selectedTechnology,
      [e.target.value]: e.target.checked,
    })
    applyFilters()
  }

  const handleLanguageChange = (e) => {
    setSelectedLanguage({
      ...selectedLanguage,
      [e.target.value]: e.target.checked,
    })
    applyFilters()
  }

  const handleRankChange = (e) => {
    setSelectedRank({
      ...selectedRank,
      [e.target.value]: e.target.checked,
    })
    applyFilters()
  }

  const applyFilters = () => {
    let filtered = [...data]

    filtered = filtered.filter((item) =>   // Filter by technology
      Object.keys(selectedTechnology).some(
        (tech) => selectedTechnology[tech] && item.technologies.includes(tech)
      )
    )

    filtered = filtered.filter((item) => // Filter by language
      Object.keys(selectedLanguage).some(
        (lang) => selectedLanguage[lang] && item.languages.includes(lang)
      )
    )

    filtered = filtered.filter((item) => // Filter by rank
      Object.keys(selectedRank).some(
        (rank) => selectedRank[rank] && item.rank === rank
      )
    )

    setFilterData(filtered)
  }

  const getJobPosting = async () => {
    const response = await actions.getAllJobPosting()
    setData(response)
    console.log(response)
    setLoaded(true)
  }

  useEffect(() => {
    setLoaded(false)
    const waitToFetch = setTimeout(() => {
      getJobPosting()
    }, 2000)
    return () => clearTimeout(waitToFetch)
  }, [])


  

  return (
    <div className="container-fluid mt-5 py-3">
      <div className="text-overlay">
        <h1>Welcome to Flash Jobs!</h1>
        <h3>Work from anywhere in the world with only remote offers</h3>
        <h4>A new opportunity is waiting for you!</h4>
      </div>
      <Carrusel />
      <br />

      <div className="container-fluid d-flex justify-content-center">
        <div className="col-md-8">
          <div className="row m-3">
            <button
              className="btn btn-secondary"
              data-bs-toggle="collapse"
              href="#multiCollapseExample1"
              role="button"
              aria-expanded="false"
              aria-controls="multiCollapseExample1"
            >
              Categories to sort by
            </button>

            <div className="collapse multi-collapse" id="multiCollapseExample1">
              {/* Technologies */}
              <div className="primera text-center">
                <h5 className="d-flex justify-content-center card">Technologies</h5>
                {Object.keys(selectedTechnology).map((tech) => (
                  <div key={tech} className="form-check form-check-inline">
                    <input
                      onChange={handleTechnologyChange}
                      className="form-check-input"
                      type="checkbox"
                      value={tech}
                    />
                    <label className="form-check-label" htmlFor={tech}>
                      {tech}
                    </label>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="segunda text-center">
                <h5 className="d-flex justify-content-center card">Languages</h5>
                {Object.keys(selectedLanguage).map((lang) => (
                  <div key={lang} className="form-check form-check-inline">
                    <input
                      onChange={handleLanguageChange}
                      className="form-check-input"
                      type="checkbox"
                      value={lang}
                    />
                    <label className="form-check-label" htmlFor={lang}>
                      {lang}
                    </label>
                  </div>
                ))}
              </div>

              {/* Rank */}
              <div className="tercera text-center">
                <h5 className="d-flex justify-content-center card">Rank</h5>
                {Object.keys(selectedRank).map((rank) => (
                  <div key={rank} className="form-check form-check-inline">
                    <input
                      onChange={handleRankChange}
                      className="form-check-input"
                      type="checkbox"
                      value={rank}
                    />
                    <label className="form-check-label" htmlFor={rank}>
                      {rank}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display filtered job postings */}
      <div className="container-info-selected">
        {filterData.length > 0
          ? filterData.map((item) => (
              <div className="info-selected" key={item.id}>
                <JobCards data={filterData} />
              </div>
            ))
          : null}
      </div>


      <div className='container-fluid d-flex justify-content-center'>
        <div className='container-fluid'>
          {loaded ? (<JobCards data={data} />) : (<h1>Loading...</h1>)}
        </div>
      </div>

    </div>


  )
}

export default Home