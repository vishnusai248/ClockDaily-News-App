import React, { useContext, useEffect } from 'react'
import './NewsCard.scss'
import { ThemeContext } from '../../App';

export default function NewsCard(props) {
    const {article}=props;
    const opennews =()=>{
      window.open(article.url)
    }

 
    const isdarkmode=useContext(ThemeContext)
  return (
    <div className={`newscard card ${isdarkmode ? 'dark-theme' : 'light-theme'}`}>
      {article.urlToImage?
      <img src={article.urlToImage} className='img'/>:<div className='noimagediv' />
      }
      <h5>{article.title}</h5>
      <p>{article.description}</p>
      <div>
      <button className=' btn btn-primary btn-sm' onClick={opennews} >Read More...</button>

      </div>
    </div>
  )
}
