function snakeToCamel(snakeStr) {
  return snakeStr.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}

export default snakeToCamel;
