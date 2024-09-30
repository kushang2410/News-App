import React from 'react';

const NewsItem = ({ title, description, imgUrl, newsUrl, author, date }) => {
  return (
    <div className="card mx-5 my-3">
      <img
        src={imgUrl || "https://photos5.appleinsider.com/gallery/53888-108424-53662-107899-40451-77913-38908-74291-50532869181_ee5d0cdc67_k-xl-l-xl-xl.jpg"}
        className="card-img-top h-25"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"> <small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small> </p>
        <a rel='noreferrer' href={newsUrl} className="btn btn-primary"> Read More </a>
      </div>
    </div>
  );
}

export default NewsItem;
