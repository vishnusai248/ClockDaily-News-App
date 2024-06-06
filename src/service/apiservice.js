export async function getnews(keyword,date,pagesize,pagenumber){
    try{
        let apikey='300ff0735e504b269f5141e006cffbcd'; //mine
        //    let apikey='47d9b86a629048a1aaf1d8f1d95510da'
        if(keyword==''){
            keyword="*"
        }
        // let url ='https://saurav.tech/NewsAPI/top-headlines/category/health/in.json'
        let url='https://newsapi.org/v2/everything?' +'q='+keyword+'&' +'from='+date+'&' +'sortBy=popularity&' +'apiKey='+apikey+'&pageSize='+pagesize + '&page='+pagenumber;
        
        let response= await fetch(url)
        if(response){
            return response.json()
        }

    }
    catch(error){
        console.log("error occured",error)
    }
}