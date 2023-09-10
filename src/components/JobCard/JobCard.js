import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdWork, MdLocationOn} from 'react-icons/md'
import './JobCard.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    description,
    companyLogo,
    employmentType,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails
  return (
    <>
      <li className="list-container">
        <Link to={`/jobs/${id}`} className="link-item">
          <div className="logo-container">
            <img
              src={companyLogo}
              alt="company logo"
              className="company-logo"
            />
            <div className="company-title-container">
              <h1>{title}</h1>
              <div className="rating-container">
                <AiFillStar className="rating-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="bottom-container">
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
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <h1>Description</h1>
          <p>{description}</p>
        </Link>
      </li>
    </>
  )
}

export default JobCard
