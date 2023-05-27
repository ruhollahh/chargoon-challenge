import { AutoComplete, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getUsers } from "../../transportLayer";

interface Props {
  handleAddUser: (userTitle: string) => void;
}

const UserAutoComplete: React.FC<Props> = ({ handleAddUser }) => {
  const orginalOptions = useRef([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    });
  }, []);

  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter((o) => o.label.indexOf(searchText) > -1)
    );
  };

  const onSelect = (data: string) => {
    setSelected(data);
  };

  return (
    <>
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearch}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={() => handleAddUser(selected)}>افزودن</Button>
    </>
  );
};

export default UserAutoComplete;
