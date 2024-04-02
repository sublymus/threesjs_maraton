import ReactDOM from 'react-dom/client'

const root = document.getElementById('root')!;
(async()=>{
  console.log(window.location.pathname.split('/'));
  
  const view_path=window.location.pathname.split('/')[1]
  let view;
  if(view_path === 'dash'){
    const {DashView} = await import('./DashView/dash_view') ;
    view = DashView
  }
  else{
    const {ClientView} = await import('./ClientApp/client_view');
    view = ClientView
  }

  ReactDOM.createRoot(root).render(view)
})()
