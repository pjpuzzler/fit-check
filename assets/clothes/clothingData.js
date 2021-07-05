import tshirt from "./top/tshirt.svg";
import tshirt_under from "./top/tshirt_under.svg";
import tshirt_vneck from "./top/tshirt_vneck.svg";
import tshirt_vneck_under from "./top/tshirt_vneck_under.svg";
import flannel_shirt_long from "./top/flannel_shirt_long.svg";
import flannel_shirt_long_under from "./top/flannel_shirt_long_under.svg";

const clothes = {
    top: [
        { name: "tshirt", sex: ["male", "female"], colors: 1 },
        { name: "tshirt_vneck", sex: ["male", "female"], colors: 1 },
        {
            name: "flannel_shirt_long",
            sex: ["male", "female"],
            colors: 2,
            allowsTie: true,
        },
    ],
};

const svgDict = {
    tshirt,
    tshirt_under,
    tshirt_vneck,
    tshirt_vneck_under,
    flannel_shirt_long,
    flannel_shirt_long_under,
};

export { clothes, svgDict };
