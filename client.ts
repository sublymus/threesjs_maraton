// import { Host } from "./src/Config";

// VapidKey
const publicVapidKey = 'BDwYyNLBYIyNOBFX3M27uTAUXLrUxgHVyBJPjxJj3aQR7ghxC_MetHpzgTspdk4e4Iq9E0LCzeAtbCPOcdclxCk';

// Check for service worker
if('serviceWorker' in navigator)
{
    send().catch(err => console.error(err));
}
// Register SW, Register Push, Send Push
async function send()
{
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
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('Push Sent...');
}

function urlBase64ToUint8Array(base64String:string) {
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
