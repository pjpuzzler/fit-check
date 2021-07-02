const colors = {
  pink: {
    hex: "#ffc0cb",
    shadow: "#d798a3",
    idx: 0
},
  dark_pink: {
    hex: "#d798a3",
    shadow: "#af707b",
    idx: 0
},
  light_pink: {
    hex: "#ffe8f3",
    shadow: "#ffc0cb",
    idx: 0
},
  hot_pink: {
    hex: "#ff69b4",
    shadow: "#d7418c",
    idx: 0
},

  red: {
    hex: "#ff0000",
    shadow: "#d70000",
    idx: 1
},
  dark_red: {
    hex: "#d70000",
    shadow: "#af0000",
    idx: 1
},
  light_red: {
    hex: "#ff2828",
    shadow: "#ff0000",
    idx: 1
},

  orange: {
    hex: "#ffa500",
    shadow: "#d77d00",
    idx: 2
},
  dark_orange: {
    hex: "#d77d00",
    shadow: "#af5500",
    idx: 2
},
  light_orange: {
    hex: "#ffcd28",
    shadow: "#ffa500",
    idx: 2
},

  beige: {
    hex: "#f5f5dc",
    shadow: "#cdcdb4",
    idx: 3
},
  dark_beige: {
    hex: "#cdcdb4",
    shadow: "#a5a58c",
    idx: 3
},

  yellow: {
    hex: "#ffff00",
    shadow: "#d7d700",
    idx: 4
},
  dark_yellow: {
    hex: "#d7d700",
    shadow: "#afaf00",
    idx: 4
},
  light_yellow: {
    hex: "#ffffe0",
    shadow: "#d7d778",
    idx: 4
},

  green: {
    hex: "#008000",
    shadow: "#005800",
    idx: 5
},
  dark_green: {
    hex: "#005800",
    shadow: "#003000",
    idx: 5
},
  light_green: {
    hex: "#00a800",
    shadow: "#008000",
    idx: 5
},
  lime_green: {
    hex: "#00ff00",
    shadow: "#00d700",
    idx: 5
},
  teal_green: {
    hex: "#008080",
    shadow: "#005858",
    idx: 5
},
  dark_teal_green: {
    hex: "#005858",
    shadow: "#003030",
    idx: 5
},
  light_teal_green: {
    hex: "#00a8a8",
    shadow: "#008080",
    idx: 5
},
  aquamarine_green: {
    hex: "#7fffd4",
    shadow: "#57d6ac",
    idx: 5
},

  blue: {
    hex: "#0000ff",
    shadow "#0000d7",
    idx: 6
},
  dark_blue: {
    hex: "#0000d7",
    shadow: "#0000af",
    idx: 6
},
  light_blue: {
    hex: "#add8e6",
    shadow: "#85b0be",
    idx: 6
},
  midnight_blue: {
    hex: "#191970",
    shadow: "#000048",
    idx: 6
},
  cyan_blue: {
    hex: "#00ffff",
    shadow: "#00d7d7",
    idx: 6
},

  purple: {
    hex: "#800080",
    shadow: "#580058",
    idx: 7
},
  dark_purple: {
    hex: "#580058",
    shadow: "#300030",
    idx: 7
},
  light_purple: {
    hex: "#a800a8",
    shadow: "#800080",
    idx: 7
},

  brown: {
    hex: "#8b4512",
    shadow: "#631d00",
    idx: 8
},
  dark_brown: {
    hex: "#631d00",
    shadow: "#3b0000",
    idx: 8
},
  light_brown: {
    hex: "#b36d3b",
    shadow: "#8b4512",
    idx: 8
},

  gray: {
    hex: "#808080",
    shadow: "#585858",
    idx: 9
},
  dark_gray: {
    hex: "#585858",
    shadow: "#303030",
    idx: 9
},
  light_gray: {
    hex: "#a8a8a8",
    shadow: "#808080",
    idx: 9
},

  white: {
    hex: "#ffffff",
    shadow: "#d7d7d7",
    idx: 10
},
  black: {
    hex: "#000000",
    shadow: "#000000",
    idx: 10
}};

const palette = [
  [6, 9, 10, 1, 3],
  [6, 9, 10, 0, 3],
  [5, 6, 10, 3, 8],
  [6, 7, 8, 10, 4, 2],
  [5, 6, 10, 3],
  [2, 7, 10, 4, 6],
  [0, 1, 2, 10, 7, 4, 9],
  [2, 9, 5, 10, 6],
  [3, 10, 2],
  [0, 1, 6, 7, 10],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
];

const getColors = (n, prevColors = []) => {
  if (!n)
    return prevColors;
  
  let bestColor = [[], 0];
  
  for (const color in colors) {
    let matches = 0;
    
    for (const prevColor in prevColors) {
      if (prevColor === color)
        continue;
      
      if (palette[colors[prevColor].idx].includes(colors[color].idx))
        matches++;
    }
    
    if (matches > bestColor[1])
      bestColor = [[color], matches];
    else if (matches === bestColor[1])
      bestColor[0].push(color);
  }
  
  const prevColors = [...prevColors, bestColor[0][bestColor[0].length * Math.random() | 0]];
  
  return getColors(n - 1, prevColors);
};
