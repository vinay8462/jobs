import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'

import {MdWork, MdLocationOn} from 'react-icons/md'

import SimilarJobCard from '../SimilarJobCard/SimilarJobCard'
import './JobItemDetails.css'
import Header from '../Header/Header'
import Skills from '../Skills/Skills'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getjobItem()
  }

  getjobItem = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const filteredData = {
        companyLogo: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        description: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        companyImage: data.job_details.life_at_company.image_url,
        companyDescription: data.job_details.life_at_company.description,
        websiteUrl: data.job_details.company_website_url,
      }
      const filteredSkills = data.job_details.skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))
      const filteredSimilarJobs = data.similar_jobs.map(job => ({
        companyLogo: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        description: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        similarJobs: filteredSimilarJobs,
        skills: filteredSkills,
        jobDetails: filteredData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderjobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderFailureView = () => {
    const onClickRetry = () => this.getjobItem
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" onClick={onClickRetry}>
          Retry
        </button>
      </>
    )
  }

  renderItemDetails = () => {
    const {jobDetails} = this.state
    const {
      title,
      description,
      companyLogo,
      employmentType,
      location,
      packagePerAnnum,
      rating,
      websiteUrl,
    } = jobDetails
    return (
      <>
        <div className="list-container">
          <div className="logo-container">
            <img
              src={companyLogo}
              alt="job details company logo"
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
          <div>
            <h1>Description</h1>
            <a href={websiteUrl}>Visit</a>
          </div>

          <p>{description}</p>
        </div>
      </>
    )
  }

  renderSkills = () => {
    const {skills} = this.state
    return (
      <>
        <ul className="un-order-list">
          {skills.map(eachSkill => (
            <Skills skillDetails={eachSkill} key={eachSkill.id} />
          ))}
        </ul>
      </>
    )
  }

  renderingLifeatCompany = () => {
    const {jobDetails} = this.state
    const {companyDescription, companyImage} = jobDetails
    return (
      <>
        <div className="life-at-company">
          <p className="life-para">{companyDescription}</p>
          <img src={companyImage} alt="life at company" className="life-logo" />
        </div>
      </>
    )
  }

  rendersimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <>
        <ul className="un-order-list-similar-items">
          {similarJobs.map(similar => (
            <SimilarJobCard details={similar} key={similar.id} />
          ))}
        </ul>
      </>
    )
  }

  renderjobDetailsView = () => (
    <>
      <Header />
      <div className="details-container">
        {this.renderItemDetails()}
        <h3 className="h3">Skills</h3>
        {this.renderSkills()}
        <h3 className="h3">Life at Company</h3>
        {this.renderingLifeatCompany()}
      </div>
      <h3 className="heading">Similar Jobs</h3>
      {this.rendersimilarJobs()}
    </>
  )

  render() {
    return (
      <div className="item-bg-container">{this.renderjobDetailsView()}</div>
    )
  }
}

export default JobItemDetails
