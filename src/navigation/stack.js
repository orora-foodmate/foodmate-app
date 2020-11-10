import colors from '~/theme/color';

export const stack = (name, text, icon, inactiveIcon ) => (
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
          fontSize: 12,
          icon: inactiveIcon,
          selectedIcon: icon,
          textColor: colors.greyLight,
          selectedTextColor: colors.primary,
          IconInsets: {
            top: 100,
          } 
        },
      },
    }
  }
);