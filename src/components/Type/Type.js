import './Type.css'

const Type = props => {
  const {typeDetails, onToggleType} = props
  const {employmentTypeId, label} = typeDetails
  const onChangeType = () => {
    onToggleType(employmentTypeId)
  }
  return (
    <li className="employment-list">
      <input
        id={employmentTypeId}
        type="checkbox"
        onChange={onChangeType}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default Type
