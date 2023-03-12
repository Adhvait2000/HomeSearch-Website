const Notification = ({ message }) => {
  const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }

  if (message === '') {
    return null
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

export default Notification