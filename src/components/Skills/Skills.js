const Skills = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="list_items">
      <div className="skill-container">
        <img src={imageUrl} alt={name} className="skill-logo" />
        <p>{name}</p>
      </div>
    </li>
  )
}

export default Skills
