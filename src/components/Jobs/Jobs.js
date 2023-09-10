import {Component} from 'react'
import {FiSearch} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import JobCard from '../JobCard/JobCard'
import './Jobs.css'
import Header from '../Header/Header'
import Type from '../Type/Type'
import SalaryRange from '../SalaryRange/SalaryRange'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    fullTime: '',
    partTime: '',
    freeLance: '',
    internship: '',
    salaryRange: salaryRangesList[0].salaryRangeId,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {
      fullTime,
      partTime,
      freeLance,
      internship,
      salaryRange,
      searchInput,
    } = this.state
    const array = [fullTime, partTime, freeLance, internship]
    const filterJobs = array.filter(each => each !== '')

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${filterJobs.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobs = data.jobs.map(job => ({
        companyLogo: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        description: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderNojobsList = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs, Try other filters</p>
    </div>
  )

  renderJoblistView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return <>{this.renderNojobsList()}</>
    }
    return (
      <div>
        <ul>
          {jobsList.map(job => (
            <JobCard jobDetails={job} key={job.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    const onClickRetry = () => this.getJobs
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

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJoblistView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderingEmploymentType = () => {
    const onToggleType = employmentTypeId => {
      const {fullTime, internship, freeLance, partTime} = this.state
      if (employmentTypeId === 'FULLTIME') {
        if (fullTime === '') {
          this.setState({fullTime: employmentTypeId}, this.getJobs)
        } else {
          this.setState({fullTime: ''}, this.getJobs)
        }
      } else if (employmentTypeId === 'PARTTIME') {
        if (partTime === '') {
          this.setState({partTime: employmentTypeId}, this.getJobs)
        } else {
          this.setState({partTime: ''}, this.getJobs)
        }
      } else if (employmentTypeId === 'FREELANCE') {
        if (freeLance === '') {
          this.setState({freeLance: employmentTypeId}, this.getJobs)
        } else {
          this.setState({freeLance: ''}, this.getJobs)
        }
      } else if (employmentTypeId === 'INTERNSHIP') {
        if (internship === '') {
          this.setState({internship: employmentTypeId}, this.getJobs)
        } else {
          this.setState({internship: ''}, this.getJobs)
        }
      }
    }
    return (
      <>
        <ul>
          {employmentTypesList.map(type => (
            <Type
              typeDetails={type}
              key={type.employmentTypeId}
              onToggleType={onToggleType}
            />
          ))}
        </ul>
      </>
    )
  }

  renderingSalaryRange = () => {
    const onToggleRange = salaryRangeId => {
      this.setState({salaryRange: salaryRangeId}, this.getJobs)
    }
    return (
      <>
        <ul>
          {salaryRangesList.map(range => (
            <SalaryRange
              rangeDetails={range}
              key={range.salaryRangeId}
              onToggleRange={onToggleRange}
            />
          ))}
        </ul>
      </>
    )
  }

  onClickSearch = () => this.getJobs

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="container">
          <div className="left-container">
            <ProfileDetails />
            <hr className="break-line" />
            <div>
              <h1 className="employment-heading">Type of Employment</h1>
              {this.renderingEmploymentType()}
              <hr />

              <h1 className="employment-heading">Salary Range</h1>
              {this.renderingSalaryRange()}
            </div>
          </div>
          <div className="right-container">
            <div>
              <input
                type="search"
                className="search-input"
                onChange={this.onChangeSearch}
                value={searchInput}
                placeholder="Search"
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.onClickSearch}
              >
                <FiSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllProducts()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
