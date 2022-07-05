import React, { Component,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        cetegory: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        cetegory: PropTypes.string
    }

    articles = []

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            publishedAt: this.publishedAt,
            author: this.author,
            source: this.source,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.cetegory)} - News Network `;
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cetegory}&apiKey=${this.props.APIKey} &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true, })
        this.props.setProgress(30)
        let data = await fetch(url);
        this.props.setProgress(60)
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews();
    }

     fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cetegory}&apiKey=${this.props.APIKey} &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true, })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false, })
    };

    render() {
        return (
            <>
                <h1 className='text-center my-4'> NewsNetwork  - Top headlines from {this.capitalizeFirstLetter(this.props.cetegory)} .</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((Element) => {
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
}
