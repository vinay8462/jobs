import './SalaryRange.css'

const SalaryRange = props => {
  const {rangeDetails, onToggleRange} = props
  const {salaryRangeId, label} = rangeDetails
  const onChangeRange = () => {
    onToggleRange(salaryRangeId)
  }
  return (
    <li className="employment-list">
      <input
        id={salaryRangeId}
        type="radio"
        onChange={onChangeRange}
        name="radio"
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default SalaryRange
