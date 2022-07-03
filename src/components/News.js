import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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

     capitalizeFirstLetter  = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            publishedAt: this.publishedAt,
            author: this.author,
            source: this.source,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.cetegory)} - News Network`;
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cetegory}&apiKey=7a631e85e52e4a7196363c8708448608&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true, })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false, })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    render() {
        return (
            <div className='container my-4'>
                <h1 className='text-center my-4'>NewsNetwork - Top headlines from {this.capitalizeFirstLetter(this.props.cetegory)}.</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((Element) => {
                        return <div className="col-md-3 my-2" key={Element.url}><NewsItem source={Element.source} author={Element.author} date={Element.publishedAt} newsUrl={Element.url} title={Element.title ? Element.title : ""}
                            description={Element.description ? Element.description : ""}
                            imageUrl={Element.urlToImage ? Element.urlToImage : "https://picsum.photos/200/120"} /></div>
                    })}

                </div>
                <div className='d-flex justify-content-between '>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&laquo;Previous</button>
                    <button type="button" disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults / 10)} className="btn btn-dark" onClick={this.handleNextClick}> Next &raquo;</button>
                </div>

            </div>
        )
    }
}
