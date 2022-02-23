function stringToColor(string) {
  if (string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontWeight: "bold",
    },
    children: `${formatName(name)}`,
    fontSize: "inherit",
    color: "inherit",
  };
}
const formatName = (name) => {
  if (name) {
    const newName = name;
    return newName
      .split(" ")
      .map((word, index) => {
        if (index < 2) {
          return word.length > 1 ? word[0].toUpperCase() : word.toUpperCase();
        }
      })
      .join(" ");
  }
};

export default stringAvatar;
