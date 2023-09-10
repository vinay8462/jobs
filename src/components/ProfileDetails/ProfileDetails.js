import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './ProfileDetails.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getFormatedData = data => ({
    name: data.name,
    imageUrl: data.profile_image_url,
    bio: data.short_bio,
  })

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedProfile = this.getFormatedData(data.profile_details)
      this.setState({
        profileDetails: updatedProfile,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => {
    onClickRetry = () => this.getProfileDetails
    return (
      <div className="product-details-failure-view-container">
        <button type="button" className="button" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, imageUrl, bio} = profileDetails
    return (
      <div className="profile-container">
        <img src={imageUrl} alt="profile" className="bio-image" />
        <h2 className="bio-name">{name}</h2>
        <p className="bio">{bio}</p>
      </div>
    )
  }

  render() {
    return <div>{this.renderProfile()}</div>
  }
}

export default ProfileDetails
