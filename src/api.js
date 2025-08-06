const apiKey = '7a51dd9db01bb64b96ff54e770ca98f1';

const getWeather = async (city) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json()) 
    .then((json) => {
      return json;
    });
};

export default getWeather;
