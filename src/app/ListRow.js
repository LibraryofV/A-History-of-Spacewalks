import React from 'react'

const styles = {
  rowContain: {
    padding: 16,
    paddingTop: 4,
  },
  rowBodyText: {
    fontFamily: 'calibri, sans-serif',
  },
  horizontalLine: {
    marginBottom: 0,
    paddingBottom: 0,
  }
}

export default ({item}) => (
  <div
    style={styles.rowContain}
    key={item}
  >
    <p style={styles.rowBodyText}>Country: {item.country}</p>
    <p style={styles.rowBodyText}>Crew: {item.crew}</p>
    <p style={styles.rowBodyText}>Date: {item.date ? item.date.substring(0, 10) : item.data}</p>
    <p style={styles.rowBodyText}>Duration: {item.duration}</p>
    <p style={styles.rowBodyText}>Mission: {item.purpose}</p>
    <p style={styles.rowBodyText}>Vehicle: {item.vehicle}</p>
    <hr style={styles.horizontalLine} />
  </div>
)
