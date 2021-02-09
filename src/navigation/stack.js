import colors from '~/theme/color';

export const stack = (name, text, icon) => (
  {
    stack: {
      children: [{
        component: {
          name,
          options: {
            topBar: {
              visible: true,
              title: { text }
            },
          }
        }
      }],
      options: {
        bottomTab: {
          text,
          icon,

          IconInsets: {
            top: 100,
          } 
        },
      },
    }
  }
);