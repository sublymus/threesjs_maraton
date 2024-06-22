import ReactDOM from 'react-dom/client'
import { urlToPath } from './Tools/SRouter';
import './css.css'
const root = document.getElementById('root')!;
import "../client";


const reservedStoreName = ['web', 'dash', 'sublymus', 'admin', 'noga'];//nom de store indisponible
(async () => {
  const first = window.location.pathname.split('/')[1]?.toLocaleLowerCase()
  const scond = window.location.pathname.split('/')[2]?.toLocaleLowerCase()
  let view;

  if (first && reservedStoreName.includes(first)) {
    view = (await import('./Web/WebView')).WebView;
  } else if (first == 'auth') {
    const userJson = urlToPath().json;
    localStorage.setItem('user', JSON.stringify(userJson));
    return window.close()
  } if (scond == 'dash') {
    localStorage.setItem('store_name', first)
    view = (await import('./DashView/dash_view')).DashView;
  } else if (first == 'admin') {
    view = (await import('./Admin/AdminView')).AdminView;
  }else if (first == 'demo' || first) {
    localStorage.setItem('store_name',  first == 'demo'?scond:first)
    view = (await import('./ClientApp/client_view')).ClientView;
  }  else {
    view = (await import('./Web/WebView')).WebView;
  }
  ReactDOM.createRoot(root).render(view)
})()
