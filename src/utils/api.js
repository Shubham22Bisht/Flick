import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;
// const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmM2ZjYyZGQ0ZDcyNTJlZTY4MTM2ZDBjMDNlZDNiNyIsInN1YiI6IjY1ODU5M2IwMjhkN2ZlNTg2NTNhMGJmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r6q0KHUglEwvsHJwCb_tyAKMIIlkwcorYw7IP4dN_-0";
const headers={
    Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi= async(url,params)=>{
   try{
    const {data} = await axios.get(BASE_URL+url,
        {
            headers,
            params,
        })
        return data;
   }catch(err){
       console.log(err);
       return err;
   }
}