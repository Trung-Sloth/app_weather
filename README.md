## Setup project
1. `git clone https://github.com/Trung-Sloth/app_weather.git`
2. `cd app_weather`
2. `pip install pipenv --user`
3. If warning missing path (eg: get warning c:\users\asus\appdata\roaming\python\python311\scripts) -> windows search for "Edit the system environment variables" -> "Environment Variables" -> Double click to "Path" -> choose New -> paste the warning path -> press OK until all windows closed
4. `pipenv install` 

## Development 
1. `pipenv run weather-project` : to run server
2. Ctrl + Click the server's link (eg: https://2870.3.1.2:6782/)

## Add new package
1. `pipenv install <package-name> `
