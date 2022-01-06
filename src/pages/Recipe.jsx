import { getMealById } from '../api';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Loader from './../components/Loader';
export default function Recipe(){
  const [resipe, setResipe] = useState([])
  const [showResipe, setShowResipe] = useState(false)
  const {id} = useParams()
  const {goBack} = useHistory()
  const handleShowResipe = () => {
    setShowResipe(!showResipe)
  }
  useEffect( () => {
    getMealById(id).then(data => setResipe(data.meals[0]))
  },[id])
  return(
    <div className='main-resipe'>
      <div className="main-resipe-left">
      
      <button className='btn' onClick={goBack}>Go Back</button>
      {!resipe.idMeal ? <Loader /> :(
        <div className="resipe">
          <img src={resipe.strMealThumb} alt={resipe.strMeal} />
          <h2>{resipe.strMeal}</h2>
          <h5><b>Category:</b> {resipe.strCategory}</h5>
          {resipe.strArea ? <h5><b>State:</b> {resipe.strArea}</h5> : null}
          <p>{resipe.strInstructions}</p>
          <button className='btn' onClick={handleShowResipe}>Show Resipe</button>
          {showResipe ? (
            <table className='centered'>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
              
            </thead>
            <tbody>
              {Object.keys(resipe).map(key => {
                if(key.includes('Ingredient') && resipe[key]){
                return(
                  <tr>
                    <td>{resipe[key]}</td>
                    <td>{resipe[`strMeasure${key.slice(13)}`]}</td>
                  </tr>
                )
              }
              })}
            </tbody>
          </table>
          ) : null}
          
          {resipe.strYoutube ? (
            <div className="row">
              <h5>Video Recipe</h5>
              <iframe src={`https://www.youtube.com/embed/${resipe.strYoutube.slice(-11)}`} allowFullScreen title={id} frameborder="0" />
              
            </div>
          ) : null }
        </div>
      )}
      </div>
      
    </div>
  )
}