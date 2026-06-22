import background from '../assets/background.png';
import '../style.css';

export default function Background(){
    return(
        <img src={background} alt ="background" style={{position: "absolute", zIndex:1, width: "100vw", height:"auto", opacity: "0.55"}}></img>
    );
}