import React, { useContext, useEffect, useRef, useState } from 'react'
import NewsCard from '../NewsCard/NewsCard'
import './News.scss'
import { getnews } from '../../service/apiservice';
import searchicon from '../../assets/searchicon.svg'
import { ThemeContext } from '../../App';


export default function News() {
  const [newsarticles, setnewsarticles] = useState([]);
  const [searchword, setsearchword] = useState('');
  const currentdate = new Date();
  currentdate.setDate(currentdate.getDate() - 1); // for setting yesterday
  const day = currentdate.getDate();
  const month = currentdate.getMonth() + 1;
  const year = currentdate.getFullYear()
  const [date, setdate] = useState(`${year}-${month.toString().padStart(2,'0')}-${day}`);
  const [pagesize, setpagesize] = useState(6)
  const [pagenumber,setpagenumber]=useState(1);
  const [loading,setloading]=useState(false)
  const bottomref = useRef(null)
  
  useEffect(() => {
    fetchnews()
  }, [searchword, date, pagesize,pagenumber]);


  useEffect(() => {
    console.log("bottomref:",bottomref)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRect.x < entry.intersectionRect.y) {
          setpagenumber((prevpage)=>prevpage+1)
        }
      },
      { threshold: 0 }
    );
  
    if (bottomref.current) {
      observer.observe(bottomref.current);
    }
  
    return () => {
      if (bottomref.current) {
        observer.unobserve(bottomref.current);
      }
    };
  }, [bottomref]);
  

  const fetchnews = async () => {
    try {
      setloading(true)
      setTimeout(async() => {
        let response = await getnews(searchword, date, pagesize,pagenumber)
        if(response){
          response.articles=response.articles.filter(each=>{
              return each.url !="https://removed.com"
          })
          setloading(false)
          if(pagenumber==1){
            setnewsarticles(response.articles)
          }else{
            setnewsarticles((prevarticles)=>[...prevarticles, ...response.articles]) 
          }
        }  
      }, 300);
    }
    catch (error) {
      console.log("error in fetching data", error)
    }
  }

  const nodata = () => {
    return (
      <div className='nodata text-center '>
        <span>No News Articles Found</span>
      </div>
    )
  }

  const isdarkmode = useContext(ThemeContext)

  return (
    <div className={`newscomponent h-100 d-flex flex-column justify-content-center align-items-center ${isdarkmode ? 'dark-theme' : 'light-theme'}`}>
      <div className='d-flex filters w-100 justify-content-center '>
        <div className='searchdiv'>
          <input type='text' className='form-control' value={searchword} onChange={(event) => setsearchword(event.target.value)} placeholder='search news keyword...' />
          <img src={searchicon} className='searchicon'></img>
        </div>
        <div className='d-flex justify-content-center align-items-center '>
          <input type='date' value={date} className='form-control' onChange={(event) => setdate(event.target.value)} max={currentdate.toISOString().split('T')[0]} />

        </div>
      </div>
      <div className='newscard-container p-2'>
        {newsarticles.length > 0 ?
          newsarticles.map((each, i) => {
            return <NewsCard key={i} article={each} />
          }) : nodata()
        }
  
        <div className='bottomref w-100 text-center ' ref={bottomref} >
          {loading &&
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
          }
          {/* <button onClick={()=>{setpagenumber((prevpage)=>prevpage+1)}} className="btn btn-primary">loadmore</button> */}
        </div>
      </div>
    </div>
  )




}
