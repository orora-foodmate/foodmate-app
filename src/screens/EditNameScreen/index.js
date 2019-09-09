import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import ViewBox from "../../components/ViewBox";

const EditNameScreen = () => {
  const [name, setName] = useState("");

  const handleConfirm = () => {
    console.log("TCL: EditNameScreen -> name", name);
    Actions.pop();
  };
  const handleInput = e => {
    setName(e.target.value);
  };
  return (
    <ViewBox>
      <Input label='昵称' onChange={handleInput} />
      <Button
        title='确认'
        containerStyle={{ paddingTop: 24 }}
        onPress={handleConfirm}
      />
    </ViewBox>
  );
};

export default EditNameScreen;
