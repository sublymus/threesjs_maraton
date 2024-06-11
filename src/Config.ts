// const h = localStorage.getItem('host')

export const Host = location.host.includes('localhost')?`http://localhost:3333`:''

export const Local = location.host.includes('localhost')?`http://localhost:5173`:''
