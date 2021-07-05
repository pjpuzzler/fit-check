import tshirt from "./clothes/tops/tshirt.svg";
import tshirt_under from "./clothes/tops/tshirt_under.svg";
import tshirt_vneck from "./clothes/tops/tshirt_vneck.svg";
import tshirt_vneck_under from "./clothes/tops/tshirt_vneck_under.svg";

const clothes = {
    tops: [
        { name: "tshirt", sex: ["male", "female"] },
        { name: "tshirt_vneck", sex: ["male", "female"] },
    ],
};

const svgDict = { tshirt, tshirt_under, tshirt_vneck, tshirt_vneck_under };

export { clothes, svgDict };
