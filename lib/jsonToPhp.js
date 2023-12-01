export function jsonToPhp(obj) {
  const convertArray = (array) => {
      return array.map(value => {
          if (typeof value === 'object' && value !== null) {
              return jsonToPhp(value);
          } else if (Array.isArray(value)) {
              return convertArray(value);
          } else if (typeof value === 'string') {
              return `'${value.replace(/'/g, "\\'")}'`;
          } else if (typeof value === 'boolean') {
              return value ? 'true' : 'false';
          } else {
              return value;
          }
      }).join(", ");
  };

  let result = "array(\n";
  for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          result += `\t\t'${key}' => `;
          if (Array.isArray(value)) {
              result += convertArray(value) + ",\n";
          } else if (typeof value === 'object' && value !== null) {
              result += jsonToPhp(value) + ",\n";
          } else {
              result += `${value},\n`;
          }
      }
  }
  result += "\t)";
  return result;
}