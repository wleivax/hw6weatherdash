# hw6weatherdash
homework #6

GitHub Site: https://wleivax.github.io/hw6weatherdash/
GitHub Repo: https://github.com/wleivax/hw6weatherdash/

# Description
This project demonstrates utilizing third party API calls to retrieve weather data for a user supplied city. The weather data provided includes a weather-related icon and also a 5 day forecast for the selected city. Openweathermap.org api was incorporated for the weather information displayed. Date/time information was incorporated through the use of Day.js library.

Local storage was used to keep track of last searched upon city and have that city weather available upon browser refresh or launching the application. While the application is open, any user search for a city is subsquently added to a search history list. This permits the user to click a previously searched city to retrieve the weather about that city as opposed to having to search on it again.

The framework of the application was built in HTML for each of the sections: search history, search input & button, current weather information and 5 day forecast information. The information for each of those sections was dynamically added via jQuery. The weather dashboard application is also mobile responsive.

Additionally, the ultraviolet index (UVI) is color coded based upon how severe the retrieved number is for the UVI. Another feature added to this application was making sure city name capitalization was consistent no matter how the user entered the city name. The first letter of each word of city name is now capitalized.

Code was added to prevent a user searched city from being added to the search history more than once. If a user searches for a city already on the list, the weather is retrieved for that city but the search history is not updated. Application is also displaying the wind degrees as a direction for current weather only (not the 5 day forecast): N, NNE, E, SSE, S, SSW, W, NNW.

# Screenshots
The following is a screenshot of the weather application following a user searched city name.
![weather app](https://user-images.githubusercontent.com/73664011/129674986-c7922ad5-84d5-4a05-b7c9-26db22fd6a67.png)

# Technologies Used
Third Party APIs
jQuery
Javascript
Local Storage
- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
