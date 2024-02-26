import { useEffect } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { FetchDataFromApi } from "./utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { GetApiConfiguration, GetGenres } from "./store/HomeSlice";

import Header from "./components/header/Header.jsx"
import Footer from "./components/footer/Footer.jsx"
import PageNotFound from "./pages/404/PageNotFound.jsx"
import Details from "./pages/details/Details.jsx"
import Explore from "./pages/explore/Explore.jsx"
import Home from "./pages/home/Home";
import SearchResult from "./pages/searchResult/SearchResult.jsx";

function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((store)=> store.Home)
console.log(url)
 
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    FetchDataFromApi("/configuration")
    .then((res) => {
       console.log(res)
      const  url = {
        backdrop : res.images.secure_base_url + "original",
        poster : res.images.secure_base_url + "original",
      profile : res.images.secure_base_url + "original",
      }
      dispatch(GetApiConfiguration(url));
    });
  };

  const genresCall = async ()=>{
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};
       endPoints.forEach((url) => {
        promises.push(FetchDataFromApi(`/genre/${url}/list`)) 
       })
    const data = await Promise.all(promises)
    console.log(data)
    data.map(({genres}) =>{
      return genres.map((item)=> (allGenres[item.id] = item))
    })
    console.log(allGenres);
    dispatch(GetGenres(allGenres)); 
  };

  return(
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/:mediaType/:id" element={<Details/>} />
    <Route path="/search/:query" element={<SearchResult/>} />
    <Route path="/explore/:mediaType" element={<Explore/>} />
    <Route path="*" element={<PageNotFound/>} />
  </Routes>
   <Footer/>  
  </BrowserRouter>
)};

export default App;
