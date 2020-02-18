import React, { useContext } from "react";
import propTypes from "prop-types";
import { View } from "react-native";
import {
  ListItem,
  ThemeContext,
  Icon,
  Badge,
  Text
} from "react-native-elements";

const ListItemChat = ({ data, ...props }) => {
  const { theme } = useContext(ThemeContext);

  const getNameContent = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text numberOfLines={1} ellipsizeMode='tail' style={{ flexShrink: 1 }}>
          {data.name}
        </Text>
        {data.official ? (
          <Icon
            type='material-community'
            name='star-circle'
            size={16}
            color={theme.colors.primary}
            containerStyle={{ marginLeft: 4 }}
          />
        ) : null}
        {data.private ? (
          <Icon
            type='material-community'
            name='lock-outline'
            size={16}
            color={theme.colors.grey3}
            containerStyle={{ marginLeft: 4 }}
          />
        ) : null}
        {data.mute ? (
          <Icon
            type='material-community'
            name='bell-off-outline'
            size={16}
            color={theme.colors.grey3}
            containerStyle={{ marginLeft: 4 }}
          />
        ) : null}
        {data.edit ? (
          <Icon
            type='materialicon'
            name='edit'
            size={16}
            containerStyle={{ marginLeft: 4 }}
          />
        ) : null}
      </View>
    );
  };

  const getTags = () => {
    return (
      <View style={{ flexDirection: "row", paddingTop: 6 }}>
        {data.tag ? (
          <Text style={{ color: theme.colors.primary }}>@</Text>
        ) : null}
        {data.msg ? (
          <Badge
            value={data.msg > 999 ? "999+" : data.msg}
            badgeStyle={{ marginLeft: 6 }}
          />
        ) : null}
      </View>
    );
  };

  const getAvatar = () => {
    let avatarUri = {};
    if (data.avatar_url) {
      avatarUri.uri = data.avatar_url;
    }
    return avatarUri;
  };

  const getAvatarTitle = () => {
    return data.name.substr(0, 1);
  };

  const getSubtitle = () => {
    return data.subtitle?(
      <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        style={{ color: theme.colors.grey4 }}
      >
        {data.subtitle}
      </Text>
    ):null;
  };

  return (
    <ListItem
      leftAvatar={{
        source: getAvatar(),
        title: getAvatarTitle(),
        placeholderStyle: { backgroundColor: `hsl(${data.id}, 90%, 70%)` }
      }}
      title={getNameContent()}
      subtitle={getSubtitle()}
      rightContentContainerStyle={{ flex: 0 }}
      rightTitle={data.time}
      rightTitleStyle={{ marginTop: 2 }}
      rightSubtitle={getTags()}
      {...props}
      bottomDivider
    />
  );
};

ListItemChat.propTypes = {
  data: propTypes.object
};

ListItemChat.default = {};

export default ListItemChat;
