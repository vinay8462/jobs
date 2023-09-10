import {AiFillStar} from 'react-icons/ai'
import {MdWork, MdLocationOn} from 'react-icons/md'

import './SimilarJobCard.css'

const SimilarJobCard = props => {
  const {details} = props
  const {
    companyLogo,
    title,
    rating,
    description,
    location,
    employmentType,
  } = details
  return (
    <li className="list-items">
      <div className="lists-container">
        <div className="logo-container">
          <img
            src={companyLogo}
            alt={title}
            className="similar job company logo"
          />
          <div className="company-title-container">
            <h1>{title}</h1>
            <div className="rating-container">
              <AiFillStar className="rating-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{description}</p>
        <div className="location-container">
          <div className="rating-container">
            <MdLocationOn className="rating-icon" />
            <p className="rating">{location}</p>
          </div>
          <div className="rating-container">
            <MdWork className="rating-icon" />
            <p className="rating">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
