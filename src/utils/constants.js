export const colors = {
  WHITE: '#FFFFFF',
  BLUE_TRANSPERENT: '#F5F5F5',
  PINK_50: '#FCE4EC',
  PINK_100: '#F8BBD0',
  PINK_200: '#F48FB1',
  PINK_300: '#F06292',
  PINK_400: '#EC407A',
  PINK_500: '#E91E63',
  BLACK: '#000000',
  FOOTER_BG: '#F5F5F5',
};

export const menu_type = {
  BACK:"back",
  HAMBURGER: "hamburger",
}

export const getAvatar = (avatar_id) => {
  switch (avatar_id) {
    case 0:
      return require('./../images/avatar/0.png');
    case 1:
      return require('./../images/avatar/1.png');
    case 2:
      return require('./../images/avatar/2.png');
    default:
      return require('./../images/avatar/0.png');
  }
}
export const getAvatarBg = (avatar_id) => {
  switch (avatar_id) {
    case 0:
      return require('./../images/avatar/bg/0.png');
    case 1:
      return require('./../images/avatar/bg/1.png');
    case 2:
      return require('./../images/avatar/bg/2.png');
    default:
      return require('./../images/avatar/bg/0.png');
  }
}