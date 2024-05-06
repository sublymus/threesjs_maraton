const h = localStorage.getItem('host')||'localhost'

export const Host = `http://${h}:3333`
export const Local = `http://${h}:5173`