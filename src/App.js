import React, {useEffect, useState} from "react";
import Recipe from "./Recipe"
import './App.css';

  const App = () => {
  const APP_ID = "2743ec85";
  const APP_KEY = "00d9d414c21ff67aa2d2b19b8a3ab811";

  const [recipes, setRecipes] = useState([]);
  const[search, setSearch] = useState('');
  const[query, setQuery] = useState('Apple')

  useEffect(()=>{
   getRecipes();
  },[query]);

 const getRecipes = async () =>{
 const response = await fetch( `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
 const data = await response.json();
 setRecipes(data.hits); 
}

 const updateSearch = e =>{
  setSearch(e.target.value);
}
 const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}
  return(
    <div className="App">
      <form onSubmit={getSearch} className="form">
        <i className='fas fa-hamburger' style={{fontSize:'36px'}} />
        <input placeholder="Search recipe..." className="bar" type="text" value={search} onChange={updateSearch}/>
        <button className="button" type="submit"><i class='fas fa-search' style={{fontSize:'20px'}}/>Search</button>
      </form>
      <div className="recipe">
       {recipes.map(recipe =>(
         <Recipe key={recipe.recipe.label} 
         title={recipe.recipe.label} 
         calories={recipe.recipe.calories} 
         image={recipe.recipe.image} 
         ingredients={recipe.recipe.ingredients}/>
       ))}
      </div>
    </div>
  )
}

export default App;
