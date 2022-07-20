<!-- @format -->

# eReKon

Yet another web recon tool But beautiful (not the code).

## sneak peek

#### Landing page

![landing](https://raw.githubusercontent.com/rubenkharel/eReKon/main/repoAssets/landing.png)

#### Login/Register

![login](https://raw.githubusercontent.com/rubenkharel/eReKon/main/repoAssets/login.png)

#### Scanned data sample

![Sample](https://raw.githubusercontent.com/rubenkharel/eReKon/main/repoAssets/scanner.png)

#### Dashboard

![Dash](https://raw.githubusercontent.com/rubenkharel/eReKon/main/repoAssets/dash.png)

## Features

- Dark Mode and only that.
- Easy to find information like CVE, Port informations, Status infos, IP info.
- Login/Register
- Saves all the scans on database for later use
- Smooth UX/UI

#### Fast Scan

- Subdomain Scanning (findomain)
- PortScanning (evilscan)
- Version Scanner (Wappalizer)
- Screenshots (Puppeter iguess)

#### Effective Scan (UNDERDEVELOPMENT)

- All of the above from Fast scan
- Subdomain Bruteforce (ffuf)
- Directory scanning (??idk??)

#### Tech Used

- React.js + Bootstrap (Frontend)
- Node.js (Backend) REST API
- MongoDB (Database)
- Express (Server)

## Install

### Manual

#### FrontEnd

```
git clone https://github.com/rubenkharel/erekon
cd erekon/frontend
npm install
npm start
```

#### Backend

```
cd erekon/backend
npm install
npm start
```

#### Database

Makesure you have mongod working properly on your system

> $mongod --noauth --port 4000 --dbpath ~/where/to/create/your/database

or you can just get a free mongodb cluster(ig) and modify MONGO_CONNECT's value on `.env` file.

### Docker???

Coming soon...