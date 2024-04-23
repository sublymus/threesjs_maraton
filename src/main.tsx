import ReactDOM from 'react-dom/client'

const root = document.getElementById('root')!;
(async()=>{
  console.log(window.location.pathname.split('/'));
  
  const view_path=window.location.pathname.split('/')[1]
  let view;
  if(view_path === 'dash'){
    view = (await import('./DashView/dash_view')).DashView;
  }
  else if(view_path === 'demo'){
    view = (await import('./ClientApp/client_view')).ClientView;
  }else{
    view = (await import('./Web/WebView')).WebView;
  }

  ReactDOM.createRoot(root).render(view)
})()
