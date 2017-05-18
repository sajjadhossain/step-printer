# Step Printer

## 1. Install Node

This script requires [NodeJS](https://nodejs.org/en/download/) installed on the system

## 2. Configure Directories

In `config/locations.conf.js`, change line `3`, `4`, `5` to match the location of your step definitions.

* For example, if my projects' is location: `~/Desktop`,
* And the Torque framework installation is located: `myProject/myProjectsTorqueInstallation/`
* And my step definitions are located: `some/stupid/complex/java/path/`

Then my configuration should look like:

```js
const mainPath = '~/Desktop';
const projectTestPath = 'myProject/myProjectsTorqueInstallation/';
const stepDefinitionPath = 'some/stupid/complex/java/path/';
```

## 3. Run Script

```sh
node index.js
```
