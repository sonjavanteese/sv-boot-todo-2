export const appData = [
  {
    "id": 0,
    "slug": "start",
    "head": {
      "titel": "Nwp-App",
      "sub": "App-Viewer",
      "bg": "https://nwp-cgn.de/studio/upload/kat11/server/php/files/jc1.png"
    },
    "link": {
      "path": "/",
      "name": "Start",
      "hidden": true,
      "icon": "home"
    }
  },
  {
    "id": 1,
    "slug": "main",
    "head": {
      "titel": "Todos Application",
      "sub": "Private Todo List",
      "bg": "https://nwp-cgn.de/studio/upload/kat11/server/php/files/jc3.png"
    },
    "link": {
      "path": "/data",
      "name": "Todos",
      "icon": "db"
    }
  },
  {
    "id": 2,
    "slug": "settings",
    "head": {
      "titel": "App-Settings",
      "sub": "Options and Settings",
      "bg": "https://nwp-cgn.de/studio/upload/kat11/server/php/files/jc4.png"
    },
    "link": {
      "path": "/settings",
      "name": "Settings",
      "icon": "settings"
    }
  },
  {
    "id": 3,
    "slug": "user",
    "head": {
      "titel": "User-Panel",
      "sub": "Profil",
      "bg": "https://nwp-cgn.de/studio/upload/kat11/server/php/files/jc6.png"
    },
    "link": {
      "path": "/user",
      "name": "User",
      "icon": "user",
      "hidden": false
    }
  },
  {
    "id": 4,
    "slug": "edit",
    "head": {
      "titel": "User-Profil",
      "sub": "Editor",
      "bg": "https://nwp-cgn.de/studio/upload/kat11/server/php/files/jc7.png"
    },
    "link": {
      "path": "/edit",
      "name": "Profil",
      "icon": "user",
      "hidden": true
    }
  }
];  
export const navData = appData.map((x) => x.link);
export const pageData = appData.map((x) => x.head);

export default appData;

