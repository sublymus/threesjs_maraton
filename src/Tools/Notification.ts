import { Host } from "../Config";
import { UserInterface } from "../DataBase";

// VapidKey
const publicVapidKey = 'BDwYyNLBYIyNOBFX3M27uTAUXLrUxgHVyBJPjxJj3aQR7ghxC_MetHpzgTspdk4e4Iq9E0LCzeAtbCPOcdclxCk';

// Check for service worker

export interface UserBrowser {

}

export async function removeNotifContext(data: {
  context_name:string, 
  context_id: string,
  user: UserInterface
}) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${data.user.token}`);
  console.log('....remove Notif Context');
  
  const response = await fetch(`${Host}/add_notif_context/?context_id=${data.context_id}`, {
    headers,
    method: 'POST',
  });
  try {
    return await response.json() as UserBrowser[]
  } catch (error) {
  }
}

export async function addNotifContext(data: {
  context_name:string, 
  context_id: string,
  user: UserInterface
}) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${data.user.token}`);
  console.log('....add Notif Context');
  const form = new FormData();

  form.append('context_id', data.context_id)
  form.append('context_name', data.context_name)
  
  const response = await fetch(`${Host}/add_notif_context`, {
    headers,
    method: 'POST',
    body: form
  });
  try {
    return await response.json() as UserBrowser[]
  } catch (error) {
  }
}

export async function get_notif_contexts(data: {
  context_name:string, 
  context_id: string,
  user: UserInterface
}) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${data.user.token}`);
  console.log('....add Notif Context');
  const form = new FormData();

  form.append('context_id', data.context_id)
  form.append('context_name', data.context_name)
  
  const searchParams = new URLSearchParams({});
  searchParams.set('context_id', data.context_id);
  searchParams.set('context_name', data.context_name);
  
  const response = await fetch(`${Host}/add_notif_context/?${searchParams}`, {
    headers,
    body: form
  });
  
  try {
    return await response.json() as UserBrowser[]
  } catch (error) {
  }
}

export async function enableNotifications(data: {
  user_browser_id?: string,
  target: 'all' | 'current',
  user: UserInterface
}) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${data.user.token}`);
  console.log('....get Browsers');
  const form = new FormData();

  if (data.user_browser_id) form.append('user_browser_id', data.user_browser_id)
  form.append('target', data.target)

  const response = await fetch(`${Host}/enable_notifications`, {
    headers,
    method: 'PUT',
    body: form
  });
  try {
    return await response.json() as UserBrowser[]
  } catch (error) {
  }
}

export async function disableNotifications(data: {
  user_browser_id?: string,
  target?: 'all' | 'current',
  user: UserInterface
}) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${data.user.token}`);
  console.log('....get Browsers');
  const form = new FormData();

  if (data.user_browser_id) form.append('user_browser_id', data.user_browser_id)
  if (data.target) form.append('target', data.target)

  const response = await fetch(`${Host}/disable_notifications`, {
    headers,
    method: 'PUT',
    body: form
  });
  try {
    return await response.json() as UserBrowser[]
  } catch (error) {
  }
}

export async function getUserBrowser(data: {
  user_id?: string,
  user_agent?: string,
  user_browser_id?: string,
  enable?: boolean,
  user: UserInterface
}) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${data.user.token}`);
  const d = { ...data, user: undefined };
  console.log('....get Browsers');
  const searchParams = new URLSearchParams({});
  for (const key in d) {
    const value = (d as any)[key];
    searchParams.set(key, value);
  }
  const response = await fetch(`${Host}/get_user_browsers/?${searchParams}`, { headers });
  try {
    return await response.json() as UserBrowser[]
  } catch (error) {
  }
}

export async function removeUserBrowser(data: {
  user_browser_id: string,
  user: UserInterface
}) {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${data.user.token}`);
  console.log('....delete Browsers');
  const response = await fetch(`${Host}/remove_user_browser/${data.user_browser_id}`, {
    headers,
    method: 'DELETE'
  });
  try {
    return await response.json() as { deleted: boolean }
  } catch (error) {
  }
}

export async function requiredNotification() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register(`/worker.js`, {
    scope: `/`
  });
  console.log("Service Worker Registered...");
  // Register Push
  console.log("Registering Push...");
  return await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
}

export async function sendNotificationData(user: UserInterface) {
  console.log('....=>');

  const result = await navigator.permissions.query({ name: 'notifications' })
  if (result.state == 'granted') {
    const form = new FormData();
    form.append('notification_data', JSON.stringify(await requiredNotification()))
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${user.token}`);
    console.log('....Send notif data');

    fetch(`${Host}/set_notification_data/`, {
      method: 'PUT',
      body: form,
      headers
    })
  } else {
    console.log('....notif permission required');
  }

}

export function addContextNotifier(context: {
  context_id: string,
  context_name: string
}) {
  if ('serviceWorker' in navigator) {
    navigator.userAgent
    send(context).catch(err => console.error(err));
  }
}

// Register SW, Register Push, Send Push
async function send(context: {
  context_id: string,
  context_name: string
}) {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register(`/worker.js`, {
    scope: `/`
  });
  console.log("Service Worker Registered...");
  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");
  // Send Push Notification
  await fetch(`${Host}/add_context_notifier/?context_name=${context.context_name}&context_id=${context.context_id}`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Push Sent...');
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
