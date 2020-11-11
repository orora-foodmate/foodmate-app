import color from './color';

const shadow = {
  black: {
    elevation: 3,
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  grey: {
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: color.secondary,
  },
  gold: {
    elevation: 2,
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: color.gold,
  },
};

export default shadow;
