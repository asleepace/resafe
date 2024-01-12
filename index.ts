import React from 'react';

type User = {
  name: string
  age: number
  isHuman: boolean
}

type UserDisplayProps = {
  user: User
}

function UserDisplay({ user }: UserDisplayProps) {
  return (
    <div style={{ backgroundColor: 'white', padding: 32, width: '80%' }}>
      <h1>{user.name}</h1>
      <h2>{user.age} yrs</h2>
      <p>{user?.isHuman ? 'human' : 'ai'}</p>
    </div>
  )
}


type SafeComponentProps<T> = React.PropsWithChildren<{
  with: T | undefined
  when: any
  render: (props: any & T) => React.JSX.Element
  fallback?: () => React.JSX.Element
}>

function Safely<T>({ children, with: data, when: ready, render, fallback }: SafeComponentProps<T>): React.JSX.Element {
  if (!Boolean(ready)) return <p>loading...</p>
  return render(data)
}

export default function App() {

  const [user, setUser] = React.useState(undefined)

  React.useEffect(() => {
    setTimeout(() => {
       setUser({
          name: 'colin',
          age: 31,
          isHuman: true
       })
    }, 3_000)
  }, [])


  return (
    <Safely 
      render={UserDisplay} 
      with={{ user }} 
      when={user}
     />
  );
}

// Log to console
console.log('Hello console');
