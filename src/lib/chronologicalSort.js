export const chronologicallySorted = (p) => {
  return [...p].sort((a,b) => {
    const aDate = new Date(a.lastUpdatedDate)
    const bDate = new Date(b.lastUpdatedDate)
    return (aDate > bDate) ? -1 : 1
  })
}
