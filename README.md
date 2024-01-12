# reSafe
a simple, convenient and safe way to render react components!

## Basic Example

Imagine you have the followig component which displays a users account after fetching their account from a remote database:

```ts
function ProfileScreen() {

  const [user, setUser] = useState<User | undefined>()
  const [friends, setFriends] = useState<User[]>([])

  useEffect(() => {
    fetchDatabaseUser()
      .then((data) => setUser(data))
      .catch(console.warn)
  }, [])

  useEffect(() => {
    if (!user?.id) return
    fetchFriendsList()
      .then((data) => setFriends(data))
      .then(console.warn)
  }, [user?.id])

  // more conditional logic...

  return user ? (
    <UserProfile />
  ) : (
    <LoadingView />
  )
}
```

Wouldn't it be great if we could just pass the `user` as a prop when ready?

```ts
function ProfileContainer() {
  const user: User | undefined = useDatabaseUser()
  return (
    <Safely render={ProfileScreen} with={{ user }} when={Boolean(user)} />
  )    
}

function ProfileScreen({ user }: { user: User }) {
  const friends = useFriendsList(user)
  const analytics = useAnalytics(user)
  const userActions = useActions(user)
  return (<UserProfile />
}
```
