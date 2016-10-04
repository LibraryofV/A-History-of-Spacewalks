import React from 'react'

const styles = {
  button: {
    backgroundColor: '#444444',
    cursor: 'pointer',
    display: 'inline-block',
    width: 100,
    margin: 10,
    border: '1px solid #FFF',
    borderRadius: 10,
  },
  selectedButton : {
    backgroundColor: '#888888',
    display: 'inline-block',
    width: 100,
    margin: 10,
    border: '1px solid #FFF',
    borderRadius: 10,
  }
}

const Button = ({children, onClick, selected}) => (
  <div
    onClick={selected ? null : onClick}
    style={selected ? styles.selectedButton : styles.button}>
      {children}
  </div>
)

export default Button
