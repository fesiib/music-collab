import PianoIcon from "../../media/piano.svg";
import GuitarIcon from "../../media/guitar.svg";
import VocalIcon from "../../media/vocal.svg";
import ElectricIcon from "../../media/electric.svg";
import DrumsIcon from "../../media/drums.svg";

const getIcon = (type) => {
    switch (type) {
        case "piano":
            return PianoIcon;
        case "guitar":
            return GuitarIcon;
        case "vocal":
            return VocalIcon;
        case "bass":
            return ElectricIcon;
        case "drums":
            return DrumsIcon;
        default:
            return VocalIcon;
    }
};

export default getIcon;
