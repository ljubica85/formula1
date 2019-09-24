export function fetchDrivers(year) {
    return fetch(`http://ergast.com/api/f1/${year}/driverStandings.json`)
      .then((res) => res.json())
  }
  
  function fetchDriverDetails(id, year) {
    return fetch(`http://ergast.com/api/f1/${year}/drivers/${id}/results.json`)
      .then((res) => res.json())
  }
  
  function fetchDriverImage(name) {
    const endpoint = window.encodeURI(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&origin=*&prop=pageimages&titles=${name}&pithumbsize=100`)
  
    return fetch(endpoint)
      .then((res) => res.json())
  }
  
  export function fetchDriverData(id, year, name) {
    return Promise.all([
      fetchDriverDetails(id, year),
      fetchDriverImage(name)
    ])
  }
  
  export function fetchTeams(year) {
    return fetch(`http://ergast.com/api/f1/${year}/constructorStandings.json`)
      .then((res) => res.json())
  }