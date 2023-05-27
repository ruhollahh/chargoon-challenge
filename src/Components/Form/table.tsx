import { Button, Popover } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { NodeType } from "../../types";

interface Props {
  users: NodeType["users"];
  handleDeleteUser: (userTitle: string) => void;
  handleToggleDefault: (userTitle: string) => void;
}

export const Table = ({
  users,
  handleDeleteUser,
  handleToggleDefault,
}: Props) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>عملیات</th>
          <th>پیش فرض</th>
          <th>نام</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.title}>
              <td>
                <Popover
                  content={
                    <button onClick={() => handleDeleteUser(user.title)}>
                      حذف
                    </button>
                  }
                  title="عملیات"
                  trigger="click"
                >
                  <Button icon={<BsThreeDots />} />
                </Popover>
              </td>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleToggleDefault(user.title)}
                  checked={user.isDefault}
                />
              </td>
              <td>{user.title}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
