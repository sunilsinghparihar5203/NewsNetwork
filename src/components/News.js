import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News= (props) =>{
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResult] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.cetegory)} - News Network `;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews= async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.cetegory}&apiKey=${props.APIKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true)
        props.setProgress(30)
        let data = await fetch(url);
        props.setProgress(60)
        let parsedData = await data.json();
        setarticles(parsedData.articles)
        settotalResult(parsedData.totalResults)
        setloading(false)
        props.setProgress(100)
    }
    
    useEffect(() => {
        updateNews();
    }, [])
    

    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.cetegory}&apiKey=${props.APIKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setpage(page + 1 );
        setloading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setarticles(articles.concat(parsedData.articles))
        settotalResult(parsedData.totalResults)
        setloading(false)
    };

        return (
            <>
                <h1 className='text-center mt-5 py-3'> NewsNetwork  - Top headlines from {capitalizeFirstLetter(props.cetegory)} .</h1>
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((Element) => {
                                return <div className="col-md-3 my-2" key={Element.url}><NewsItem source={Element.source} author={Element.author} date={Element.publishedAt} newsUrl={Element.url} title={Element.title ? Element.title : ""}
                                    description={Element.description ? Element.description : ""}
                                    imageUrl={Element.urlToImage ? Element.urlToImage : "https://picsum.photos/200/120"} /></div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
}


News.defaultProps = {
    country: "in",
    pageSize: 8,
    cetegory: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    cetegory: PropTypes.string
}

export default News