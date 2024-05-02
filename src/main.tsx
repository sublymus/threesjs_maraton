import ReactDOM from 'react-dom/client'
import { urlToPath } from './Tools/SRouter';

const root = document.getElementById('root')!;



const reservedStoreName = ['web','dash','sublymus'];
(async () => {
  const store = window.location.pathname.split('/')[1]
  const dash = window.location.pathname.split('/')[2]
  let view;
  console.log({ store, dash });

  if (store && reservedStoreName.includes(store)) {
    view = (await import('./Web/WebView')).WebView;
  } else if (store == 'auth') {
    const userJson = urlToPath().json;
    if (userJson?.token) {
      localStorage.setItem('user', JSON.stringify(userJson));
      return window.close()
    }
  } if (dash == 'dash') {
    localStorage.setItem('store_name', store)
    view = (await import('./DashView/dash_view')).DashView;
  } else if(store == 'demo'){
    localStorage.setItem('store_name', store)
    view = (await import('./ClientApp/client_view')).ClientView;
  } else  {
    view = (await import('./Web/WebView')).WebView;
  }

  ReactDOM.createRoot(root).render(view)
})()
