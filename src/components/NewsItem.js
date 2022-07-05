import React from 'react'

const NewsItem =(props)=>{
        let {title,description,imageUrl,newsUrl,author,date,source} = props;
        return (
            <div>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}<span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{fontSize:".7rem",right:"0",zIndex:"1"}}>
                                {source.name}
                                <span className="visually-hidden">unread messages</span>
                            </span></h5>
                            <p className="card-text">{description}</p>
                            <a href={newsUrl} target='_blank' className="">Read more...</a>
                            <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                        </div>
                </div>
            </div>
        )
}
export default NewsItem