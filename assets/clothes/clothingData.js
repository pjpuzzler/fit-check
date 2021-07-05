import tshirt from "./top/tshirt.svg";
import tshirt_under from "./top/tshirt_under.svg";
import tshirt_vneck from "./top/tshirt_vneck.svg";
import tshirt_vneck_under from "./top/tshirt_vneck_under.svg";

const clothes = {
    top: [
        { name: "tshirt", sex: ["male", "female"] },
        { name: "tshirt_vneck", sex: ["male", "female"] },
    ],
};

const svgDict = { tshirt, tshirt_under, tshirt_vneck, tshirt_vneck_under };

export { clothes, svgDict };
