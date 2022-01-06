import { useLocation, useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { getAllCategories } from "../api"
import CategoryList from "../components/CategoryList"
import Loader from "../components/Loader"
import Src from "../components/Src"
export default function Home(){
  const [catalog, setCatalog] = useState([])
  const [filterCatolog, setFilterCatalog] = useState([])
  const {pathname, search} = useLocation()
  const {push} = useHistory()
  function handleSearch(str){
    setFilterCatalog(catalog.filter(item => item.strCategory.toLowerCase().includes(str.toLowerCase())))
    push({
      pathname,
      search: `?s=${str}`
    })
  }
  useEffect(() => {
    getAllCategories().then(data => {
      setCatalog(data.categories)
      setFilterCatalog( search ? data.categories.filter(item =>
        item.strCategory.toLowerCase().includes(search.split("=")[1].toLowerCase())): data.categories)
    })
  },[search])
  return(
    <div>
      <Src cb={handleSearch} />
      {!catalog.length ? (
        <Loader />
      ) : (
        <CategoryList catalog={filterCatolog} />
      ) }
    </div>
  )
}