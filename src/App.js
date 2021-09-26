import React, { useState, useRef, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('Counting active user');
  return users.filter(user => user.active).length;

}

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  });
  const {username, email} = inputs;
  const onChange = useCallback(
    e => {
      const {name, value} = e.target;
      setInputs(inputs => ({
        ...inputs,
        [name]: value
      }));
    },
    []
  );
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = useCallback(() => {
      const user = {
        id: nextId.current,
        username,
        email
      };
      setUsers(users => users.concat(user));

      setInputs({
        username: '',
        email: ''
      });
      nextId.current += 1;
    },
    [username, email]);
  const onRemove = useCallback(
    id => {
      setUsers( users =>
        users.filter(user => user.id !== id)
      );
    },
    []);
  const onToggle = useCallback(
    id => {
      setUsers( users =>
        users.map(user =>
          user.id === id ? {...user, active: !user.active} : user
        )
      );
    },
    []);
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <CreateUser
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>Active user count: {count}</div>
    </>
  );
}

export default App;