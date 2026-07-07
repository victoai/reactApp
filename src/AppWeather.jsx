import { useEffect , useState } from "react";
import WeatherBox from "./WeatherBox";
import WeatherButton from "./WeatherButton";

 



 


function AppWeather(){ 

    const [weather, setWeather]   = useState(null);
    const [city , setCity]   = useState('');
    const  cities  = [ "paris",  "new york" , "tokyo"  ,"seoul"];




    const getCurrentLocation =()=>{
        

        //현재위치정보 가져오기
        //현재위치정보로 날씨정보가져오기
           navigator.geolocation.getCurrentPosition( ( position)=>{

            let lat  = position.coords.latitude;
            let lon   = position.coords.longitude;

            console.log("dkfdjfdkfdjfk");
            console.log( lat, lon);

            getWeatherByCurrentLocation( lat, lon);

        } );

    };



    //위도 경도 날씨 정보 가져오기
    const getWeatherByCurrentLocation=  async( lat, lon)=>{
        console.log( lat, lon);
        //68741171e3e78325292b954d6f09c39f
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=68741171e3e78325292b954d6f09c39f&units=metric`;
        let response  = await fetch( url);
        let data =  await response.json();
        setWeather( data);
        console.log( data);
    };



    const getWeatherByCity  =  async()=>{
        let url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=68741171e3e78325292b954d6f09c39f&units=metric`;
        let response  = await fetch( url);
        let data =  await response.json();
        setWeather( data);
        console.log( data );


    };




    useEffect(()=>{
        //console.log("dfkdfjdfd"); 
       
        if( city ==="") {
            getCurrentLocation(); 
        }else{
            getWeatherByCity();
        }
    }, [ city ]);
    
    



    return(
        <div>
            {city}
            <WeatherBox  weather={weather}/>
            <WeatherButton   cities ={cities}  setCity={setCity}  getCurrentLocation={getCurrentLocation}/>             

        </div>
    );

}

export default AppWeather;