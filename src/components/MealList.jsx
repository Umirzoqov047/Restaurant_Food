import { useHistory } from 'react-router-dom';
import MealItem from './MealItem';

export default function MealList({meals}){
  const {goBack} = useHistory()
  return(
    <div >
      <br />
      <button className='btn' onClick={goBack}>Go Back</button>
      <div className="list">
      {meals.map(meal =>(
        <MealItem key={meal.idMeal} {...meal} />
      ))}
      </div>
      
    </div>
  )
}